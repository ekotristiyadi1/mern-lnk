import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { Users } from 'src/core/models/users.models';
import { usersProviders } from 'src/module/users/users.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [
    // SequelizeModule.forFeature([Users])
  ],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
