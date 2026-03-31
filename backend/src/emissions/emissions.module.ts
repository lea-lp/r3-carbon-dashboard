import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emission } from './emission.entity';
import { EmissionsService } from './emissions.service';
import { EmissionsController } from './emissions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Emission])],
  providers: [EmissionsService],
  controllers: [EmissionsController],
  exports: [EmissionsService],
})
export class EmissionsModule {}
