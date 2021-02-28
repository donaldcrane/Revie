const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Reviews",{  
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lanlordReview: {
      type: DataTypes.STRING,
      allowNull: false
    },
    enviromentReview: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apartmentLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amenitiesQuality: {
      type: DataTypes.ENUM("Good", "Bad", "Very good"),
      defaultValue: "Good",
    },
    isHelpful: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  });
  Review.associate = models => {
  Review.belongsTo(models.Users, {
      as: "reviews",
      foreignKey: "userId",
    });
  };
  return Review;
};
