---
title: Serving static files from GitHub
date: '2019-04-04'
spoiler: When you need to request files from GitHub with the correct mime-types GitHub itself is not the best place.
---

Sometimes there is the need to fetch the raw contents of a file from a GitHub repository. I have this case for a Markdown documentation file that I want to show in a web page. The url of this document is `https://github.com/macaw-interactive/react-jss-typescript-starter/blob/develop/README.md`. When you request this url you get the contents of the GitHub page. There is also a "raw" version of this page where you navigate to when you select the "Raw" tab on the page. This leads you to the url `https://raw.githubusercontent.com/macaw-interactive/react-jss-typescript-starter/develop/README.md`.

When this raw document is requested from GitHub it returns the required content, but it has two drawbacks:

1. A cached copy is returned, this cached copy is often older than the current version
2. It returns the document with the incorrect content type: `text/plain; charset=utf-8` while it should be `text/markdown; charset=utf-8`

Both issues are very annoying when you are developing, and the second issue can be blocking for your purpose.

In the past I used the services of `https://rawgit.com/` to overcome these issues, but they decided to stop their services as stated on their website: *RawGit has reached the end of its useful life*.

On the website they propose some other services. I decided to check out [jsDeliver](https://www.jsdelivr.com/). They even provide a service to [convert RawGit links to jsDeliver links](https://www.jsdelivr.com/rawgit).

With the jsDeliver service the required url looks like `https://cdn.jsdelivr.net/gh/macaw-interactive/react-jss-typescript-starter@develop/README.md`, and it provides the correct content type!

But... it is cached on the CDN. What if the contents has changed? jsDelivr to the rescue: change the `cdn` to `purge` in the url and the next request you get a fresh copy. Easy way to automate that in your package.json scripts:

```
"purge:readme": "npx req https://purge.jsdelivr.net/gh/macaw-interactive/react-jss-typescript-starter@develop/README.md"
```

  