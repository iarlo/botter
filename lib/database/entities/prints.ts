import { Model, DataTypes, Optional } from 'sequelize';

import sequelize from '../index';

interface PrintAttributes {
  id: number;
  author: string;
  description: string | null;
  link: string;
  approvedBy: string;
}

interface PrintCreationAttributes extends Optional<PrintAttributes, 'id'> {}

class Print
  extends Model<PrintAttributes, PrintCreationAttributes>
  implements PrintAttributes {
  public id!: number;

  public author!: string;

  public description!: string | null;

  public link!: string;

  public approvedBy!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Print.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: new DataTypes.STRING(18),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    link: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    approvedBy: {
      type: new DataTypes.STRING(18),
      allowNull: false,
    },
  },
  {
    tableName: 'botter_prints',
    sequelize,
  },
);

export default Print;
