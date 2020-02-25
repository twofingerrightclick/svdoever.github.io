---
title: Run npm NodeJS scripts with Fiddler
date: '2020-02-25'
spoiler: When you have an npm script that does use a NodeJS library (through gulp for example) that does web request that you want to monitor with Fiddler, checkout this simple script!
---

When Fiddler is started, it uses the http://localhost:8888 by default as the proxy port. If this port is taken you will see the following message:

![](fiddler-with-powershell-and-npm-nodejs-scripts/Fiddler-Port&#32;in&#32;Use.png)

To see the port used by Fiddler, go to `Tools –> WinINET Options... –> LAN settings –> Advanced`

Now create the Powershell script `fiddler-npmscript.ps1` next to your `package.json` file:

```powershell
param(
    [string]$NpmScript = "watch", 
    [int]$ProxyPort = 8888
)

$env:https_proxy="http://localhost:$ProxyPort"
$env:http_proxy="http://localhost:$ProxyPort"
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
npm run $NpmScript
```

This script can be called as `.\fiddler-npmscript.ps1` when using the `watch` script with the default proxy port 8888.

When using for example the `build` script on port `2046` call the script as `.\fiddler-npmscript.ps1 build 2046`.