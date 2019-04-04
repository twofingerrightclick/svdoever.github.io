---
title: Umbrella for Sitecore JSS
date: '2019-04-04'
spoiler: Umbrella for Sitecore JSS is our vision on how a website should be developed and hosted while using the JSS SDK and Sitecore as a headless CMS.
---

I'm sitting at the keynote of the Sitecore [SUGCON Europe 2019](https://www.sugcon.eu/) conference listening to the opening keynote by Donovan Brown from Microsoft. Donovan Brown is a Senior DevOps Program Manager on Microsoft’s US Developer Division team and is telling about Azure DevOps. A perfect time to write a blog post on our open source Sitecore JSS starter project we have been working on for the last months.

And the nice thing: the project uses Azure DevOps pipelines to build and deploy the sample site coming with the starter kit!

[Umbrella for Sitecore JSS](bit.ly/sitecoreumbrella) is our vision on how a website should be developed and hosted while using the JSS SDK and Sitecore as a headless CMS.

With the introduction of [Sitecore JavaScript Services](https://jss.sitecore.com/), or JSS for short, Sitecore created an SDK to allow developers to use Sitecore as a headless CMS. Finally website developers are free to build a website using their own technology stack while utilizing the Sitecore platform.

Sitecore provides a great starter to start working with Sitecore JSS in combination with React, but we had some additional ideas on how we want to use JSS in combination with React. Some of those ideas are:

- Use TypeScript for development (standard Sitecore JSS starter for React used JavaScript)
- Run the frontend separate from the Sitecore CD server
- Run the frontend in a Linux Docker container, utilizing NodeJS, Express, PM2, NGINX, ...
- Be able to run disconnected from Sitecore, so we can showcase a solution without having the licensing issues for JSS already solved
- Be able to export Sitecore items items including media so we can enbed them in the Docker container so we can develop "Sitecore first", but run without Sitecore installed

For more information head over to the [GitHub repo](https://github.com/macaw-interactive/react-jss-typescript-starter), or checkout the [sample website](https://react-jss-typescript-starter-develop.azurewebsites.net/)!

And what did we do to build and deploy the Docker image using azure pipelines?

azure_pipelines.yaml:

```yaml
trigger:
  branches:
    include:
    - master
    - develop

pool:
  vmImage: 'Ubuntu-16.04'

steps:
- checkout: self
  
- script: |
    docker build -f Docker/Dockerfile -t $(dockerId).azurecr.io/$(imageName):$(Build.SourceBranchName) .
    docker login -u $(dockerId) -p $(dockerPassword) $(dockerId).azurecr.io
    docker push $(dockerId).azurecr.io/$(imageName):$(Build.SourceBranchName) 
  displayName: 'docker build'
```

Pretty easy! The hard thing for the build is the multistage Dockerfile:

```Dockerfile
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
RUN npm run build-server:production

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

# Install node
RUN apt-get update -yq && apt-get upgrade -yq
RUN apt-get install -yq \
		curl \
		git \
		nano \
		gnupg \
		gnupg2 \
		gnupg1
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -yq nodejs

# Enable with ssh configures for Azure App Service
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog \
        && apt-get update \
	&& apt-get install -y --no-install-recommends openssh-server \
	&& echo "$SSH_PASSWD" | chpasswd 
COPY Docker/sshd_config /etc/ssh/

# Install PM2
RUN npm install -g pm2

# PM2 process script
COPY Docker/process.yml /app/

# Entry point script
COPY Docker/init.sh /usr/local/bin/init.sh
RUN chmod u+x /usr/local/bin/init.sh

# Copy the default nginx.config provided by tiangolo/node-frontend
COPY Docker/nginx.config /etc/nginx/sites-available/default

# Copy the static creat-react-app assets
COPY --from=build-stage /app/build/ /app/build

# Copy the Node Express server
COPY --from=build-stage /app/build.server/ /app/build.server

# Copy the disconnected mode proxy server and install dependencies
COPY --from=build-stage /app/server.disconnectedproxy/ /app/server.disconnectedproxy
WORKDIR /app/server.disconnectedproxy
RUN npm install

# Copy the data/sitecore for running offline
COPY --from=build-stage /app/data/ /app/data
COPY --from=build-stage /app/sitecore/ /app/sitecore

WORKDIR /app

EXPOSE 80 2222
ENTRYPOINT ["/usr/local/bin/init.sh"]
```

For more information checkout the [GitHub repo](https://github.com/macaw-interactive/react-jss-typescript-starter) and let us know if it is helpful for you! Have fun!