import { Table, Column, DataType } from 'sequelize-typescript';
import { AbstractModel } from './abstract.model';
import { Provider, UserRole } from 'src/commons/enum';

@Table({ tableName: 'users', timestamps: true })
export class User extends AbstractModel {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({ type: DataType.STRING })
  avatar: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  role: UserRole;

  @Column({ type: DataType.INTEGER, allowNull: false })
  provider: Provider;
}
