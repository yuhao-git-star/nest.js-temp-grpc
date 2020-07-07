import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { EventsModule } from './events/events.module';
import { RedisClientModule } from './redis/redis-client/redis-client.module';
import { ServiceModule } from './services/service.module';
import { Routes, RouterModule } from 'nest-router';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { APPWinstonModule } from './winston/appwinston.module';
import { HeroController } from './controller/hero/hero.controller';

@Module({
  imports: [
    ConfigModule,
    APPWinstonModule,
    // TypeOrmConfigModule,
    // RedisClientModule,
    EventsModule,
    // ElasticsearchConfigModule,
    AuthModule,
    ServiceModule,
    WinstonModule,
  ],
  providers: [
  ],
  controllers:[
    HeroController
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes('*');
  }
 }
