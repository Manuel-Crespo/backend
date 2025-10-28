import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ example: 'ABC123' })
  @IsNotEmpty()
  @IsString()
  plate: string;

  @ApiProperty({ example: 'Toyota' })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Corolla' })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ example: 2022 })
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @ApiProperty({ example: 'a83db1a1-29d0-45f8-b4b5-9a3b39e12a7d' })
  @IsUUID()
  ownerId: string;
}
