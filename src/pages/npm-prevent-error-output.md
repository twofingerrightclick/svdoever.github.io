---
title: Prevent useless npm error output in your project
published: true
date: '2022-02-16'
spoiler: When you run an npm script that has not exit code 0, an annoying set of useless error lines is shown. But there are some options to get rid of them!
description: When you run an npm script that has not exit code 0, an annoying set of useless error lines is shown. But there are some options to get rid of them!
tags: npm
canonical_url: https://www.sergevandenoever.nl/npm-prevent-error-output/
cover_image: 
series: 
---
When you write a node script that can be executed through npm, is is convenient to have an error exit code when for example a validation error occurs.

Assume we have an npm script validate as follows:

```
   "scripts": {
       "validate": "node validate.js"
   }
```

If we run `npm run validate` We get output like:

```
Development mode: false
Current working directory: C:\P\competenceframework\packages\content
ERROR: C:\P\competenceframework\packages\content\src\competenceframework-settings.json(1,1): SchemaValidationError - rings is not allowed.
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! @competenceframework/content@1.0.0 validate: `validate`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the @competenceframework/content@1.0.0 validate script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\serge\AppData\Roaming\npm-cache\_logs\2022-02-15T23_23_29_477Z-debug.log
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! competenceframework@1.0.0 validate: `cd packages && cd content && npm run validate`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the competenceframework@1.0.0 validate script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\serge\AppData\Roaming\npm-cache\_logs\2022-02-15T23_23_29_526Z-debug.log
```

A large part of the error output is useless, it is npm related.

To skip this output use the `--silent` flag when calling npm:

```
npm run validate --silent
```

The output will now be:

```
Development mode: false
Current working directory: C:\P\competenceframework\packages\content
ERROR: C:\P\competenceframework\packages\content\src\competenceframework-settings.json(1,1): SchemaValidationError - rings is not allowed.
```

If you run the script from a VSCode task `validate`, configured in `.vscode/tasks.json` it is possible to prevent the output as follows using the `--silent` flag:

```
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Validate",
            "detail": "Validate all content and parse errors from output",
            "type": "npm",
            "script": "validate --silent",
            "problemMatcher": [
                {
                    "owner": "content-linter",
                    "fileLocation": ["autoDetect", "${workspaceFolder}"],
                    "pattern": {
                        "regexp": "^(ERROR|WARNING):\\s*(.*)\\((\\d+),(\\d+)\\):\\s+(.*)$",
                        "file": 2,
                        "line": 3,
                        "column": 4,
                        "severity": 1,
                        "message": 5
                    }
                }
            ],
            "options": {
                "statusbar": {
                    "label": "$(check-all) Validate",
                    "color": "#00FF00"
                }
            }
        }
    ]
}
```

It is also possible to suppress the npm error output in your project by adding a file `.npmrc` with the following content:

```
loglevel=silent
```

Using the above configuration the `--silent` flag is not required in the task configuration.