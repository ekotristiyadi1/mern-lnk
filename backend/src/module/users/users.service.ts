import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Users } from 'src/core/models/users.models';
import { USERS_REPOSITORY } from './../../core/providers/constants';
// import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly userRepository: typeof Users,
    // @InjectModel(Users) private readonly userRepository: typeof Users,
  ) {}

  async create(user: Users) {
    return this.userRepository.create(user);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return this.userRepository.findByPk(id);
  }

  async findByUsernameOrEmail(username: string): Promise<Users> {
    return await this.userRepository.findOne<Users>({
      where: { [Op.or]: [{ username: username }, { email: username }] },
    });
  }

  async update(id: string, user: Users) {
    await this.userRepository.update(user, { where: { id } });
    return this.userRepository.findByPk(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await user.destroy();
    return user;
  }
}
