const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = models => {
  User.hasOne(models.Profiles, {
      as: "profiles",
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
    User.hasMany(models.Reviews, {
      as: "reviews",
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return User;
};

