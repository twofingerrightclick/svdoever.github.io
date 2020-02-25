---
title: Fixing "sgen.exe" filename or extension is too long
date: '2020-02-25'
spoiler: When you get this annoying "sgen.exe" error, you can use this fix!
---

When you build a C# project in Visual Studio and get the error `Error MSB6003 The specified task executable "sgen.exe" could not be run. System.ComponentModel.Win32Exception (0x80004005): The filename or extension is too long` you can fix it by going to the properties of the C# project, and on the **Build** tab set the **Generate serialization assembly** to **off**. 

Apply this setting to both the **Debug** and **Release** configuration, otherwise it works locally (**Debug**), but fails on your build server (**Release**).

See [XML Serializer Generator Tool (Sgen.exe)](https://docs.microsoft.com/en-us/dotnet/standard/serialization/xml-serializer-generator-tool-sgen-exe) for more information on the tooling.
