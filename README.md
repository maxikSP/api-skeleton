<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository with a [Docker](https://docs.docker.com/get-docker/).

## Installation
1. Make sure that you have [docker](https://docs.docker.com/engine/install/), [docker-compose](https://docs.docker.com/compose/install/) apps and [node](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) installed, before any further develop activities.
2. Create a new folder, go in and upload sources from the repo
    ```bash 
    # Create folder
    $ mkdir skeleton && cd skeleton
    ```
    ```bash
    # Clone source
    $ git clone git@github.com:maxikSP/api-skeleton.git . 
    ```

## Running the containers and the app
1. Generate new RSA key pairs (Can be skipped)
     ```bash
     # Generate private key
     $ openssl genrsa -out private.pem 2048
     ```
     ```bash
     # Generate public key
     $ openssl rsa -in private.pem -pubout > public.pem
     ```
     ```bash
     # Convert the keys to one line string 
     $ awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' private.pem
     $ awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' public.pem
     ```
     ```bash  
       # Update .env file with your keys
     JWT_PRIVATE_KEY="genearte your private key"
     JWT_PUBLIC_KEY="genearte your public key"
    ```
2. Run docker services
    ```bash
    # Run docker containers
    $ docker compose -f docker-compose.yaml -f docker-compose.api.yaml up --build
    ```

4. Apply database migrations and load data fixtures
   ```bash
   # Bash commands
   $ docker-compose exec api bash 
    ```
   ```bash
    # Apply migrations
    $ NODE_ENV=local npm run db:migration:run
    ```
    ```bash
    # Load data fixtures
    $ NODE_ENV=local npm run fixtures:load
    ```
5. Project startup in watch mode with access at http://localhost:3000/api/docs
