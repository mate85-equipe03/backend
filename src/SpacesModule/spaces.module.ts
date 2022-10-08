import { Module } from '@nestjs/common';
import { SpacesController } from './spaces.controller';
import { DoSpacesService } from './SpacesService/doSpacesService';
import { DoSpacesServiceProvider } from './SpacesService';

@Module({
  // provide both the service and the custom provider
  providers: [DoSpacesServiceProvider, DoSpacesService],
  exports: [DoSpacesServiceProvider, DoSpacesService],
})
export class SpacesModule {}
