import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const authRouter = Router();
const authController = new AuthController();

/**
 * @openapi
 * tags:
 *  name: Auth
 *  description: Auth routes
 */

/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Signup
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *    content:
 *    application/json:
 *      schema:
 *        $ref: '#/components/schemas/CreateUserDto'
 *  responses:
 *    201:
 *      description: Created
 */
authRouter.post('/signup', authController.signUp);

/**
 * @openapi
 * /login:
 *  post:
 *    summary: Login
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *    responses:
 *      200:
 *        description: OK
 */
authRouter.post('/login', authController.logIn);

/**
 * @swagger
 * /logout:
 *  post:
 *    summary: Logout
 *    tags: [Auth]
 *    content:
 *    parameters:
 *    - in: header
 *    name: Authorization
 *    schema:
 *    description: Bearer <token>
 *    required: true
 *    type: string
 *    application/json:
 *    responses:
 *      200:
 *        description: OK
 */
authRouter.post('/logout', authMiddleware, authController.logOut);

export default authRouter;
