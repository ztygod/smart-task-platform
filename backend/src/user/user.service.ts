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
import { SECRET } from 'src/config';
import * as argon2 from 'argon2';
const jwt = require('jsonwebtoken');

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
    const hashedPassword = await argon2.hash(password);
    userInstance.username = username;
    userInstance.password = hashedPassword;

    const error = await validate(userInstance);
    if (error.length > 0) {
      const errorMessageFromat = { username: 'Userinput is not valid.' };
      throw new HttpException({ message: 'Input data validation failed', errorMessageFromat }, HttpStatus.BAD_REQUEST);
    } else {
      const saveUser = await this.userRepository.save(userInstance);
      return this.buildUserRO(saveUser);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne({ username, password }: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username }
    });

    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOne({
      where: { id }
    });

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user)
  }

  async findByName(name: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({
      where: { name }
    });

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  };

  public generateJWT(user: User) {
    let date = new Date();
    let outDate = new Date(date);
    outDate.setDate(date.getDate() + 60) //设置过期时间，60天后

    return jwt.sign({
      id: user.id,
      username: user.username,
      exp: outDate.getTime() / 1000
    }, SECRET)
  }
  //构建并返回一个格式化后的用户响应对象（userRO）
  private buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      username: user.username,
      token: this.generateJWT(user),
    }
    return { user: userRO }
  };
}
