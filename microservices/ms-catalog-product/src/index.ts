// Required External Modules

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import validateEnv from '@utils/validateEnv';
import ingredientsRouter from '@routers/ingredients.routes';
import allergensRouter from '@routers/allergens.routes';
import errorMiddleware from '@/middleware/error.middleware';
import { setupSwagger } from '@config/swaggerConfig';
import providersRouter from '@routers/providers.routes';
import productsRouter from '@routers/products.routes';
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
app.use(errorMiddleware);

// Swagger
setupSwagger(app);

// Routes

app.use('/catalog/ingredients', ingredientsRouter);
app.use('/catalog/allergens', allergensRouter);
app.use('/catalog/providers', providersRouter);
app.use('/catalog/products', productsRouter);
app.use('/catalog/orders', ordersRouter);

// Server Activation

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
