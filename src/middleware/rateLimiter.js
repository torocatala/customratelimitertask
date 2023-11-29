var redis = require('redis');

const client = redis.createClient({
  url: 'redis://redis'
});
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

const rateLimiter = (type, maxRequests, windowSizeInSeconds) => {
  return async (req, res, next) => {
    const keyBase = type === 'private' ? req.headers['authorization'] : req.ip;
    const key = `rateLimit:${keyBase}`;
    const windowSizeInMs = windowSizeInSeconds * 1000;
    const currentTime = Date.now();

    try {
      await client.executeIsolated(async (isolatedClient) => {
        await isolatedClient.watch(key);

        let timestamps = await isolatedClient.lRange(key, 0, -1);
        timestamps = timestamps.map(timestamp => parseInt(timestamp, 10));
        timestamps = timestamps.filter(timestamp => currentTime - timestamp < windowSizeInMs);

        if (timestamps.length >= maxRequests) {
          await isolatedClient.unwatch(); // Unwatch the key as the operation is not going to proceed
          res.set('X-RateLimit-Limit', maxRequests);
          res.set('X-RateLimit-Remaining', 0);

          let nextAvailableRequest = new Date(Math.min.apply(Math, timestamps) + windowSizeInMs).toUTCString();
          return res.status(429).send(`Rate limit exceeded. Try again at ${nextAvailableRequest}`);
        }

        // Update the list of timestamps with the current request timestamp
        timestamps.push(currentTime);

        const multi = isolatedClient.multi()
          .del(key)
          .rPush(key, timestamps.map(String))
          .expire(key, windowSizeInSeconds);

        const execResult = await multi.exec();

        if (!execResult) {
          console.log("Transaction aborted due to concurrent modification");
          res.status(500).send("Internal Server Error due to concurrency issue");
          return;
        }

        res.set('X-RateLimit-Limit', maxRequests);
        res.set('X-RateLimit-Remaining', maxRequests - timestamps.length);
        console.log('Transaction completed Successfully!');
        next();
      });
    } catch (error) {
        console.error(`Error in rate limiter: ${error}`);
        res.status(500).send('Internal Server Error');
    }
  };
};

module.exports = rateLimiter;
