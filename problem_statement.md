TEST TASK

Goals:

We need to restrict the usage of our API to prevent users from abusing our system. These are the conditions/requirements:

-Implement a basic auth middleware. It could be just an uuid token passed in headers, or it could be a jwt. No need to implement login/register routes. You can just store the token somewhere (env, app, db).
-Implement 2 types of routes: public and private. Private routes should use the auth middleware.
-Implement a rate limiter. It should check a token limit for private routes and a ip limit for public routes.
-Set a rate limit by token to 200 req/hour
-Set a rate limit by ip to 100 req/hour 
-Those numbers (token limit and ip limit) should be configurable from the environment
-When a user reaches the limit, in the response show an error message about current limit for that user account, and display when (time) the user can make the next request
-Keep concurrency in mind.
-Your solution should handle multiple requests at the same time, for example, let's say you have 4000 requests per second to the public route from the same user, so your solution should respond with 429 status code when the rate limit is reached.
~Bonus: keep performance in mind.
Optional task: Create a different weight of a request for every URL: 1/2/5 points per request (you can assume we have 3 different end points) depending on end point.

Allowed stack includes:
-Node.js using Express or Nest.js.
MongoDB
-Redis

Feel free to use additional services, except ready limiter libraries.
-In-memory solutions (without using any kind of database) are not allowed. We should be able to run 2+ instances of your solution and it should limit requests correctly.

Output:

Source code of the implementation

