import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOwnerDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'juanperez@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '555-123-4567', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
