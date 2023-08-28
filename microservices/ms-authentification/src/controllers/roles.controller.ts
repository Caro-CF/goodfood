import { NextFunction, Request, Response } from "express";
import RolesService from '@/services/roles.service'; // Import your RolesService
import { Role } from '@prisma/client';
import { CreateRoleDto, UpdateRoleDto } from "@/dtos/roles.dto"; // Import your DTOs
import { validate } from 'class-validator';
// import { CreateRoleResponse } from '@/interfaces/roles.interface';

class RolesController {
  public rolesService = new RolesService(); // Instantiate your RolesService

  public getRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roles: Role[] = await this.rolesService.getRoles();
      res.status(200).json({ roles });
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const role: Role | null = await this.rolesService.getRoleById(id);
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createRoleDto = new CreateRoleDto(); // Use your DTO class
      createRoleDto.name = req.body.name;
      createRoleDto.description = req.body.description;

      const errors = await validate(createRoleDto);
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

      const roleData: CreateRoleDto = req.body;
      const createdRole: Role = await this.rolesService.createRole(roleData);

      res.status(201).json({ data: createdRole, message: 'Role created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const updateRoleDto = new UpdateRoleDto();
      updateRoleDto.name = req.body.name;
      updateRoleDto.description = req.body.description;

      const errors = await validate(updateRoleDto);
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

      const updatedRole = await this.rolesService.updateRole(id, updateRoleDto);

      res.status(200).json({ data: updatedRole, message: 'Role updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const deletedRole: Role = await this.rolesService.deleteRole(id);

      res.status(204).json({ data: deletedRole, message: 'Role deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RolesController;
