import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../role/entity/role.entity';
import { OrganizationEntity } from '../organization/organization.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  phone?: string;

  @Column({ name: 'fin_code' })
  finCode?: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => OrganizationEntity, (o) => o.users)
  @JoinColumn({ name: 'organization_id' })
  organization?: OrganizationEntity;

  @ManyToMany(() => RoleEntity, { eager: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles?: RoleEntity[];

  @Column({ name: 'password_last_updated_at' })
  passwordLastUpdatedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
