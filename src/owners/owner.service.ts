import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const existing = await this.ownerRepository.findOne({
      where: { email: createOwnerDto.email },
    });
    if (existing) {
      throw new BadRequestException('Email is already registered');
    }

    const owner = this.ownerRepository.create(createOwnerDto);
    return await this.ownerRepository.save(owner);
  }

  async findAll() {
    return await this.ownerRepository.find({ relations: ['vehicles'] });
  }

  async findOne(id: string) {
    const owner = await this.ownerRepository.findOne({
      where: { id },
      relations: ['vehicles'],
    });
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    return owner;
  }

  async remove(id: string) {
    const result = await this.ownerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    return { message: `Owner ${id} deleted successfully` };
  }
}
