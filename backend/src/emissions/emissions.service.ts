import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emission } from './emission.entity';

@Injectable()
export class EmissionsService {
  constructor(
    @InjectRepository(Emission)
    private readonly emissionRepository: Repository<Emission>,
  ) {}

  findAll(): Promise<Emission[]> {
    return this.emissionRepository.find({ relations: ['sector'] });
  }

  findBySector(sectorId: string): Promise<Emission[]> {
    return this.emissionRepository.find({
      where: { sectorId },
      relations: ['sector'],
    });
  }

  async findOne(id: string): Promise<Emission> {
    const emission = await this.emissionRepository.findOne({
      where: { id },
      relations: ['sector'],
    });
    if (!emission) {
      throw new NotFoundException(`Emission #${id} not found`);
    }
    return emission;
  }
}
