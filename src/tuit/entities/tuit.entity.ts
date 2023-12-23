import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tuit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 255 })
  message: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => User, (user) => user.tuits)
  user: User;
}
