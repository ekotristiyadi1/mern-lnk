import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Auth extends Model<Auth> {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;
}
