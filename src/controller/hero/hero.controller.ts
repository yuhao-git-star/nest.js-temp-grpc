import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('hero')
export class HeroController {
  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: HeroById, metadata: any): Hero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}

interface HeroById {
  id: number
}

interface Hero {
  id: number;
  name: string;
}