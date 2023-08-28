import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import validateEnv from '@/utils/validateEnv';
import usersRouter from '@/routers/users.routes';
import authRouter from '@/routers/auth.routes';
import errorMiddleware from '@middlewares/error.middleware';
import { setupSwagger } from '@config/swaggerConfig';
import rolesRouter from "@routers/roles.routes";
import permissionsRouter from "@routers/permissions.routes";

// App Variables

dotenv.config();
validateEnv();

const port = process.env.PORT;

// App Configuration

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);

// Swagger
setupSwagger(app);

// Routes
app.use('/auth', authRouter);
app.use('/auth/users', usersRouter);
app.use('/auth/roles', rolesRouter);
app.use('/auth/permissions', permissionsRouter);

// Server Activation

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
