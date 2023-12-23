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
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error('Error searching users', error);
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('Id non-existent');
      }
      return user;
    } catch (error) {
      console.error('Error finding user by id', error);
      throw error;
    }
  }

  private getDate(): string {
    const currDate = new Date();
    const day = currDate.getDate();
    const month = currDate.getMonth() + 1;
    const year = currDate.getFullYear();
    return `${year}-${month}-${day}`;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: { userName: createUserDto.userName },
    });

    if (userFound) {
      throw new BadRequestException('User name is already in use');
    }

    const { userName, password } = createUserDto;
    const newUser = {
      id: uuid().substring(0, 5),
      userName: userName,
      password: password,
      createdAt: this.getDate(),
      isLoggedIn: false,
    };
    const user = this.userRepository.create(newUser);
    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const foundUser = await this.findOne(id);
      if (!foundUser) {
        throw new Error();
      }
      return this.userRepository.update({ id }, updateUserDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const foundUser = await this.userRepository.findOne({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException('Id non-existent');
    }
    return this.userRepository.delete({ id });
  }
}
