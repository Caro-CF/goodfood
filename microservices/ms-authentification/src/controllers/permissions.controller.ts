import { NextFunction, Request, Response } from "express";
import PermissionsService from '@/services/permissions.service'; // Import your PermissionsService
import { Permission } from '@prisma/client';
import { CreatePermissionDto, UpdatePermissionDto } from "@/dtos/permissions.dto"; // Import your DTOs
import { validate } from 'class-validator';
// import { CreatePermissionResponse } from '@/interfaces/permissions.interface';

class PermissionsController {
  public permissionsService = new PermissionsService(); // Instantiate your PermissionsService

  public getPermissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const permissions: Permission[] = await this.permissionsService.getPermissions();
      res.status(200).json({ permissions });
    } catch (error) {
      next(error);
    }
  };

  public getPermissionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const permission: Permission | null = await this.permissionsService.getPermissionById(id);
      res.status(200).json({ permission });
    } catch (error) {
      next(error);
    }
  };

  public createPermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createPermissionDto = new CreatePermissionDto(); // Use your DTO class
      createPermissionDto.name = req.body.name;
      createPermissionDto.description = req.body.description;

      const errors = await validate(createPermissionDto);
      if (errors.length > 0) {
        const constraints = {};
        errors.forEach(error => {
          const propertyName = error.property;
          const errorConstraints = Object.values(error.constraints);
          constraints[propertyName] = errorConstraints;
        });
        res.status(400).json({ constraints });
        return;
      }

      const permissionData: CreatePermissionDto = req.body;
      const createdPermission: Permission = await this.permissionsService.createPermission(permissionData);

      res.status(201).json({ data: createdPermission, message: 'Permission created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const updatePermissionDto = new UpdatePermissionDto();
      updatePermissionDto.name = req.body.name;
      updatePermissionDto.description = req.body.description;

      const errors = await validate(updatePermissionDto);
      if (errors.length > 0) {
        const constraints = {};
        errors.forEach(error => {
          const propertyName = error.property;
          const errorConstraints = Object.values(error.constraints);
          constraints[propertyName] = errorConstraints;
        });
        res.status(400).json({ constraints });
        return;
      }

      const updatedPermission = await this.permissionsService.updatePermission(id, updatePermissionDto);

      res.status(200).json({ data: updatedPermission, message: 'Permission updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const deletedPermission: Permission = await this.permissionsService.deletePermission(id);

      res.status(204).json({ data: deletedPermission, message: 'Permission deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PermissionsController;
