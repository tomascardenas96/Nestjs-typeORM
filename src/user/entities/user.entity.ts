import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 5, unique: true })
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ default: false })
  isLoggedIn: boolean;
}