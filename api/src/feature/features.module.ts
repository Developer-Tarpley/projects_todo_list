import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesService } from './features.service';
import { Feature } from './entity/feature.entity';

@Module({
  providers: [FeaturesService],
  exports: [FeaturesService],
  imports: [TypeOrmModule.forFeature([Feature])]
})
export class FeaturesModule {}