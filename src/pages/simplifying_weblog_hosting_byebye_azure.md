---
title: Simplifying hosting my weblog - bye bye Azure
date: '2019-08-13'
spoiler: I really tried tried. Hard. But Azure - you failed me!
---

As described in my blog post [Weblog deployment to a static Microsoft Azure website](/weblog-deployment-to-static-azure-website/) I initially hosted my weblog on an Azure static website. I had to jump through a lot of hoops to get both https and http working, but in the end I got it all up and running using a DevOps build pipeline, Azure blob storage and a CDN.

But today I found out that my weblog was gone... unreachable. I went to the Azure Portal and what happened: in my expirimentations with Azure on my MSDN subscription I did spend all my Azure money - resulting in the immediate shutdown of ALL my websites.

Of course, if you use services, you should pay for them. But I did not expected to get shutdown completely on my CDN.

So I went another route, way simpler route: use [Now for GitHub](https://zeit.co/blog/now-for-github) to do the build and deployment. Pushing to my GitHub repo or creating a pull request is enough to trigger a build and deploy.

I have a script added in my `package.json` called `now-build`, and a `now.json` file in the root of my repo with the following content to do the job:

```json
{
    "version": 2,
    "name": "gatsby",
    "builds": [
        { "src": "package.json", "use": "@now/static-build", "config": {"distDir": "public"} }
    ]
}
```

This is enough to do the job.

The deployment is done to https://svdoevergithubio.svdoever.now.sh, I'm now waiting for mapping my custom domain https://www.sergevandenoever.nl to this url.

Bye bye Azure - it is sad you failed me, although I know it was my own fault.