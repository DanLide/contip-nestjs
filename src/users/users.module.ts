import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import { ProfileService } from '../profile/profile.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
  // We use forwardRef() for avoiding circular dependency
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ProfileModule)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
