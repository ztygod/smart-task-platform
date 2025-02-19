import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';

// 初始化 DataSource
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test_db',
  entities: [User],
  synchronize: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await dataSource.initialize();  // 确保 DataSource 初始化
  await app.listen(3000);
}

export default dataSource;
bootstrap();
