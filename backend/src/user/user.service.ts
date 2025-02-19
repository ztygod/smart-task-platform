import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRO } from './user.interface';
import dataSource from 'src/main';
import { User } from './entities/user.entity';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }
  async create(createUserDto: CreateUserDto): Promise<UserRO> {
    //检查唯一性
    const { username, password } = createUserDto;
    // 使用 DataSource 获取 Repository 并执行查询
    const userRepository = dataSource.getRepository(User);
    const qb = await userRepository.
      createQueryBuilder('user')
      .where('user.username = :username', { username })

    const user = await qb.getOne();

    if (user) {
      const errorMessage = { username: '用户名重复' }
      throw new HttpException({ message: 'Input data validation failed', errorMessage }, HttpStatus.BAD_REQUEST);
    }

    //创建用户
    let userInstance = new User();
    userInstance.username = username;
    userInstance.password = password;

    const error = await validate(userInstance);
    if (error.length > 0) {
      const errorMessageFromat = { username: 'Userinput is not valid.' };
      throw new HttpException({ message: 'Input data validation failed', errorMessageFromat }, HttpStatus.BAD_REQUEST);
    } else {
      const saveUser = await this.userRepository.save(userInstance);
      return
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  };

  public generateJWT(user) {

  }

  private buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      username: user.username,
      token:
    }
  };
}
