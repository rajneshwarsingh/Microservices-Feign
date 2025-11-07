module.exports = (sequelize: any, DataTypes: any) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      age: {
        allowNull: true,
        type: DataTypes.STRING(3),
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING,
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
  // users.associate = function (models: any) {
  //   /* Relations */
  // };
  return users;
};
