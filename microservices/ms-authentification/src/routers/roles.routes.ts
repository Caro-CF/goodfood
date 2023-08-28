import { Router } from 'express';
import RolesController from '@controllers/roles.controller'; // Import your RolesController
import { authAdminMiddleware } from '@middlewares/auth.middleware';

const rolesRouter = Router();
const rolesController = new RolesController();

/**
 * @openapi
 * tags:
 *  name: Roles
 *  description: Role routes
 */
/**
 * @swagger
 * /roles:
 *  get:
 *    summary: Get all roles
 *    tags: [Roles]
 *    responses:
 *    200:
 *      description: OK
 */
rolesRouter.get('/', authAdminMiddleware, rolesController.getRoles);

/**
 * @swagger
 * /roles/:id:
 *  get:
 *    summary: Get role by ID
 *    tags: [Roles]
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *    200:
 *      description: OK
 */
rolesRouter.get('/:id', authAdminMiddleware, rolesController.getRoleById);

/**
 * @swagger
 * /roles:
 *  post:
 *    summary: Create role
 *    tags: [Roles]
 *    responses:
 *    201:
 *      description: Created
 */
rolesRouter.post('/', authAdminMiddleware, rolesController.createRole);

/**
 * @swagger
 * /roles/:id:
 *  put:
 *    summary: Update role by ID
 *    tags: [Roles]
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *    200:
 *      description: OK
 */
rolesRouter.put('/:id', authAdminMiddleware, rolesController.updateRole);

/**
 * @swagger
 * /roles/:id:
 *  delete:
 *    summary: Delete role by ID
 *    tags: [Roles]
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *        type: integer
 */
rolesRouter.delete('/:id', authAdminMiddleware, rolesController.deleteRole);

export default rolesRouter;
