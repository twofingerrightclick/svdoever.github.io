---
title: Git - getting list of changed files into zip file
published: true
date: '2018-05-03'
spoiler: Given an old Git repo, pull out changed files into a zip file.
description: Given an old Git repo, pull out changed files into a zip file.
tags: git, zip
---

I had a very old Git branch (*NewBranch*) where I did some new development. In the meantime, the branch I originally branched from (*OriginalBranch*) was so different that I only wanted to copy out the changed files into a zip file. I found some funky Git one-liner commands that work on Linux/Mac, but I’m on good old Windows. I managed to do it as follows:

1. Install a `zip.exe` executable somewhere into your path. I always have a `c:\bin` folder that is added to my path and I copy all tools into this directory. For `zip.exe` I use [Info-ZIP](https://www.info-zip.org/).

2. Open a command shell and change the directory to the root folder of the branch. I use [ConEmu](https://conemu.github.io/) as a shell.

3. Make sure that you have checked out the branch you want to copy files from, i.e. `git checkout NewBranch`. Make sure you get the latest files using `git pull`. To see your list of branches and the currently checked out branch use the command `git branch -a`.

4. Find the commit hash of the first commit in the new branch using the following Git command: `git merge-base OriginalBranch NewBranch`. This is a value that looks like `be61fd84b7abe0b4735a21367ba70db68e5e4ef9`. If you want an overview of last commits execute the following command: `git log --pretty=format:"%H - %an, %ar: %s"`. If you don’t like the long commit hashes you can also work with the abbreviated commit hashes. In this case use `%h` instead.

5. Execute the following command: `git diff --name-only be61fd84b7abe0b4735a21367ba70db68e5e4ef9 > diff-filelist.txt`. Where you use the commit hash of the commit from where you want to get the files from.

6. Zip the files using the command `more diff-filelist.txt | zip -@ files.zip`.

7. You can now go back to a more current branch and copy over the files that you need.