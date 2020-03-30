---
title: Sitecore 9.3 - uninstall site installed with Sitecore Install Assistant
date: '2020-03-30'
spoiler: If you are still one of those losers like me that install their Sitecore 9.3 on their local machine with the Sitecore Install Assistant (SIA) instead of in a fancy set of docker containers using Docker Compose, and if you are an even bigger loser (like me) that you mess up your Sitecore installation or even worse: forgot your Sitecore admin password, welcome to this life-saver post to uninstall your installation in seconds!
---

There is a great post by [Scott Gillis of The Code Attic](https://thecodeattic.wordpress.com/about/), a Sitecore Technology MVP, where he provides a great uninstall script for SharePoint 9.3 sites installed with the Sitecore Install Assistant. The post has the humble name [Sitecore 9.3 Uninstall Script](https://thecodeattic.wordpress.com/2019/12/17/sitecore-9-3-uninstall-script/), but it saved my life after some stupid mistakes like messing up my Sitecore installation and forgetting my admin password.

I had to do some, probably for most Sitecore devs obvious, steps that I will document here as my external memory, so I will not forget them:

1. Open the [Sitecore 9.3 Uninstall Script](https://thecodeattic.wordpress.com/2019/12/17/sitecore-9-3-uninstall-script/) and read it!
2. Open [this](https://github.com/gillissm/TheCodeAttic.Sitecore.InstallUtilities/blob/version/SC9_3/Sitecore-Uninstall-SIA/Sitecore-Uninstall-SIA.ps1) file, press the **Raw** button, copy the contents and save it to a file named `Sitecore-Uninstall-SIA.ps1` in a convenient place (in my case next to the *Sitecore Install Assistant* installation folder).
3. Open a PowerShell shell
4. The script depends on the *SitecoreFundamentals* PowerShell module which I did not have installed on my system. I installed it with the following commands:
  ```
  Register-PSRepository -Name sc-powershell -SourceLocation https://sitecore.myget.org/F/sc-powershell/api/v2
  Install-Module -Name "SitecoreFundamentals" -RequiredVersion "1.1.0" -Repository "sc-powershell" -Force
  ```
5. Get a list of installed sites using the following PowerShell command to search the history of sites installed with the Sitecore Install Assistant:
  ```
  Select-String -Path "$env:USERPROFILE\sitecore.installassistant\Sitecore-InstallConfiguration_*.txt" -Pattern "\[SitecoreXP0_CreateWebsite\]\:\[Create\] "
  ```
  Which in my case came back with:
  ```
  Sitecore-InstallConfiguration_1576455425.txt:711:[SitecoreXP0_CreateWebsite]:[Create] sergesc.dev.local
  Sitecore-InstallConfiguration_1581641373.txt:710:[SitecoreXP0_CreateWebsite]:[Create] habitathomesc.dev.local
  Sitecore-InstallConfiguration_1585527079.txt:725:[SitecoreXP0_CreateWebsite]:[Create] sxastyleguidesc.dev.local
  ```
6. Run the uninstall script using `.\Sitecore-Uninstall-SIA.ps1` to uninstall the latest installed Sitecore site, or with `-SIALogFile "$env:USERPROFILE\sitecore.installassistant\Sitecore-InstallConfiguration_1585527079.txt"` to uninstall a specific Sitecore site
7. Have your **SQLServer** (`localhost` in my case), **SqlAdminUser** (`sa` in my case), and **SqlAdminPassword** ready, make sure you are uninstalling the right site and GO!

Please do this at your own risk:-)

Note that you can remove the SIA log file and corresponding files with the same number after you successfully removed your site. Don't remove the remaining log files, you need them for new uninstalls.
