import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/entity/user.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  title: string;

  @Column({ type: 'text', array: true })
  images: string[];

  @Column({ type: 'text', array: true })
  videos: string[];

  @Column()
  content: string;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  @JoinColumn({ name: 'post_id' })
  comments: string[];

  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
