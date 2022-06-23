import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column()
  title: string;

  @Column({ type: 'text', array: true })
  images: string[];

  @Column({ type: 'text', array: true })
  videos: string[];

  @Column()
  content: string;

  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
