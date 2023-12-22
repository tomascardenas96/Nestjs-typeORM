import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { uuid } from 'uuidv4';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        throw new Error();
      }
      return user;
    } catch (err) {
      throw new NotFoundException('Id non-existent');
    }
  }

  getDate(): string {
    const currDate = new Date();
    const day = currDate.getDate();
    const month = currDate.getMonth() + 1;
    const year = currDate.getFullYear();
    return `${year}-${month}-${day}`;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { userName, password } = createUserDto;
      const newUser = {
        id: uuid().substring(0, 5),
        userName: userName,
        password: password,
        createdAt: this.getDate(),
        isLoggedIn: false,
      };
      const user = this.userRepository.create(newUser);
      if (!user) {
        throw new Error();
      }
      return await this.userRepository.save(user);
    } catch (err) {
      throw new BadRequestException('Error trying to create a new user');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { userName, password, createdAt, isLoggedIn } = updateUserDto;
      const foundUser = await this.findOne(id);
      if (!foundUser) {
        throw new Error();
      }
      const user: Promise<User> = this.userRepository.save({
        id: id,
        userName: userName ? userName : foundUser.userName,
        password: password ? password : foundUser.password,
        createdAt: createdAt ? createdAt : foundUser.createdAt,
        isLoggedIn: isLoggedIn ? isLoggedIn : foundUser.isLoggedIn,
      });
      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
