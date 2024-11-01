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
  tableName: 'sendemail',
})
export class SendEmail extends Model<SendEmail> {
  @IsUUID('all')
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  email: string;

  @Column(DataType.TEXT)
  description: string;

  @CreatedAt
  @Column({ field: 'created_at', allowNull: false })
  created_at: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', allowNull: true })
  updated_at: Date;
}
