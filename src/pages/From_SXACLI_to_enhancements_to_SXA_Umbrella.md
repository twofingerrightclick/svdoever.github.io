---
title: From SXACLI to enhancements to SXA Umbrella
date: '2020-05-02'
spoiler: After investing a lot of time and effort in working with Sitecore SXACLI and creating enhancements on the standard SXACLI tooling I decided that it was time for a different approach. Please meet SXA Umbrella!
---

With Sitecore 9.3 a new set of tooling was introduced to improve the front-end developer workflow: SXA CLI. As [described by Sitecore](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/add-a-theme-using-sxa-cli.html):

 _SXA CLI is a useful command-line tool to automatize tasks for an SXA project. This topic describes how to add a theme using SXA CLI. This can be convenient if you want to have more control over your assets and use a version control system, such as Git._

For us, it is important tooling because it provides a developer-first approach for our front-end developers in SXA development.

Because the out-of-the-box functionality was insufficient for our development workflow we extended the standard SXA CLI tooling into [SXACLI-enhancements](https://github.com/macaw-interactive/SXACLI-enhancements), and solved most of the issues we had with the out-of-the-box SXA CLI tooling. We now had things like:

- support for a team-based development cycle
- a way to fix the default provided theme SASS into Webpack compatible SASS
- Webpack for transpilation of code and styling
- Full support for TypeScript

But there were still some things "sub-optimal":

- Support for only a single theme, and Scriban for the rendering variants of a single site
- No support for grids, base themes and extension themes (although these could be seen as a theme as well)
- A big and old code-base where we didn't use 90% of the code because he handled all the heavy lifting using Webpack

So time for a big make-over! Welcome to [SXA Umbrella](https://github.com/macaw-interactive/sxa-umbrella) - *Project structure and tooling to optimize front-end team development workflow in any Sitecore SXA project*. The Github repository contains a lot of documentation and a getting started guide. Please let me know if it works for you or if you miss features.

Happy front-end coding - the right way!