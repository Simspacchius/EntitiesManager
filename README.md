# Entities Manager

### Setup

- Open Docker Desktop
- From the root of the project, change into the `.\adonis-backend\backend` directory
- Run `npm ci` to install dependencies
- Run `docker compose up -d` to create images and run containers (env files already there just for your ease)
- Run `node ace migration:fresh --seed` to create the database and seed the tables
- Access the application at `localhost:3000` in your browser

### Tech

- Database: PostgreSQL.
- Backend: Adonis, Typescript.
- Frontend: React, Typescript, React Router, Axios, Mobx, Formik, Yup, SemanticUI.
