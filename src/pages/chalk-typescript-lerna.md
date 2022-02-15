---
title: Chalk, TypeScript and Lerna
published: true
date: '2022-02-15'
spoiler: Get chalk working with TypeScript, get color output with chalk in Lerna.
description: Get chalk working with TypeScript, get color output with chalk in Lerna.
tags: chalk,typescript,lerna
canonical_url: https://www.sergevandenoever.nl/... - link for the canonical version of the content
cover_image:
series:
---
After a lot of struggling with getting [chalk](https://github.com/chalk/chalk#readme) to work with TypeScript I finally found ([in the documentation](https://github.com/chalk/chalk#install)) that you should just use version 4 of chalk! In the release notes it is stated that:

> If you use TypeScript, you will want to stay on Chalk 4 until TypeScript 4.6 is out.

I can now use chalk as follows from TypeScript:

```typescript
import chalk from "chalk";

console.log(chalk.red("This is red"));
```

Next problem: color output is stripped when using [Lerna](https://lerna.js.org/).

If you run `lerna run doit --scope mypackage --stream` all color output is stripped.

To fix this set the environment variable `FORCE_COLOR=1`.

For example in an npm script do the following:

```
   ...
   "run_doit_in_package_mypackage": "cross-env FORCE_COLOR=1 lerna run doit --scope mypackage --stream"
   ...
```

