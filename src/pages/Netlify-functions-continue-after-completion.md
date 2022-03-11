---
title: Netlify functions - continue after completion
published: true
date: '2020-09-21'
spoiler: Netlify functions are a powerful beast for all your API needs. But what if I want to return as soon as possible from my API call to keep my web UI responsive, but still need to do something like sending out an e-mail? Enter the "classic" function style that makes this possible.
description: Netlify functions are a powerful beast for all your API needs. But what if I want to return as soon as possible from my API call to keep my web UI responsive, but still need to do something like sending out an e-mail?
tags: Netlify, serverless
canonical_url: https://www.sergevandenoever.nl/Netlify-functions-continue-after-completion/
---

[https://docs.netlify.com/functions/overview/](Netlify functions) can be used used to provide a API for your web site. You can [buid your functions with JavaScript](https://docs.netlify.com/functions/build-with-javascript/).


There are two common ways to write your Netlify function. The "modern" style and the "legacy" style:

```javascript
// modern JS style - encouraged
export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello world ${Math.floor(Math.random() * 10)}` })
  };
}
```

```javascript
// legacy callback style - not encouraged anymore, but you'll still see examples doing this
exports.handler = function(event, context, callback) {
// your server-side functionality
callback(null, {
  statusCode: 200,
  body: JSON.stringify({
    message: `Hello world ${Math.floor(Math.random() * 10)}`
  })
});
};
```

I would encourage you to use the modern style, and it is required for returning a response to the requester and allowing the function to continue its process. If you use the "legacy" style the response of the callback will not be sent to the requester until the function is done with all invocations or it times out at 10 seconds, even when the setTimeout technique is used as illustrated in the following "modern" style example.

Use the "modern" style like so:

function `continueAfterDoneTest.js`:
```javascript
function getTime() {
  return (new Date()).toISOString().substr(11, 8);
}

exports.handler = (event, context) => {
  console.log(`${getTime()}: THE FUNCTION HAS STARTED`);
  setTimeout(function () {
    console.log(`${getTime()}: THE TIMEOUT IS COMPLETED`)
  }, 5000);

 return { statusCode: 200, body: `${getTime()}: FUNCTION COMPLETED` };
};
```

Function output in the terminal:

```
◈ Creating Live Tunnel for 8ddb4b97-be43-46aa-855c-0d05999a8ec9

   ┌────────────────────────────────────────────────────────────┐
   │                                                            │
   │   ◈ Server now ready on https://idnv-3ea026.netlify.live   │
   │                                                            │
   └────────────────────────────────────────────────────────────┘

Request from ::1: GET /.netlify/functions/continueAfterDoneTest
12:40:00: THE FUNCTION HAS STARTED
Response with status 200 in 8 ms.
12:40:05: THE TIMEOUT IS COMPLETED
```

Output in the browser at url `https://idnv-3ea026.netlify.live/.netlify/functions/continueAfterDoneTest`:

```
12:40:00: FUNCTION COMPLETED
```

You will see this output in the browser directly, while the last line in the terminal output comes 5 seconds later.

