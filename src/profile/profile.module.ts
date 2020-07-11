import { forwardRef, Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Profile from './profile.entity';
import { UsersModule } from '../users/users.module';

@Module({
  // We use forwardRef() for avoiding circular dependency
  imports: [TypeOrmModule.forFeature([Profile]), forwardRef(() => UsersModule)],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
