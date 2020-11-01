---
title: Run Gulp 4 tasks programmatically from NodeJS
published: true
date: '2020-11-01'
spoiler: Want to use the power of Gulp within your NodeJS application, instead of using the Gulp CLI and a gulpfile.js file? I finally found out how...
description: Want to use the power of Gulp within your NodeJS application, instead of using the Gulp CLI and a gulpfile.js file? I finally found out how...
tags: gulp, node
canonical_url: https://www.sergevandenoever.nl/... - link for the canonical version of the content
cover_image: cover image for post, accepts a URL. The best size is 1000 x 420.
series: Gulp
---
I want to use the power of the Gulp functions like the series(), parallel(), src(), dest(), pipe(), the globbing, an the plugin model within my node application. And it is easy to do. But I can tell you... it took me hours to find out, and the missing link was that I forgot two brackets: (). The gulp.series() and gulp.parallel() give back a function that must be executed:

```javascript
const {series} = require('gulp');

// simple gulp task
const helloTask = done => {
  console.log('hello from helloTask');
  done();
}

console.log('start');
series(helloTask)();
console.log('end');
```

The import part is `series(helloTask)()`. But the output was still in the wrong order:

```
start
end
hello from helloTask
```

This is because everything in Gulp is asynchronous. We need to wait for the completion of the series before continuing.
This can be achieved using a promise, and awaiting the promise. If we want to await a promise we need to execute that code from an async function:

```javascript
const gulp = require('gulp');

// simple gulp task
const helloTask = done => {
  console.log('hello from helloTask');
  done();
}

async function gulpTaskRunner(task) {
  return new Promise(function (resolve, reject) {
    gulp.series(task, (done) => {
      console.log("Gulp task completed");
      resolve();
      done();
    })();
  });
}

async function app() {
  console.log('start');
  await gulpTaskRunner(helloTask);
  console.log('end');
}

app();
```

In this way we can create a simple `gulpTaskRunner()` function that can be executed from within your node application.

And the output is now as follows:

```
start
hello from helloTask
Gulp task completed
end
```
