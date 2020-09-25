---
title: Processing multipart/form-data in NodeJS Azure function with HttpTrigger
published: true
date: '2020-09-25'
spoiler: Processing multipart/form-data containing both fields, files and images is not as easy as it seems to be in a NodeJS Azure function with HttpTrigger. But it can be done, and I will show you how! 
description: Processing multipart/form-data containing both fields, files and images is not as easy as it seems to be in a NodeJS Azure function with HttpTrigger. But it can be done, and I will show you how!
tags: Azure,serverless,formdata
canonical_url: https://www.sergevandenoever.nl/Processing-multipart-form-data-in-nodejs-azure-function-with-httptrigger/
---

## Introduction
Microsoft's answer to the [JAM-stack](https://jamstack.org/) hosting platforms like [Netlify](https://www.netlify.com/) and [Cloudflare Workers](https://workers.cloudflare.com/) is [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/).

All platforms provide similar ingredients, but they have big differences in the details. First about the similar ingredients:

- Hosting of static content, made available globally through a CDN
- Compute to enable you to build HTTP endpoints like API's and webhooks - written with NodeJS or other languages
- Support for [CI/CD](https://en.wikipedia.org/wiki/CI/CD)
- Management for domain configuration, authentication/authorization, environment settings and much more

One of those big differences in the details I stumbled upon was in handling the posting of a form with `multipart/form-data` to support both form fields and files. In my case I needed to handle a set of fields and a set of images.

## The long-winded road to nirvana
I started out with **Netlify** as the platform of choice for my solution because it is simple and free. After a lot of trials and (always) errors I stumbled upon a [discussion thread](https://community.netlify.com/t/functions-issues-parsing-images-from-multipart-form-data/3068) that made clear that the (crippled) implementation on Netlify functions does not support posting of binary data. The underlying AWS Lambdas do have support, but this support is not enabled for Netlify. Another hugely annoying thing of Netlify functions is that there is no information on how to debug Netlify functions with VSCode. You only see ramblings like [this discussion thread](https://community.netlify.com/t/running-netlify-functions-in-a-debugger/9758/3) on the topic, and some pointer in the right direction in [this discussion thread](https://github.com/netlify/cli/issues/409). This should be part of the documentation! Debugging using `console.log()` is so... 90's.

My next step was **Azure Static Web Apps**, which has the backing for compute through the really mature **Azure Functions**. First of all: VSCode has great support for creating, managing and debugging Azure Static Web Apps and the underlying functions through the [Azure Static Web Apps extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps).

But most important: *it can handle POST messages with binary data!*

Because parsing `multipart/form-data` is a tricky piece of work I tried a lot of npm package of which others reported success with. An often used npm package is `parse-multipart` as described in the blog post [Multipart/form-data processing via HttpTrigger using NodeJS Azure functions](https://www.builtwithcloud.com/multipart-form-data-processing-via-httptrigger-using-nodejs-azure-functions/) and [this discussion thread](https://social.msdn.microsoft.com/Forums/sqlserver/en-US/551debce-57f0-43f8-8447-c00bd77ba37a/httptrigger-with-multipart-formdata?forum=AzureFunctions). I did only get it working when I only had  file fields, but with a mixture of text and file fields it completely crashed on me. After investigating other packages like `multiparty` and `multer` and many others that didn't work either, I even tried the code of [Parsing post data 3 different ways in Node.js without third-party libraries](https://medium.com/javascript-in-plain-english/parsing-post-data-3-different-ways-in-node-js-e39d9d11ba8) but could not get it working.

## nirvana
To cut a long story short, I finally got it working. I stumbled upon a low-level package [`busboy`](https://www.npmjs.com/package/busboy) (what's in a name!) that describes itself as *A node.js module for parsing incoming HTML form data*. From the documentation I could not get it working because it only describes how to hook into the streaming model of getting data, that is applicable in an `Express` or `http package` based situation using `req.pipe(busboy)`. In an Azure function the request body is already completely loaded. 

After digging through the source code of the package I found [some tests](https://github.com/mscdex/busboy/blob/master/test/test-types-multipart.js) that used exactly the approach that I needed by using the undocumented call `busboy.write(request.body, function() {});` where I can pass-in the body data that we already have available in the Azure Function. This brought me to the following code.  I log information about all the fields that we find, and I write, as a test, the files to disk in a temp folder to check if the server can process binary files correctly. When you run this same code in a Netlify function everything seems to work, but you will get crippled files!

**Processing multipart/form-data in NodeJS Azure function with HttpTrigger:**
```typescript
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as Busboy from 'busboy';
import * as fs from 'fs';

function getTime() {
    return (new Date()).toISOString().substr(11, 8);
}

function log(s) {
    log(`${getTime()}: ${s}`);
}

const httpTrigger: AzureFunction = async function (context: Context, request: HttpRequest): Promise<void> {
    var busboy = new Busboy({ headers: request.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        log(`File [${fieldname}]: filename: '${filename}', encoding: ${encoding}, mimetype: ${mimetype}`);
        file.on('data', function(data) {
          log(`File [${fieldname}]: filename: '${filename}', got ${data.length} bytes`);
          fs.writeFileSync('c:\\temp\\' + filename, data);
        });
        file.on('end', function() {
          log(`File [${fieldname}]: filename: '${filename}', Finished`);
        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        log(`Field [${fieldname}]: value: ${val}`);
    });
    busboy.on('finish', function() {
        log('Done parsing form!');
    
        context.res = {
            status: 200, 
            body: { result: "done" }
        };
    });
    busboy.write(request.body, function() {});
};

export default httpTrigger;
```

**A sample for containing fields and image:**

```html
<form action="http://localhost:7071/api/handlePostData" method="post" enctype="multipart/form-data">
  <label for="fname">First name:</label>
  <input type="text" id="fname" name="fname"><br><br>
  <label for="lname">Last name:</label>
  <input type="text" id="lname" name="lname"><br><br>
  <label for="selfie">Selfie:</label>
  <input type="file" accept="image/*" capture id="selfie" name="selfie"><br><br>
  <input type="submit" value="Submit">
</form>
```

Check the [Busboy documentation](https://www.npmjs.com/package/busboy) for more information on configuration options and the handling fields and files.