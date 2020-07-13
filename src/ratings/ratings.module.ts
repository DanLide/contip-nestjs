import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Rating from './rating.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), UsersModule],
  controllers: [RatingsController],
  providers: [RatingsService]
})
export class RatingsModule {}
