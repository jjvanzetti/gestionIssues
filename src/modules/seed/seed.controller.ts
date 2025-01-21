import { Controller ,Get, Logger,} from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  private readonly logger = new Logger(SeedController.name);

@Get('execute')
executeSeed() {
  
  this.logger.log('Creando una nseed...');
  return this.seedService.executeSeed();
 /* return { message: 'Seed ejecutado correctamente' }*/
}

}
