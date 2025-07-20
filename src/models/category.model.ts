import { Column, DataType, Table } from 'sequelize-typescript';
import { AbstractModel } from './abstract.model';

@Table({ tableName: 'categories', timestamps: true })
export class Category extends AbstractModel {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  sortOrder: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;
}
