import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 使用的数据库类型（例如 'mysql', 'postgres' 等）
      host: 'localhost',
      port: 3306, // Mysql 默认端口，其他数据库端口不同
      username: 'root', // 数据库用户名
      password: 'zty', // 数据库密码
      database: 'smart_task', // 数据库名称
      entities: [User, Task], // 你的实体类（可以根据需要配置）
      synchronize: true,
    }),
    TaskModule// 开发模式下可以启用自动同步数据库结构
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
