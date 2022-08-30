import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrUpdate({ id, email, createdAt, updatedAt, lastname, firstname, }: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        roleId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        firstname: string;
        lastname: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
