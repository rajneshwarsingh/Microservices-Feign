module.exports = (sequelize: any, DataTypes: any) => {
  const products = sequelize.define(
    'products',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        allowNull: true,
        type: DataTypes.CHAR(36),
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: true,
        type: DataTypes.STRING(10),
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deletedBy: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );
  products.associate = function (models: any) {
    /* Relations */
  };
  return products;
};
