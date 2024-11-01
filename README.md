# BDockerize BE & FE MERN

# SETUP BE

npm install -g @nestjs/cli
nest new backend
npm install @nestjs/mongoose mongoose bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken

<!--
npm init -y
npm install express mongoose bcryptjs jsonwebtoken express-session body-parser dotenv session-file-store
npm install -D typescript @types/express @types/node @types/bcryptjs @types/jsonwebtoken @types/express-session ts-node
npx tsc --init
-->

# SETUP FE

npm create vite@latest frontend -- --template react-ts
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Dockerize

RUN : `docker compose up -d --build`
