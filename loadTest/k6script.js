import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 2000, // Number of virtual users
  duration: '1s', // Test duration
};

export default function () {
  const publicRes = http.get('http://api:3000/public/resource/one');
  const privateRes = http.get('http://api:3000/private/resource/four', {headers:{'authorization':'lolsecret'}});
  check(publicRes, {
    'is status 200': (r) => r.status === 200,
  });
  check(privateRes, {
    'is status 200': (r) => r.status === 200,
  });
};
