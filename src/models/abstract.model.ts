import { Model, Column, DataType } from 'sequelize-typescript';

export abstract class AbstractModel<T = any, K = any> extends Model<T, K> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
}
