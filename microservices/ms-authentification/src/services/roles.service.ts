import { PrismaClient, Role } from '@prisma/client';
import { CreateRoleDto, UpdateRoleDto } from "@dtos/roles.dto"; // Import your DTOs
import { HttpException } from "@exceptions/HttpException";

class RolesService {
  public roles = new PrismaClient().role;

  public getRoles = async (): Promise<Role[]> => {
    try {
      return await this.roles.findMany();
    } catch (e) {
      throw new Error(e);
    }
  };

  public getRoleById = async (id: number): Promise<Role | null> => {
    const findRole: Role = await this.roles.findUnique({ where: { id: id } });
    if (!findRole) throw new HttpException(409, `No role with id ${id}`);

    return findRole;
  };

  public async createRole(data: CreateRoleDto): Promise<Role> {
    const findRole: Role = await this.roles.findUnique({ where: { name: data.name } });
    if (findRole) throw new HttpException(409, `This role ${data.name} already exists`);

    const createRoleData: Promise<Role> = this.roles.create({ data });

    return createRoleData;
  }

  public updateRole = async (id: number, data: UpdateRoleDto): Promise<Role> => {
    const findRole: Role = await this.roles.findUnique({ where: { id: id } });
    if (!findRole) throw new HttpException(409, `No role with id ${id}`);

    const updatedRole: Role = await this.roles.update({ where: { id: id }, data: data });
    return updatedRole;
  };

  public deleteRole = async (id: number): Promise<Role> => {
    const findRole: Role = await this.roles.findUnique({ where: { id: id } });
    if (!findRole) throw new HttpException(409, `No role with id ${id}`);

    const deletedRole: Role = await this.roles.delete({ where: { id: id } });
    return deletedRole;
  };
}

export default RolesService;
