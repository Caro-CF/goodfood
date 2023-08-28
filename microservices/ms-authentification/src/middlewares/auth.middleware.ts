import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const getAuthorization = req => {
  const cookie = req.cookies['Authorization'];
  if (cookie) return cookie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse: DataStoredInToken = await verify(Authorization, secretKey);
      const userId = verificationResponse.id;

      const users = new PrismaClient().user;
      const findUser = await users.findUnique({ where: { id: userId } });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

const authAdminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse: DataStoredInToken = await verify(Authorization, secretKey);
      const userId = verificationResponse.id;

      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({ where: { id: userId }, include: { Role: true } });

      if (user) {
        req.user = user;

        const adminRole = await prisma.role.findUnique({ where: { name: 'Admin' } });
        // Check if the user has the required role
        if (user.Role && user.Role.id === adminRole.id) {
          // Replace 'Admin' with the desired role name
          next();
        } else {
          next(new HttpException(403, 'Insufficient permissions'));
        }
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export { authMiddleware, authAdminMiddleware };
