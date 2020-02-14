---
title: Installing Sitecore 9.3 SXA Habitat Home sample application
date: '2020-02-14'
spoiler: When playing with Sitecore 9.3 SXA it is nice to have a real example by the masters themselves. Enter Habitat Home...
---
Installing the Sitecore 9.3 SXA version of the Habitat Home sample application is actually a breeze! I decided to go for local development, because I have space issues for the Docker containers, and I already installed a development website using the [Graphical setup package for XP Single](https://dev.sitecore.net/Downloads/Sitecore_Experience_Platform/93/Sitecore_Experience_Platform_93_Initial_Release.aspx).

I executed the following steps:

1. Create a new site **HabitatHome** with the graphical installer. It is a pity that it created a hostname `habitathomesc.dev.local`, but that is easy to configure later on
2. Clone the repository from https://github.com/Sitecore/Sitecore.HabitatHome.Platform/tree/930.0.0 to the default installation folder c:\Projects\Sitecore.HabitatHome.Platform
3. There was a requirement to install the latest version of the Sitecore Azure toolkit from https://dev.sitecore.net/Downloads/Sitecore_Azure_Toolkit/ to the folder `c:\sat`, but is looks like it is not used when developing locally
4. Install [MSBuild Tools for Visual Studio 2019](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools&rel=16)
5. Make some modifications to `cake_config.json`:

```json
{
	"WebsiteRoot": "C:\\Inetpub\\wwwroot\\habitathomesc.dev.local",
	"XConnectRoot": "C:\\Inetpub\\wwwroot\\habitathomexconnect.dev.local\\",
	"InstanceUrl": "https://habitathomesc.dev.local",
	"SolutionName": "HabitatHome.sln",
	"ProjectFolder": "C:\\Projects\\Sitecore.HabitatHome.Platform",
	"UnicornSerializationFolder": "C:\\Projects\\Sitecore.HabitatHome.Platform\\items",
	"BuildConfiguration": "Debug",
	"BuildToolVersions": "VS2019",
	"RunCleanBuilds": false,
	"MessageStatisticsApiKey": "97CC4FC13A814081BF6961A3E2128C5B",
	"MarketingDefinitionsApiKey": "DF7D20E837254C6FBFA2B854C295CB61",
	"DeployExmTimeout": 60,
	"PublishTempFolder": "c:\\Deploy",
	"version": "9.3.0",
	"CDN": "false",
	"SitecoreAzureToolkitPath": "c:\\sat"
}
```

6. In a PowerShell shell run `.\build.ps1`
   

The 4 themes defined in the folder `FrontEnd\-\media\Themes\Habitat SXA Sites` have a reference to the server, change those in the files:
- FrontEnd\-\media\Themes\Habitat SXA Sites\Habitat Home Basic\gulp\config.js
- FrontEnd\-\media\Themes\Habitat SXA Sites\Habitat Home Espresso\gulp\config.js
- FrontEnd\-\media\Themes\Habitat SXA Sites\Habitat Home Raspberry\gulp\config.js
- FrontEnd\-\media\Themes\Habitat SXA Sites\Habitat Home v2\gulp\config.js

You can now use the Creative Exchange as well to make modifications.

The output of the build:

```
C:\projects\Sitecore.HabitatHome.Platform [master ≡ +0 ~1 -0 !]> .\build.ps1
Preparing to run build script...
Running build script...
The assembly 'Cake.Azure, Version=0.3.0.0, Culture=neutral, PublicKeyToken=null'
is referencing an older version of Cake.Core (0.28.0).
For best compatibility it should target Cake.Core version 0.33.0.
The assembly 'Cake.XdtTransform, Version=0.16.0.0, Culture=neutral, PublicKeyToken=null'
is referencing an older version of Cake.Core (0.28.1).
For best compatibility it should target Cake.Core version 0.33.0.
(2875,12): warning CS1701: Assuming assembly reference 'Newtonsoft.Json, Version=11.0.0.0, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed' used by 'Cake.Json' matches identity 'Newtonsoft.Json, Version=12.0.0.0, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed' of 'Newtonsoft.Json', you may need to supply runtime policy
(2881,12): warning CS1701: Assuming assembly reference 'Newtonsoft.Json, Version=11.0.0.0, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed' used by 'Cake.Json' matches identity 'Newtonsoft.Json, Version=12.0.0.0, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed' of 'Newtonsoft.Json', you may need to supply runtime policy

----------------------------------------
Setup
----------------------------------------


   ) )       /\
  =====     /  \
 _|___|____/ __ \____________
|:::::::::/ ==== \:::::::::::|
|:::::::::/ ====  \::::::::::|
|::::::::/__________\:::::::::|
|_________|  ____  |_________|
| ______  | / || \ | _______ |            _   _       _     _ _        _     _   _
||  |   | | ====== ||   |   ||           | | | |     | |   (_) |      | |   | | | |
||--+---| | |    | ||---+---||           | |_| | __ _| |__  _| |_ __ _| |_  | |_| | ___  _ __ ___   ___
||__|___| | |   o| ||___|___||           |  _  |/ _` | '_ \| | __/ _` | __| |  _  |/ _ \| '_ ` _ \ / _ \
|======== | |____| |=========|           | | | | (_| | |_) | | || (_| | |_  | | | | (_) | | | | | |  __/
(^^-^^^^^- |______|-^^^--^^^)            \_| |_/\__,_|_.__/|_|\__\__,_|\__| \_| |_/\___/|_| |_| |_|\___|
(,, , ,, , |______|,,,, ,, ,)
','',,,,'  |______|,,,',',;;


 --------------------  ------------------
   The Habitat Home source code, tools and processes are examples of Sitecore Features.
   Habitat Home is not supported by Sitecore and should be used at your own risk.



========================================
CleanBuildFolders
========================================

========================================
Modify-PublishSettings
========================================

========================================
Base-PreBuild
========================================

========================================
Publish-Core-Project
========================================
Destination: C:\Inetpub\wwwroot\habitathomesc.dev.local
  Restore completed in 3,44 sec for C:\Projects\Sitecore.HabitatHome.Platform\src\Build\Build.Shared\code\Build.Shared.csproj.
Microsoft (R) Build Engine version 16.4.0+e901037fe for .NET Core
Copyright (C) Microsoft Corporation. All rights reserved.

  Build.Shared -> C:\Projects\Sitecore.HabitatHome.Platform\src\Build\Build.Shared\code\bin\Debug\net471\Build.Shared.exe
  Collecting Package Yml Files
  Build.Shared -> c:\Deploy\

========================================
Publish-FrontEnd-Project
========================================
Source: C:\Projects\Sitecore.HabitatHome.Platform\FrontEnd\**\*
Destination: C:\Inetpub\wwwroot\habitathomesc.dev.local\App_Data\FrontEnd\-

========================================
Apply-DotnetCore-Transforms
========================================
Warning: The alias GetFiles has been made obsolete. Please use the GetFiles overload that accept globber settings instead.
Skipping c:/Deploy/transforms/web.azure.config.project.website.xdt
Skipping c:/Deploy/transforms/web.azure.config.xdt
Applying configuration transform:c:/Deploy/transforms/web.config.project.website.appsettings.xdt
Skipping c:/Deploy/transforms/web.config.project.website.ssl.xdt
Applying configuration transform:c:/Deploy/transforms/web.config.xdt
Applying configuration transform:c:/Deploy/transforms/App_Config/Layers.config.project.website.xdt

========================================
Build-Solution
========================================
Microsoft (R) Build Engine version 16.4.0+e901037fe for .NET Framework
Copyright (C) Microsoft Corporation. All rights reserved.

  Restore completed in 33,8 ms for C:\Projects\Sitecore.HabitatHome.Platform\src\Build\Build.Shared\code\Build.Shared.csproj.
  Restore completed in 4,7 sec for C:\Projects\Sitecore.HabitatHome.Platform\src\Feature\ExperienceAccelerator\code\Sitecore.HabitatHome.Feature.ExperienceAccel
  erator.csproj.
  Restore completed in 4,7 sec for C:\Projects\Sitecore.HabitatHome.Platform\src\Project\Global\code\Sitecore.HabitatHome.Global.Website.csproj.
  Restore completed in 7,2 sec for C:\Projects\Sitecore.HabitatHome.Platform\src\Project\HabitatHome\code\Sitecore.HabitatHome.Website.csproj.
  Sitecore.HabitatHome.Website -> C:\Projects\Sitecore.HabitatHome.Platform\src\Project\HabitatHome\code\bin\Sitecore.HabitatHome.Website.dll
  Sitecore.HabitatHome.XConnect -> C:\Projects\Sitecore.HabitatHome.Platform\src\Project\xConnect\code\bin\Sitecore.HabitatHome.XConnect.dll
  Consider app.config remapping of assembly "Newtonsoft.Json, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed" from Version "9.0.0.0" [C:\Program Files\IIS\Mic
  rosoft Web Deploy V3\Newtonsoft.Json.dll] to Version "11.0.0.0" [C:\Users\serge\.nuget\packages\newtonsoft.json\11.0.2\lib\net45\Newtonsoft.Json.dll] to solve
   conflict and get rid of warning.
C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin\amd64\Microsoft.Common.CurrentVersion.targets(2106,5): warning MSB3247: Found  conflicts between different versions of the same dependent assembly. In Visual Studio, double-click this warning (or select it and press Enter) to fix the conf licts; otherwise, add the following binding redirects to the "runtime" node in the application configuration file: <assemblyBinding xmlns="urn:schemas-microsoft -com:asm.v1"><dependentAssembly><assemblyIdentity name="Newtonsoft.Json" culture="neutral" publicKeyToken="30ad4fe6b2a6aeed" /><bindingRedirect oldVersion="0.0. 0.0-11.0.0.0" newVersion="11.0.0.0" /></dependentAssembly></assemblyBinding> [C:\Projects\Sitecore.HabitatHome.Platform\src\Project\Global\code\Sitecore.Habitat Home.Global.Website.csproj]
  Sitecore.HabitatHome.Global.Website -> C:\Projects\Sitecore.HabitatHome.Platform\src\Project\Global\code\bin\Sitecore.HabitatHome.Global.Website.dll
  Consider app.config remapping of assembly "Newtonsoft.Json, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed" from Version "6.0.0.0" [C:\Program Files\Microso
  ft SDKs\Azure\.NET SDK\v2.9\bin\plugins\Diagnostics\Newtonsoft.Json.dll] to Version "11.0.0.0" [C:\Users\serge\.nuget\packages\newtonsoft.json\11.0.2\lib\net4
  5\Newtonsoft.Json.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Data.Common, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.1.2.0" [C:\Program Files (x86
  )\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Data.Common.dll] to Version "4.2.0.0" [C:\Program Files (x86)\Microsoft Visual
  Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Data.Common.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Diagnostics.StackTrace, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.4.0" [C:\Program
   Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Diagnostics.StackTrace.dll] to Version "4.1.0.0" [C:\Program Files (
  x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Diagnostics.StackTrace.dll] to solve conflict
  and get rid of warning.
  Consider app.config remapping of assembly "System.Diagnostics.Tracing, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.1.2.0" [C:\Program Fi
  les (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\System.Diagnostics.Tracing.dll] to Version "4.2.0.0" [C:\Program Files (x86)\Microsoft
   Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Diagnostics.Tracing.dll] to solve conflict and get rid of wa
  rning.
  Consider app.config remapping of assembly "System.Globalization.Extensions, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.3.0" [C:\Progr
  am Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Globalization.Extensions.dll] to Version "4.1.0.0" [C:\Program Fil
  es (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Globalization.Extensions.dll] to solve con
  flict and get rid of warning.
  Consider app.config remapping of assembly "System.IO.Compression, Culture=neutral, PublicKeyToken=b77a5c561934e089" from Version "4.0.0.0" [C:\Program Files (
  x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\System.IO.Compression.dll] to Version "4.2.0.0" [C:\Program Files (x86)\Microsoft Visual St
  udio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.IO.Compression.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Net.Http, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.0.0" [C:\Program Files (x86)\R
  eference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\System.Net.Http.dll] to Version "4.2.0.0" [C:\Program Files (x86)\Microsoft Visual Studio\2019\En
  terprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Net.Http.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Net.Sockets, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.1.2.0" [C:\Program Files (x86
  )\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Net.Sockets.dll] to Version "4.2.0.0" [C:\Program Files (x86)\Microsoft Visual
  Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Net.Sockets.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Runtime.Serialization.Primitives, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.1.3.0" [
  C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Runtime.Serialization.Primitives.dll] to Version "4.2.0.0"
   [C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Runtime.Serialization.Prim
  itives.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Security.Cryptography.Algorithms, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.2.2.0" [
  C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Security.Cryptography.Algorithms.dll] to Version "4.3.0.0"
   [C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Security.Cryptography.Algo
  rithms.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Security.SecureString, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.2.0" [C:\Program
  Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Security.SecureString.dll] to Version "4.1.0.0" [C:\Program Files (x8
  6)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Security.SecureString.dll] to solve conflict and
   get rid of warning.
  Consider app.config remapping of assembly "System.Threading.Overlapped, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.3.0" [C:\Program F
  iles (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Threading.Overlapped.dll] to Version "4.1.0.0" [C:\Program Files (x86)
  \Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Threading.Overlapped.dll] to solve conflict and ge
  t rid of warning.
  Consider app.config remapping of assembly "System.Xml.XPath.XDocument, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.3.0" [C:\Program Fi
  les (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Xml.XPath.XDocument.dll] to Version "4.1.0.0" [C:\Program Files (x86)\M
  icrosoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Xml.XPath.XDocument.dll] to solve conflict and get r
  id of warning.
C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin\amd64\Microsoft.Common.CurrentVersion.targets(2106,5): warning MSB3247: Found  conflicts between different versions of the same dependent assembly. In Visual Studio, double-click this warning (or select it and press Enter) to fix the conf licts; otherwise, add the following binding redirects to the "runtime" node in the application configuration file: <assemblyBinding xmlns="urn:schemas-microsoft -com:asm.v1"><dependentAssembly><assemblyIdentity name="Newtonsoft.Json" culture="neutral" publicKeyToken="30ad4fe6b2a6aeed" /><bindingRedirect oldVersion="0.0. 0.0-11.0.0.0" newVersion="11.0.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemb lyIdentity name="System.Data.Common" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.2.0.0" newVersion="4.2.0.0" /> </dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Diagnostics.St ackTrace" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.1.0.0" newVersion="4.1.0.0" /></dependentAssembly></assem blyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Diagnostics.Tracing" culture="neutral" pu blicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.2.0.0" newVersion="4.2.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xm lns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Globalization.Extensions" culture="neutral" publicKeyToken="b03f5f7f11d 50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.1.0.0" newVersion="4.1.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsof t-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.IO.Compression" culture="neutral" publicKeyToken="b77a5c561934e089" /><bindingRedirect oldVersio n="0.0.0.0-4.2.0.0" newVersion="4.2.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><a ssemblyIdentity name="System.Net.Http" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.2.0.0" newVersion="4.2.0.0"
/></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Net.Sockets"  culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.2.0.0" newVersion="4.2.0.0" /></dependentAssembly></assemblyBindin g><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Runtime.Serialization.Primitives" culture="neutral " publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.2.0.0" newVersion="4.2.0.0" /></dependentAssembly></assemblyBinding><assemblyBindin g xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Security.Cryptography.Algorithms" culture="neutral" publicKeyToken= "b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.3.0.0" newVersion="4.3.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:sche mas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Security.SecureString" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindin gRedirect oldVersion="0.0.0.0-4.1.0.0" newVersion="4.1.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><d ependentAssembly><assemblyIdentity name="System.Threading.Overlapped" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0 -4.1.0.0" newVersion="4.1.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIde ntity name="System.Xml.XPath.XDocument" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.1.0.0" newVersion="4.1.0.0"  /></dependentAssembly></assemblyBinding> [C:\Projects\Sitecore.HabitatHome.Platform\src\Feature\ExperienceAccelerator\code\Sitecore.HabitatHome.Feature.Experie nceAccelerator.csproj]
  Sitecore.HabitatHome.Feature.ExperienceAccelerator -> C:\Projects\Sitecore.HabitatHome.Platform\src\Feature\ExperienceAccelerator\code\bin\Sitecore.HabitatHom
  e.Feature.ExperienceAccelerator.dll
  Build.Shared -> C:\Projects\Sitecore.HabitatHome.Platform\src\Build\Build.Shared\code\bin\Debug\net471\Build.Shared.exe
  Collecting Package Yml Files

========================================
Publish-Foundation-Projects
========================================
Warning: The alias GetFiles has been made obsolete. Please use the GetFiles overload that accept globber settings instead.
Publishing C:\Projects\Sitecore.HabitatHome.Platform\src\Foundation to C:\Inetpub\wwwroot\habitathomesc.dev.local

========================================
Publish-Feature-Projects
========================================
Warning: The alias GetFiles has been made obsolete. Please use the GetFiles overload that accept globber settings instead.
Publishing C:\Projects\Sitecore.HabitatHome.Platform\src\Feature to C:\Inetpub\wwwroot\habitathomesc.dev.local
Microsoft (R) Build Engine version 16.4.0+e901037fe for .NET Framework
Copyright (C) Microsoft Corporation. All rights reserved.

  Consider app.config remapping of assembly "Newtonsoft.Json, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed" from Version "6.0.0.0" [C:\Program Files\Microso
  ft SDKs\Azure\.NET SDK\v2.9\bin\plugins\Diagnostics\Newtonsoft.Json.dll] to Version "11.0.0.0" [C:\Users\serge\.nuget\packages\newtonsoft.json\11.0.2\lib\net4
  5\Newtonsoft.Json.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Data.Common, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.1.2.0" [C:\Program Files (x86
  )\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Data.Common.dll] to Version "4.2.0.0" [C:\Program Files (x86)\Microsoft Visual
  Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Data.Common.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Diagnostics.StackTrace, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.4.0" [C:\Program
   Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Diagnostics.StackTrace.dll] to Version "4.1.0.0" [C:\Program Files (
  x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Diagnostics.StackTrace.dll] to solve conflict
  and get rid of warning.
  Consider app.config remapping of assembly "System.Diagnostics.Tracing, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.1.2.0" [C:\Program Fi
  les (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\System.Diagnostics.Tracing.dll] to Version "4.2.0.0" [C:\Program Files (x86)\Microsoft
   Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Diagnostics.Tracing.dll] to solve conflict and get rid of wa
  rning.
  Consider app.config remapping of assembly "System.Globalization.Extensions, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.3.0" [C:\Progr
  am Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Globalization.Extensions.dll] to Version "4.1.0.0" [C:\Program Fil
  es (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Globalization.Extensions.dll] to solve con
  flict and get rid of warning.
  Consider app.config remapping of assembly "System.IO.Compression, Culture=neutral, PublicKeyToken=b77a5c561934e089" from Version "4.0.0.0" [C:\Program Files (
  x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\System.IO.Compression.dll] to Version "4.2.0.0" [C:\Program Files (x86)\Microsoft Visual St
  udio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.IO.Compression.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Net.Http, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.0.0" [C:\Program Files (x86)\R
  eference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\System.Net.Http.dll] to Version "4.2.0.0" [C:\Program Files (x86)\Microsoft Visual Studio\2019\En
  terprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Net.Http.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Net.Sockets, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.1.2.0" [C:\Program Files (x86
  )\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Net.Sockets.dll] to Version "4.2.0.0" [C:\Program Files (x86)\Microsoft Visual
  Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Net.Sockets.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Runtime.Serialization.Primitives, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.1.3.0" [
  C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Runtime.Serialization.Primitives.dll] to Version "4.2.0.0"
   [C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Runtime.Serialization.Prim
  itives.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Security.Cryptography.Algorithms, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.2.2.0" [
  C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Security.Cryptography.Algorithms.dll] to Version "4.3.0.0"
   [C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Security.Cryptography.Algo
  rithms.dll] to solve conflict and get rid of warning.
  Consider app.config remapping of assembly "System.Security.SecureString, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.2.0" [C:\Program
  Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Security.SecureString.dll] to Version "4.1.0.0" [C:\Program Files (x8
  6)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Security.SecureString.dll] to solve conflict and
   get rid of warning.
  Consider app.config remapping of assembly "System.Threading.Overlapped, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.3.0" [C:\Program F
  iles (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Threading.Overlapped.dll] to Version "4.1.0.0" [C:\Program Files (x86)
  \Microsoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Threading.Overlapped.dll] to solve conflict and ge
  t rid of warning.
  Consider app.config remapping of assembly "System.Xml.XPath.XDocument, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" from Version "4.0.3.0" [C:\Program Fi
  les (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades\System.Xml.XPath.XDocument.dll] to Version "4.1.0.0" [C:\Program Files (x86)\M
  icrosoft Visual Studio\2019\Enterprise\MSBuild\Microsoft\Microsoft.NET.Build.Extensions\net471\lib\System.Xml.XPath.XDocument.dll] to solve conflict and get r
  id of warning.
C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin\amd64\Microsoft.Common.CurrentVersion.targets(2106,5): warning MSB3247: Found  conflicts between different versions of the same dependent assembly. In Visual Studio, double-click this warning (or select it and press Enter) to fix the conf licts; otherwise, add the following binding redirects to the "runtime" node in the application configuration file: <assemblyBinding xmlns="urn:schemas-microsoft -com:asm.v1"><dependentAssembly><assemblyIdentity name="Newtonsoft.Json" culture="neutral" publicKeyToken="30ad4fe6b2a6aeed" /><bindingRedirect oldVersion="0.0. 0.0-11.0.0.0" newVersion="11.0.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemb lyIdentity name="System.Data.Common" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.2.0.0" newVersion="4.2.0.0" /> </dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Diagnostics.St ackTrace" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.1.0.0" newVersion="4.1.0.0" /></dependentAssembly></assem blyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Diagnostics.Tracing" culture="neutral" pu blicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.2.0.0" newVersion="4.2.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xm lns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Globalization.Extensions" culture="neutral" publicKeyToken="b03f5f7f11d 50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.1.0.0" newVersion="4.1.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsof t-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.IO.Compression" culture="neutral" publicKeyToken="b77a5c561934e089" /><bindingRedirect oldVersio n="0.0.0.0-4.2.0.0" newVersion="4.2.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><a ssemblyIdentity name="System.Net.Http" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.2.0.0" newVersion="4.2.0.0"
/></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Net.Sockets"  culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.2.0.0" newVersion="4.2.0.0" /></dependentAssembly></assemblyBindin g><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Runtime.Serialization.Primitives" culture="neutral " publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.2.0.0" newVersion="4.2.0.0" /></dependentAssembly></assemblyBinding><assemblyBindin g xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Security.Cryptography.Algorithms" culture="neutral" publicKeyToken= "b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.3.0.0" newVersion="4.3.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:sche mas-microsoft-com:asm.v1"><dependentAssembly><assemblyIdentity name="System.Security.SecureString" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindin gRedirect oldVersion="0.0.0.0-4.1.0.0" newVersion="4.1.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><d ependentAssembly><assemblyIdentity name="System.Threading.Overlapped" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0 -4.1.0.0" newVersion="4.1.0.0" /></dependentAssembly></assemblyBinding><assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1"><dependentAssembly><assemblyIde ntity name="System.Xml.XPath.XDocument" culture="neutral" publicKeyToken="b03f5f7f11d50a3a" /><bindingRedirect oldVersion="0.0.0.0-4.1.0.0" newVersion="4.1.0.0"  /></dependentAssembly></assemblyBinding> [C:\Projects\Sitecore.HabitatHome.Platform\src\Feature\ExperienceAccelerator\code\Sitecore.HabitatHome.Feature.Experie nceAccelerator.csproj]
  Sitecore.HabitatHome.Feature.ExperienceAccelerator -> C:\Projects\Sitecore.HabitatHome.Platform\src\Feature\ExperienceAccelerator\code\bin\Sitecore.HabitatHom
  e.Feature.ExperienceAccelerator.dll
  Copying all files to temporary location below for package/publish:
  obj\Debug\Package\PackageTmp.

========================================
Publish-Project-Projects
========================================
Warning: The alias GetFiles has been made obsolete. Please use the GetFiles overload that accept globber settings instead.
Publishing C:\Projects\Sitecore.HabitatHome.Platform\src\Project\Global to C:\Inetpub\wwwroot\habitathomesc.dev.local
Microsoft (R) Build Engine version 16.4.0+e901037fe for .NET Framework
Copyright (C) Microsoft Corporation. All rights reserved.

  Consider app.config remapping of assembly "Newtonsoft.Json, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed" from Version "9.0.0.0" [C:\Program Files\IIS\Mic
  rosoft Web Deploy V3\Newtonsoft.Json.dll] to Version "11.0.0.0" [C:\Users\serge\.nuget\packages\newtonsoft.json\11.0.2\lib\net45\Newtonsoft.Json.dll] to solve
   conflict and get rid of warning.
C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin\amd64\Microsoft.Common.CurrentVersion.targets(2106,5): warning MSB3247: Found  conflicts between different versions of the same dependent assembly. In Visual Studio, double-click this warning (or select it and press Enter) to fix the conf licts; otherwise, add the following binding redirects to the "runtime" node in the application configuration file: <assemblyBinding xmlns="urn:schemas-microsoft -com:asm.v1"><dependentAssembly><assemblyIdentity name="Newtonsoft.Json" culture="neutral" publicKeyToken="30ad4fe6b2a6aeed" /><bindingRedirect oldVersion="0.0. 0.0-11.0.0.0" newVersion="11.0.0.0" /></dependentAssembly></assemblyBinding> [C:\Projects\Sitecore.HabitatHome.Platform\src\Project\Global\code\Sitecore.Habitat Home.Global.Website.csproj]
  Sitecore.HabitatHome.Global.Website -> C:\Projects\Sitecore.HabitatHome.Platform\src\Project\Global\code\bin\Sitecore.HabitatHome.Global.Website.dll
  Copying all files to temporary location below for package/publish:
  obj\Debug\Package\PackageTmp.
Warning: The alias GetFiles has been made obsolete. Please use the GetFiles overload that accept globber settings instead.
Publishing C:\Projects\Sitecore.HabitatHome.Platform\src\Project\HabitatHome to C:\Inetpub\wwwroot\habitathomesc.dev.local
Microsoft (R) Build Engine version 16.4.0+e901037fe for .NET Framework
Copyright (C) Microsoft Corporation. All rights reserved.

  Sitecore.HabitatHome.Website -> C:\Projects\Sitecore.HabitatHome.Platform\src\Project\HabitatHome\code\bin\Sitecore.HabitatHome.Website.dll
  Copying all files to temporary location below for package/publish:
  obj\Debug\Package\PackageTmp.

========================================
Publish-All-Projects
========================================

========================================
Copy-to-Destination
========================================
Destination: C:\Inetpub\wwwroot\habitathomesc.dev.local

========================================
Publish-xConnect-Project
========================================
Warning: The alias GetFiles has been made obsolete. Please use the GetFiles overload that accept globber settings instead.
Publishing C:\Projects\Sitecore.HabitatHome.Platform\src\Project\xConnect to C:\Inetpub\wwwroot\habitathomexconnect.dev.local\
Microsoft (R) Build Engine version 16.4.0+e901037fe for .NET Framework
Copyright (C) Microsoft Corporation. All rights reserved.

  Sitecore.HabitatHome.XConnect -> C:\Projects\Sitecore.HabitatHome.Platform\src\Project\xConnect\code\bin\Sitecore.HabitatHome.XConnect.dll
  Copying all files to temporary location below for package/publish:
  obj\Debug\Package\PackageTmp.

========================================
Modify-Unicorn-Source-Folder
========================================

========================================
Base-Publish
========================================

========================================
Apply-Xml-Transform
========================================
Warning: The alias GetFiles has been made obsolete. Please use the GetFiles overload that accept globber settings instead.
Warning: The alias GetFiles has been made obsolete. Please use the GetFiles overload that accept globber settings instead.
Warning: The alias GetFiles has been made obsolete. Please use the GetFiles overload that accept globber settings instead.

========================================
Turn-On-Unicorn
========================================

========================================
Sync-Unicorn
========================================
Sync Unicorn items from url: https://habitathomesc.dev.local/unicorn.aspx
Executing: &"C:/projects/Sitecore.HabitatHome.Platform/scripts/Unicorn/Sync.ps1" -secret 749CABBC85EAD20CE55E2C6066F1BE375D2115696C8A8B24DB6ED1FD60613086 -url https://habitathomesc.dev.local/unicorn.aspx
Sync-Unicorn: Executing Sync...
Warning: [D] master:/sitecore/system/Marketing Control Panel/Test Lab/Emails (ed08dd32-4e72-4af5-8bb6-ad217818f56d) because it did not exist in the serialization provider. Can restore from recycle bin.

========================================
Deploy-EXM-Campaigns
========================================
OK
Completed in 0 min 6 sec.

========================================
Deploy-Marketing-Definitions
========================================


========================================
Rebuild-Core-Index
========================================

========================================
Rebuild-Master-Index
========================================

========================================
Rebuild-Web-Index
========================================

========================================
Rebuild-Test-Index
========================================

========================================
Post-Deploy
========================================

========================================
Default
========================================

Task                                 Duration
---------------------------------------------------------
Setup                                00:00:00.0466584
CleanBuildFolders                    00:00:00.0910390
Copy-Sitecore-Lib                    Skipped
Modify-PublishSettings               00:00:00.0306152
Publish-Core-Project                 00:00:14.7458529
Publish-FrontEnd-Project             00:00:13.6762210
Apply-DotnetCore-Transforms          00:00:00.2092301
Build-Solution                       00:00:15.0835642
Publish-Foundation-Projects          00:00:00.0074703
Publish-Feature-Projects             00:00:02.3066100
Publish-Project-Projects             00:00:04.4759823
Copy-to-Destination                  00:00:02.0460823
Publish-xConnect-Project             00:00:01.6714301
Publish-xConnect-Project-IndexWorker Skipped
Modify-Unicorn-Source-Folder         00:00:00.0159368
Merge-and-Copy-Xml-Transform         Skipped
Publish-YML                          Skipped
Create-UpdatePackage                 Skipped
Generate-Dacpacs                     Skipped
Apply-Xml-Transform                  00:00:00.0345269
Turn-On-Unicorn                      00:00:00.0262802
Sync-Unicorn                         00:06:22.4187567
Deploy-EXM-Campaigns                 00:00:06.2309696
Deploy-Marketing-Definitions         00:00:00.2583112
Rebuild-Core-Index                   00:00:00.0323373
Rebuild-Master-Index                 00:00:00.0145355
Rebuild-Web-Index                    00:00:00.0143826
Rebuild-Test-Index                   00:00:00.0116861
---------------------------------------------------------
Total:                               00:07:23.4624796
C:\projects\Sitecore.HabitatHome.Platform [master ≡ +0 ~1 -0 !]>
```

See the blog post [Sitecore XP 9.3.0 and SXA 9.3.0 Demo – Habitat Home – Setup Guide](https://buoctrenmay.com/2019/12/23/sitecore-xp-9-3-0-and-sxa-9-3-0-demo-habitat-home-setup-guide/) for more detaiuls on how to get Habitat Home running with Docker.