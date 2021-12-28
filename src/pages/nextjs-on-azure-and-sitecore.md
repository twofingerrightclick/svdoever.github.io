---
title: Next.js on Azure, and an example on how to use it for Sitecore JSS
published: true
date: '2021-12-28'
spoiler: Running Next.js on Azure with all its CSR, SSR, SSG, and ISG goodness. And as an example run also Sitecore JSS on it!
description: Running Next.js on Azure with all its CSR, SSR, SSG, and ISG goodness. And as an example run also Sitecore JSS on it!
tags: nextjs, azure, sitecore, jss
canonical_url: https://www.sergevandenoever.nl/nextjs-on-azure-and-sitecore
cover_image:
series:
---

Next.js, developed by Vercel, runs best on Vercel. Problem is: it is difficult to "sell" to customers who commited to Microsoft Azure as their cloud platform to use Vercel (at the time of writing 178 employees) as an additional cloud provider for only the frontend application. Customers like insurance companies do for example a lot of checks on Azure before they even dare to go to the cloud on Azure, let alone they will embrace an additional cloud provider they never heard of.

This is why we started a Macaw Innovation Board project at in June 2021 to research how we could run Next.js in the best way on Azure, and use this approach as a core setup for future [Sitecore JSS](https://jss.sitecore.com/) projects.

The implementation is created with the following assumptions:

- The Next.js server end-points must be completely implemented using consumption-based Azure functions
- The implementation should support Incremental Static Generation (ISG) to ensure rerendering of pages in case of page changes in the Sitecore CMS
- The Azure CDN is used, with support for page expiration in combination with ISG

## The results

The results of our research can be found in the open-source GitHub repository https://github.com/macaw-cad/nextjs-on-azure.

It provides the following headstart code and examples: 

### Next.js basic example

- **basic-nextjs-azure-functions** - the Next.js website running from an Azure function for the basic website example
- **basic-nextjs-example** - the Next.js code for the basic website example

### Next.js Sitecore Headless example with JSS

- **jss-nextjs-app-azure-functions** - the Next.js website running from an Azure function for the Sitecore headless JSS example
- **basic-nextjs-app** - the Next.js code for the Sitecore headless JSS example

### React UI components

- **ui-components** - a core set of React UI components and styling to be used in custom-built websites

## Blog posts

My colleague [Erwin Smit](https://www.erwinsmit.com), who did most of the implementation work, wrote a great set of blogposts explaining a lot of the things happening in the code base.

Checkout his list of posts:

- [Next.js on Azure Functions](https://www.erwinsmit.com/nextjs-on-azure-functions/)
- [Deploy Azure Functions with GitHub Actions using AzCopy](https://www.erwinsmit.com/deploy-azure-functions-github-actions/)
- [Sitecore JSS on Azure Functions](https://www.erwinsmit.com/sitecore-jss-on-azure-functions/)

And some nice additional posts on functionality showcased in the GitHub repository https://github.com/macaw-cad/nextjs-on-azure:

- [Add external datasource to Sitecore JSS](https://www.erwinsmit.com/add-external-datasource-to-sitecore-jss/)
- [Integrate OrderCloud with Sitecore JSS Next.js](https://www.erwinsmit.com/ordercloud-sitecore-jss-nextjs/)