import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './sector.entity';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}

  findAll(): Promise<Sector[]> {
    return this.sectorRepository.find();
  }

  async findOne(id: string): Promise<Sector> {
    const sector = await this.sectorRepository.findOneBy({ id });
    if (!sector) {
      throw new NotFoundException(`Sector #${id} not found`);
    }
    return sector;
  }
}
