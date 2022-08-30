import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createOrUpdate(createUserDto: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        roleId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findRandom(): Promise<{
        id: number;
    }>;
    findOne(id: string): Promise<{
        firstname: string;
        lastname: string;
        email: string;
    }>;
    findTwo(id: string, req: any): Promise<any>;
    remove(id: string): string;
}
