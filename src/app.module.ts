import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'user',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
