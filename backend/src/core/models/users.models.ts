import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  IsEmail,
  Unique,
  IsUUID,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class Users extends Model<Users> {
  @IsUUID('all')
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Unique
  @Column
  username: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column(DataType.TEXT)
  password: string;

  @Column({
    type: DataType.DATE,
  })
  verified_at: Date;

  @CreatedAt
  @Column({ field: 'created_at', allowNull: false })
  created_at: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', allowNull: true })
  updated_at: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', allowNull: true })
  deleted_at: Date;
}
