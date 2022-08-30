import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const tags = await this.prisma.tag.findMany({});
    const specialCategoriesWithId = ['bestsellers', 'brand_new', 'flash_sells'].map((cat) => ({
      name: cat,
      id: uuidv4(),
    }));
    return [...specialCategoriesWithId, ...tags];
  }
}
