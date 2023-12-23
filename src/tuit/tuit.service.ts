import { Injectable, NotFoundException } from '@nestjs/common';
import { TuitDTO } from './dto/create-tuit.dto';
import { UpdateTuit } from './dto/update-tuit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tuit } from './entities/tuit.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TuitService {
  constructor(
    @InjectRepository(Tuit)
    private readonly tuitRepository: Repository<Tuit>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userID: string, tuit: TuitDTO) {
    const user = await this.userRepository.findOne({ where: { id: userID } });
    if (!user) {
      throw new NotFoundException(`User with ID not found`);
    }
    
    const twit = {
      message: tuit.message,
      user: user,
    };

    const newTwit = this.tuitRepository.create(twit);
    return this.tuitRepository.save(newTwit);

  }

  findAll() {
    return this.tuitRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tuit`;
  }

  update(id: number, tuit: UpdateTuit) {
    return `This action updates a #${id} tuit`;
  }

  remove(id: number) {
    return `This action removes a #${id} tuit`;
  }
}
