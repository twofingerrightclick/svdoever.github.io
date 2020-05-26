---
title: Installing the Sitecore 9.3 SXA.Styleguide project
date: '2020-05-26'
spoiler: Mark van Aalst provides a great "no C# code" SXA sample project with the SXA.Styleguide project available on Github. In this post I describe how to get this project up and running on your local Sitecore 9.3 installation.
---

When you want to install the [SXA.Styleguide](https://github.com/markvanaalst/SXA.Styleguide) by Mark van Aalst, and you don't want to do it using Docker, follow the following steps:

* Create file `build\props\Website.Publishing.props.user` to override the path for `PublishRootDirectory` to the folder of your installed Sitecore site:

```xml
<Project>
  <PropertyGroup>
    <PublishRootDirectory>C:\inetpub\wwwroot\sxastyleguideorgsc.dev.local\</PublishRootDirectory>
  </PropertyGroup>
</Project>
```

* Open the file `src\Project\Website\website\App_Config\Include\Project\Styleguide.Project.Website\Styleguide.Project.Website.config` and change the path of the `serializationFolder` to the `items` folder in your project folder:

```xml
<sc.variable name="serializationFolder" value="C:\p\sxastyleguide\SXA.Styleguide\items\" />
```

* Navigate to the Unicorn panel on your website: `https://sxastyleguideorgsc.dev.local/unicorn.aspx`, and sync items
     
* (Re)build the search indexes - the SXA Styleguide showcases the out-of-the-box search components, but to get search results we first need to [(re)build the indexes](https://doc.sitecore.com/developers/93/platform-administration-and-architecture/en/rebuild-search-indexes.html):

  1. log-in to the **Launchpad**
  2. Open the **Control Panel**
  3. in the Indexing section, click **Indexing Manager**
  4. select at least the **sitecore_sxa_master_index** and press the **Rebuild** button 

Done!
