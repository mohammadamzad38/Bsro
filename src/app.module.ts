import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
import { UserModule } from './modules/users/user.module.js';
import { TicketsModule } from './modules/tickets/tickets.module.js';
import { CommentsModule } from './modules/comments/comments.module.js';
=======
>>>>>>> a71b664b140ae5491f67360eae849b7d9e26c6b0

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGODB_URL'),
      }),
    }),
<<<<<<< HEAD

    UserModule,

    TicketsModule,

    CommentsModule,
=======
>>>>>>> a71b664b140ae5491f67360eae849b7d9e26c6b0
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
