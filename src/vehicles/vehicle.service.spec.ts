import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
import { OwnerService } from '../owners/owner.service';
import { Repository } from 'typeorm';

describe('VehicleService', () => {
  let service: VehicleService;
  let mockRepo: Partial<Record<keyof Repository<Vehicle>, jest.Mock>>;
  let mockOwnerService: Partial<Record<keyof OwnerService, jest.Mock>>;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    mockOwnerService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: mockRepo,
        },
        {
          provide: OwnerService,
          useValue: mockOwnerService,
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('should create a vehicle', async () => {
    const owner = { id: 'owner-1', name: 'Juan', email: 'juan@mail.com' };
    const vehicleData = {
      plate: 'ABC123',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      ownerId: 'owner-1',
    };

    mockOwnerService.findOne.mockResolvedValue(owner);
    mockRepo.create.mockImplementation((dto) => ({ ...dto }));
    mockRepo.save.mockImplementation((dto) => Promise.resolve(dto));

    const result = await service.create(vehicleData);

    expect(mockOwnerService.findOne).toHaveBeenCalledWith('owner-1');
    expect(mockRepo.create).toHaveBeenCalledWith({
      ...vehicleData,
      owner,
    });
    expect(mockRepo.save).toHaveBeenCalledWith({
      ...vehicleData,
      owner,
    });
    expect(result).toEqual({
      ...vehicleData,
      owner,
    });
  });
});
