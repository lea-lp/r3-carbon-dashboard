import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { Sector } from './sector.entity';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Get()
  findAll(): Promise<Sector[]> {
    return this.sectorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<Sector> {
    return this.sectorsService.findOne(id);
  }
}
