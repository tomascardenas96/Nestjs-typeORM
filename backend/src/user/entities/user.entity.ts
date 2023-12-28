import { Tuit } from 'src/tuit/entities/tuit.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 5, unique: true })
  id: string;

  @Column({ unique: true, nullable: false })
  userName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ default: false })
  isLoggedIn: boolean;

  @OneToMany(() => Tuit, (tuit) => tuit.user, { cascade: true })
  tuits: Tuit[];
}
