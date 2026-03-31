import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { EmissionsService } from './emissions.service';
import { Emission } from './emission.entity';

@Controller('emissions')
export class EmissionsController {
  constructor(private readonly emissionsService: EmissionsService) {}

  @Get()
  findAll(@Query('sectorId') sectorId?: string): Promise<Emission[]> {
    if (sectorId) {
      return this.emissionsService.findBySector(sectorId);
    }
    return this.emissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<Emission> {
    return this.emissionsService.findOne(id);
  }
}
