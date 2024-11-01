## Description

REST API with NestJs, Postgres, Sequelize ORM.

## Installation

```bash
$ git clone https://github.com/tristiyadi/nest-api.git
```

npm install @nestjs/common@latest @nestjs/core@latest @nestjs/swagger@latest --save

## How to Create Controller

- nest g controller module/sendemail
- nest g module module/sendemail
- nest g service module/sendemail

## Running the app

- cd into `nest-api`
- run `npm install`
- rename `.env.sample` to `.env` and populate the required parameters
- set up sequelize-cli for global

  - npx sequelize init # --force if needed
  - npx sequelize-cli model:generate --name SendEmail --attributes id:string,email:string,description:string
  - npx sequelize-cli migration:generate --name create-sendemail
  - npx sequelize-cli seed:generate --name create-data-users
  - npx sequelize-cli db:migrate

- npm run db:purge
- run `npm run start:dev`

## Upgrading Package Projects

```bash
$ npm i -g npm-check-updates
$ ncu -u
$ npm install
```

## License

[MIT licensed](LICENSE).
