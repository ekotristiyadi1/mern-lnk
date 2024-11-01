import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersDto } from 'src/core/dto/users.dto';
import { Users } from 'src/core/models/users.models';
import { UsersService } from './users.service';
import {
  ApiOkResponse,
  ApiParam,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import * as bcrypt from 'bcrypt';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() user): Promise<any> {
    const pass = await bcrypt.hash(user.password, 10);
    const payload = {
      ...user,
      password: pass,
      verified_at: null,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      deleted_at: null,
    };
    // create the user
    const newUser = await this.usersService.create(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];

    // return the user and the token
    return { user: result };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: UsersDto })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    return { users: user };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UsersDto>,
  ): Promise<Partial<Users>> {
    const user = new Users();
    Object.assign(user, updateUserDto);
    return this.usersService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Users> {
    return this.usersService.remove(id);
  }
}
