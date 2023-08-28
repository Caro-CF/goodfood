import { PrismaClient, User } from '@prisma/client';
import { CreateAdminUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { hash } from 'bcrypt';

class UsersService {
  public users = new PrismaClient().user;

  public getUsers = async (): Promise<User[]> => {
    try {
      return await this.users.findMany();
    } catch (e) {
      throw new Error(e);
    }
  };

  public getUserById = async (id: number): Promise<User | null> => {
    const findUser: User = await this.users.findUnique({ where: { id: id } });
    if (!findUser) throw new HttpException(409, `No user with id ${id}`);

    return findUser;
  };

  public async createUser(data: CreateAdminUserDto): Promise<User> {
    const findUser: User = await this.users.findUnique({ where: { email: data.email } });
    if (findUser) throw new HttpException(409, `This email ${data.email} already exists`);

    const hashedPassword = await hash(data.password, 10);
    const createUserData: Promise<User> = this.users.create({ data: { ...data, password: hashedPassword } });

    return createUserData;
  }

  public updateUser = async (id: number, data: User): Promise<User> => {
    const findUser: User = await this.users.findUnique({ where: { id: id } });
    if (!findUser) throw new HttpException(409, `No user with id ${id}`);

    const updateData: Record<string, any> = {};
    if (data.email && data.email !== findUser.email) updateData.email = data.email;
    if (data.name && data.name !== findUser.name) updateData.name = data.name;
    if (data.firstname && data.firstname !== findUser.firstname) updateData.firstname = data.firstname;
    if (data.phone_number && data.phone_number !== findUser.phone_number) updateData.phone_number = data.phone_number;

    if (Object.keys(updateData).length === 0) {
      throw new HttpException(400, 'No fields to update');
    }

    const updatedUser: User = await this.users.update({ where: { id: id }, data: updateData });
    return updatedUser;
  };

  public deleteUser = async (id: number): Promise<User> => {
    const findUser: User = await this.users.findUnique({ where: { id: id } });
    if (!findUser) throw new HttpException(409, `No user with id ${id}`);

    const deletedUser: User = await this.users.delete({ where: { id: id } });
    return deletedUser;
  };
}

export default UsersService;
