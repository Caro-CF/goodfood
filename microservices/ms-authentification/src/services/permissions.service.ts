import { PrismaClient, Permission } from '@prisma/client';
import { CreatePermissionDto, UpdatePermissionDto } from "@dtos/permissions.dto"; // Import your DTOs
import { HttpException } from "@exceptions/HttpException";

class PermissionsService {
  public permissions = new PrismaClient().permission;

  public getPermissions = async (): Promise<Permission[]> => {
    try {
      return await this.permissions.findMany();
    } catch (e) {
      throw new Error(e);
    }
  };

  public getPermissionById = async (id: number): Promise<Permission | null> => {
    const findPermission: Permission = await this.permissions.findUnique({ where: { id: id } });
    if (!findPermission) throw new HttpException(404, `No permission with id ${id}`);

    return findPermission;
  };

  public async createPermission(data: CreatePermissionDto): Promise<Permission> {
    const findPermission: Permission = await this.permissions.findUnique({ where: { name: data.name } });
    if (findPermission) throw new HttpException(409, `This permission ${data.name} already exists`);

    const createPermissionData: Permission = await this.permissions.create({ data });

    return createPermissionData;
  }

  public updatePermission = async (id: number, data: UpdatePermissionDto): Promise<Permission> => {
    const findPermission: Permission = await this.permissions.findUnique({ where: { id: id } });
    if (!findPermission) throw new HttpException(404, `No permission with id ${id}`);

    const updatedPermission: Permission = await this.permissions.update({ where: { id: id }, data: data });
    return updatedPermission;
  };

  public deletePermission = async (id: number): Promise<Permission> => {
    const findPermission: Permission = await this.permissions.findUnique({ where: { id: id } });
    if (!findPermission) throw new HttpException(404, `No permission with id ${id}`);

    const deletedPermission: Permission = await this.permissions.delete({ where: { id: id } });
    return deletedPermission;
  };
}

export default PermissionsService;
