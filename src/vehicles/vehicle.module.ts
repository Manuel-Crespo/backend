import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { Vehicle } from './vehicle.entity';
import { OwnersModule } from '../owners/owner.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]), OwnersModule],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehiclesModule {}
