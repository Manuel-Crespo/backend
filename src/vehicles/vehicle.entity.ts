import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Owner } from '../owners/owner.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  plate: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ type: 'int' })
  year: number;

  @ManyToOne(() => Owner, (owner) => owner.vehicles, {
    onDelete: 'CASCADE', // elimina vehículos al borrar propietario
  })
  @JoinColumn({ name: 'ownerId' })
  owner: Owner;
}
