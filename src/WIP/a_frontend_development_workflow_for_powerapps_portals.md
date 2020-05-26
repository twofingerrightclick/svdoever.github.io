---
title: A front-end development workflow for PowerApps Portals
date: '2020-08-01'
spoiler: Every   
---

# The Microsoft PowerApps platform has a new proposition besides canvas and 

PowerApps Portals provides just like many other systems like PowerApps Canvas PowerApps, model-driven PowerApps, Logic Apps, PowerSitecore SXA and Roblox a low-code environment to build your application within the environment. As a die-hard developer I don't believe in development professional and structured development within such an environment for the following reasons:

- it is difficult to place application artifacts under source-control, the application is often packaged in a big zip file, artifacts within the package are often big XML or JSon files where changes made to the previous version are difficult to detect
- if code is involved the editor within the low-code environment is never the best editor comparible to and editor with Visual Studio Code
- the code required in the environment is often not the code we want to write when we develop an application; e.g. I prefer to generate a minified CSS bundle from nultiple SASS files, and a minified and uglified JavaScript bundle from multiple TypeScript files using a transpilation process 

The good thing of PowerApps Portals is that is uses JavaScript, CSS and Liquid templates which can be perfectly edited and generated outside of the PowerApps Portal environment. The only thing is that we have to define a development workflow and create tooling to create a good front-end workflow.

In this post I describe a first take on providing this workflow.


## Opening the PowerApps Portals admin center for your portal

1. Login to https://powerapps.com
2. Select **Apps** in the left menu
3. On the app of type Portal click the ... and select **Settings**
4. On the pane in from the right select Advanced options - Administration

# Restart the portal after CDS changes

I see four approaches on working as a (citizen) developer on PowerApps Portal web-sites:
1. Changes are made in the PowerApps Portal WYSIWYG UI (on the app of type click the ... and select **Edit**
2. Changes are made in the **Portal Management** model-driven app (works on data stored in the CDS)
3. Changes are made directly on the CDS
4. External files referenced by the portal are created or modified

The portal application does a lot of caching of data, and is in that case not aware of changes made to the CDS or external files.

If you have the rights to log in to the portal (e.g. https://svdoever.powerappsportals.com/) go to the url /_services/about and select **Clear Cache** as described in the article [Clear the server-side cache](https://docs.microsoft.com/en-us/powerapps/maker/portals/admin/clear-server-side-cache).

If this does not work there is another (more time consuming) approach:

On the **PowerApps Portals admin center** select in the left menu **Portal Actions** and select **Restart**.

You will now get the message:

 _Restarting the portal will make it unavailable for several minutes and users won’t be able to access the portal URL. If you want to continue, click Restart._

The web site is now restarted (probably an IIS Reset) and the server-side cache is emptied.

On the next request 
Interesting links:

[Enable/disable PowerApps Portals creation in tenant](https://colinvermander.com/2019/09/16/restrict-creation-of-powerapps-portals/)
[Restart a PowerApps Portal](https://colinvermander.com/2019/09/18/powerapps-portal-force-restart/)