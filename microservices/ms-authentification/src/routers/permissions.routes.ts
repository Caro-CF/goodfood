import { Router } from 'express';
import PermissionsController from '@controllers/permissions.controller'; // Import your PermissionsController
import { authAdminMiddleware } from '@middlewares/auth.middleware';

const permissionsRouter = Router();
const permissionsController = new PermissionsController();

/**
 * @openapi
 * tags:
 *  name: Permissions
 *  description: Permission routes
 */

/**
 * @swagger
 * /permissions:
 *  get:
 *    summary: Get all permissions
 *    tags: [Permissions]
 *    responses:
 *    200:
 *      description: OK
 */
permissionsRouter.get('/', authAdminMiddleware, permissionsController.getPermissions);

/**
 * @swagger
 * /permissions/:id:
 *  get:
 *    summary: Get permission by ID
 *    tags: [Permissions]
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
permissionsRouter.get('/:id', authAdminMiddleware, permissionsController.getPermissionById);

/**
 * @swagger
 * /permissions:
 *  post:
 *    summary: Create permission
 *    tags: [Permissions]
 *    responses:
 *    201:
 *      description: Created
 */
permissionsRouter.post('/', authAdminMiddleware, permissionsController.createPermission);

/**
 * @swagger
 * /permissions/:id:
 *  put:
 *    summary: Update permission by ID
 *    tags: [Permissions]
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
permissionsRouter.put('/:id', authAdminMiddleware, permissionsController.updatePermission);

/**
 * @swagger
 * /permissions/:id:
 *  delete:
 *    summary: Delete permission by ID
 *    tags: [Permissions]
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *        type: integer
 */
permissionsRouter.delete('/:id', authAdminMiddleware, permissionsController.deletePermission);

export default permissionsRouter;