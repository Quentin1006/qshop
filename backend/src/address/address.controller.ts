import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Request,
  UseGuards,
  SetMetadata,
  Patch,
} from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
}
