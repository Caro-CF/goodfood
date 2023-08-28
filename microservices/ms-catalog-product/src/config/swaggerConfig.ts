import swaggerJsdoc from 'swagger-jsdoc';

const swaggerUi = require('swagger-ui-express');
import { Application } from 'express';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS API',
      description: 'Documentation for NodeJS API',
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['src/routers/*.ts', 'src/dtos/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Application): void {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
}
