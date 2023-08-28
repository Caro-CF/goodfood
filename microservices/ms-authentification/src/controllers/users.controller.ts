import { NextFunction, Request, Response } from "express";
import UsersService from '@/services/users.service';
import { User } from '@prisma/client';
import { CreateAdminUserDto, CreateUserDto, UpdateUserDto } from "@/dtos/users.dto";
import { validate } from 'class-validator';
import { CreateUserResponse } from '@/interfaces/users.interface';
class UsersController {
  public usersService = new UsersService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users: User[] = await this.usersService.getUsers();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const user: User | null = await this.usersService.getUserById(id);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createUserDto = new CreateAdminUserDto();
      createUserDto.email = req.body.email;
      createUserDto.name = req.body.name;
      createUserDto.firstname = req.body.firstname;
      createUserDto.phone_number = req.body.phone_number;
      createUserDto.password = req.body.password;
      createUserDto.id_role = req.body.id_role;

      const errors = await validate(createUserDto);
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
      const userData: CreateAdminUserDto = req.body;
      const signUpUserData: User = await this.usersService.createUser(userData);

      res.status(201).json({ data: signUpUserData, message: 'User created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const updateUserDto = new UpdateUserDto();
      updateUserDto.email = req.body.email;
      updateUserDto.name = req.body.name;
      updateUserDto.firstname = req.body.firstname;
      updateUserDto.phone_number = req.body.phone_number;

      const errors = await validate(updateUserDto);
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

      const updatedUser = await this.usersService.updateUser(id, updateUserDto);
      res.status(200).json({ data: updatedUser, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      const deletedUser: User = await this.usersService.deleteUser(id);
      res.status(204).json({ data: deletedUser, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
