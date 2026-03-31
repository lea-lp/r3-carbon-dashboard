import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sector } from '../sectors/sector.entity';

@Entity('emissions')
export class Emission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column('float')
  value: number;

  @Column()
  unit: string;

  @Column({ type: 'varchar', nullable: true })
  source: string | null;

  @ManyToOne(() => Sector, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sectorId' })
  sector: Sector;

  @Column()
  sectorId: string;
}
