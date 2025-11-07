module.exports = (sequelize: any, DataTypes: any) => {
  const authentications = sequelize.define(
    'authentications',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        allowNull: true,
        type: DataTypes.STRING(36),
      },
      authToken: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      expiresIn: {
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
  // authentications.associate = function (models: any) {
  //   /* Relations */
  // };
  return authentications;
};
