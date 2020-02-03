---
title: Sitecore 9.3 SXA CLI - get item fields
date: '2020-02-03'
spoiler: In my Sitecore 9.3 SXA CLI endeavors I find myself searching for the internal field names of Sitecore items so I can use them in my Scriban templates. Using this remote PowerShell script you can look up the item fields of any Sitecore item.
---

In my blogpost [Sitecore 9.3 - create a custom theme for SXA using SXA CLI](https://www.sergevandenoever.nl/sitecore-93-custom-theme-with-SXA-CLI/) I describe how to get started with SXA CLI. When configured as described in the blog post, and with the PowerShell remoting enabled, it is easy to build utility scripts for things like getting the fields of a Sitecore item. This is very useful in writing rendering variants using the new Scriban templating language. Add the following script PowerShell script to the root of your theme folder with the name `get-itemfields.ps1`, and with the command:

    .\get-itemfields.ps1 -itemPath /sitecore/home/content

you will get an overview of all fields defined on the item:

```
Name                                DisplayName                        SectionDisplayName Description                                       
----                                -----------                        ------------------ -----------                                       
Text                                Text                               Data               The text is the main content of the document.     
Title                               Title                              Data               The title is displayed at the top of the document.
__Enable item fallback              Enable Item Fallback               Advanced                                                             
__Enforce version presence          Enforce Version Presence           Advanced                                                             
__Source Item                       __Source Item                      Advanced                                                             
__Source                            Source                             Advanced                                                             
__Standard values                   Standard values                    Advanced
:                                                             
```

The PowerShell script `get-itemfields.ps1`:

```
# Display fields of Sitecore item
# https://www.sergevandenoever.nl
param(
    [string]$itemPath = "/sitecore/content/Home"
)

Set-Location -Path $PSScriptRoot

$configParseResult = select-string -path gulp\config.js -pattern "user: { login: '(.*)', password: '(.*)' }"
if ($configParseResult.Matches.Groups.Length -ne 3) {
    Write-Error "Expected file gulp\config.js to contain a line in the format: user: { login: 'sitecore\\admin', password: 'b' }"
    Exit
}
$username = $configParseResult.Matches.Groups[1].Value.Replace('\\', '\')
$password = $configParseResult.Matches.Groups[2].Value

if ($username -eq '' -or $password -eq '') {
    Write-Error "Expected file gulp\config.js to contain a line in the format: user: { login: 'sitecore\\admin', password: 'b' }, login or password is empty."
    Exit
}

$configParseResult = select-string -path gulp\config.js -pattern "server: '(.*)'"
if ($configParseResult.Matches.Groups.Length -ne 2) {
    Write-Error "Expected file gulp\config.js to contain a line in the format: server: 'https://myserver.dev.local/'"
    Exit
}
$server = $configParseResult.Matches.Groups[1].Value
if ($server -eq '') {
    Write-Error "Expected file gulp\config.js to contain a line in the format: server: 'https://myserver.dev.local/', server is empty."
    Exit
}

$serverConfigResult = Get-Content -Path gulp\serverConfig.json | ConvertFrom-Json
$projectPath = $serverConfigResult.serverOptions.projectPath

Write-Output "Username: $username"
Write-Output "Password: $password"
Write-Output "ConnectionUri: $server"
Write-Output "Get item fields of '$itemPath'..."
Import-Module -Name SPE 
$session = New-ScriptSession -Username $username -Password $password -ConnectionUri $server
Invoke-RemoteScript -Session $session -ScriptBlock { 
    Get-Item $Using:itemPath | Get-ItemField -IncludeStandardFields -ReturnType Field -Name "*" | Format-Table Name, DisplayName, SectionDisplayName, Description -auto
}
Stop-ScriptSession -Session $session

```