import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerService } from './owner.service';
import { Owner } from './owner.entity';
import { BadRequestException } from '@nestjs/common';

describe('OwnerService', () => {
  let service: OwnerService;
  let mockRepo: Partial<Record<keyof Repository<Owner>, jest.Mock>>;

  beforeEach(async () => {
    mockRepo = {
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
      create: jest.fn(), // 🔹 Necesario para service.create()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnerService,
        { provide: getRepositoryToken(Owner), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<OwnerService>(OwnerService);
  });

  it('should create an owner', async () => {
    const ownerData = {
      name: 'Juan',
      email: 'juan@mail.com',
      phone: '555-1234',
    };

    mockRepo.findOne.mockResolvedValue(null); // email no existe
    mockRepo.create.mockReturnValue(ownerData); // create devuelve objeto
    mockRepo.save.mockResolvedValue({ id: 'uuid-1', ...ownerData }); // save simula DB

    const result = await service.create(ownerData as any);
    expect(result).toEqual({ id: 'uuid-1', ...ownerData });
    expect(mockRepo.create).toHaveBeenCalledWith(ownerData);
    expect(mockRepo.save).toHaveBeenCalledWith(ownerData);
  });

  it('should throw error if email exists', async () => {
    mockRepo.findOne.mockResolvedValue({
      id: 'uuid-1',
      email: 'juan@mail.com',
    });
    await expect(
      service.create({ email: 'juan@mail.com' } as any),
    ).rejects.toThrow(BadRequestException);
  });

  it('should list all owners', async () => {
    const owners = [{ id: '1', name: 'A' }];
    mockRepo.find.mockResolvedValue(owners as any);
    const result = await service.findAll();
    expect(result).toEqual(owners);
  });
});
