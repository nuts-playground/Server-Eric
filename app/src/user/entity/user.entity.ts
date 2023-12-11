import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'USER' })
export class UserEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  nickname: string;

  @Column()
  provider_id: string;

  @CreateDateColumn()
  create_dtm: Date;

  @UpdateDateColumn()
  update_dtm: Date | null;

  @DeleteDateColumn()
  delete_dtm: Date | null;
}
