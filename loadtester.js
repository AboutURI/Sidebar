import http from 'k6/http';
import { check, sleep } from 'k6';
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// export let options = {
//   stages: [
//     { duration: '60s', target: 1250 }
//     // { duration: '30s', target: 1500 }
//     // { duration: '30s', target: 3000 }
//     // { duration: '30s', target: 4900 },
//     // { duration: '30s', target: 5200 },
//   ],
// };

export let options = {
  // discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 100, // 200 RPS, since timeUnit is the default 1s
      duration: '1m',
      preAllocatedVUs: 100,
      maxVUs: 10000,
    },
  },
};

export default function () {
  // let res = http.get('http://localhost:3004');
  // let res = http.get('http://admin:password@localhost:5984/sidebar/0')
  // let res = http.get('http://ec2-18-144-63-186.us-west-1.compute.amazonaws.com:6012/sidebar?courseId=7')

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  let id = getRandomIntInclusive(9000000, 10000000);
  // let res = http.get(`http://ec2-54-183-120-231.us-west-1.compute.amazonaws.com/course/${id}/reviews/`)
  let res = http.get(`http://ec2-18-144-63-186.us-west-1.compute.amazonaws.com:6012/sidebar?courseId=${id}`)

  // let BASE_URL = 'http://ec2-18-144-63-186.us-west-1.compute.amazonaws.com:6012/sidebar?courseId='
  // let BASE_URL = http.get(`http://ec2-54-183-120-231.us-west-1.compute.amazonaws.com`)

  // let res = http.batch([
  //   [
  //     'GET',
  //     `${BASE_URL}${getRandomIntInclusive(0,10000000)}/`
  //   ],
  //   [
  //     'GET',
  //     `${BASE_URL}${getRandomIntInclusive(0,10000000)}/`
  //   ],
  //   [
  //     'GET',
  //     `${BASE_URL}${getRandomIntInclusive(0,10000000)}/`
  //   ],
  //   [
  //     'GET',
  //     `${BASE_URL}${getRandomIntInclusive(0,10000000)}/`
  //   ]
  // ]);

  // [
  //   'GET',
  //   `${BASE_URL}/sidebar?courseId=${getRandomIntInclusive(0,10000000)}`
  // ]
  // console.log(JSON.stringify(res.body));
  check(res, { 'status was 200': (r) => r.status == 200 });
  // check(res, {'JSON had data': (r) => r.id != null});

  sleep(1);
}

// ?course?${id}/
// or
// course/${id}/price

// export function handleSummary(data) {
//   console.log('Preparing the end-of-test summary...');

//   // Send the results to some remote server or trigger a hook
//   // let resp = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(data));
//   // if (resp.status != 200) {
//   //     console.error('Could not send summary, got status ' + resp.status);
//   // }

//   return {
//       'stdout': textSummary(data, { indent: ' ', enableColors: true}), // Show the text summary to stdout...
//       'Sidebar/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
//       'Sidebar/summary.json': JSON.stringify(data), // and a JSON with all the details...
//       'raw-data.json': JSON.stringify(data)
//       // And any other JS transformation of the data you can think of,
//       // you can write your own JS helpers to transform the summary data however you like!
//   }
// }