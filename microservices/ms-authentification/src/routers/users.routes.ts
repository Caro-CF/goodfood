import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { authMiddleware, authAdminMiddleware } from '@middlewares/auth.middleware';

const usersRouter = Router();
const usersController = new UsersController();

/**
 * @openapi
 * tags:
 *  name: Users
 *  description: User routes
 */
/**
 * @swagger
 * /users:
 *  get:
 *    summary: Get all users
 *    tags: [Users]
 *    responses:
 *    200:
 *      description: OK
 */
usersRouter.get('/', authAdminMiddleware, usersController.getUsers);

usersRouter.get('/:id', authAdminMiddleware, usersController.getUserById);

usersRouter.post('/', authAdminMiddleware,usersController.createUser);

usersRouter.put('/:id', authAdminMiddleware, usersController.updateUser);

usersRouter.delete('/:id', authAdminMiddleware, usersController.deleteUser);

export default usersRouter;
