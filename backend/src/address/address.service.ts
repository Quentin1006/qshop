import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async createFakeAddress(name: string) {
    await sleep(5000);
    return this.prisma.fakeAddress.upsert({
      where: {
        id: 5,
      },
      create: {
        name,
      },
      update: {
        name,
      },
    });
  }

  getFakeAddress() {
    return this.prisma.fakeAddress.findFirst();
  }

  findUserAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: {
        userId,
      },
    });
  }

  createUserAddress(userId: string, address: CreateAddressDto) {
    return this.prisma.address.create({
      data: {
        ...address,
        type: address.type ?? 'PERSONAL',
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  updateUserAddress(userId: string, address: UpdateAddressDto) {
    return this.prisma.address.update({
      where: {
        id: address.id,
      },
      data: {
        city: address.city,
        complement: address.complement,
        contactNumber: address.contactNumber,
        country: address.country,
        main: address.main,
        number: address.number,
        shippingInstructions: address.shippingInstructions,
        street: address.street,
        zipcode: address.zipcode,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  deleteUserAddress(addressId: number) {
    return this.prisma.address.delete({
      where: {
        id: addressId,
      },
    });
  }
}
