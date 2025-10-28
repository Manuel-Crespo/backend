import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { OwnerService } from '../owners/owner.service';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly ownerService: OwnerService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const owner = await this.ownerService.findOne(createVehicleDto.ownerId);
    if (!owner) {
      throw new NotFoundException(
        `Owner with ID ${createVehicleDto.ownerId} not found`,
      );
    }

    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      owner, // Pasamos el objeto completo de Owner
    });

    return this.vehicleRepository.save(vehicle);
  }

  findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ relations: ['owner'] });
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async remove(id: string): Promise<void> {
    const result = await this.vehicleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
  }

  async searchByPlate(partialPlate: string): Promise<Vehicle[]> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.owner', 'owner')
      .where('vehicle.plate ILIKE :plate', { plate: `%${partialPlate}%` })
      .getMany();
  }
}
