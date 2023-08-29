import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import validateEnv from '@/utils/validateEnv';
import errorMiddleware from '@middlewares/error.middleware';
import { setupSwagger } from '@config/swaggerConfig';
import ordersRouter from '@routers/orders.routes';

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
app.use('/order', ordersRouter);

// Server Activation

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
