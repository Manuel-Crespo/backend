import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            searchByPlate: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on service', async () => {
    const dto = {
      plate: 'ABC123',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      ownerId: 'owner-uuid',
    };
    const vehicle = { id: 'uuid', ...dto };
    jest.spyOn(service, 'create').mockResolvedValue(vehicle as any);

    expect(await controller.create(dto)).toEqual(vehicle);
  });
});
