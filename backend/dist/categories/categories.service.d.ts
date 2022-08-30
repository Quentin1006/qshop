import { PrismaService } from 'src/prisma.service';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        id: number;
        name: string;
    } | {
        name: string;
        id: string;
    })[]>;
}
