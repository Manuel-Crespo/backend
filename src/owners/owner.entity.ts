import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehicle } from '../vehicles/vehicle.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  // Un propietario puede tener varios vehículos
  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner, {
    cascade: true,
  })
  vehicles: Vehicle[];
}
