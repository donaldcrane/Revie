import sequelize from "sequelize";
import database from "../models";

/**
 * @class Admin
 * @description allows admin user create and check Review details
 * @exports Admin
 */
export default class Admin {
  /**
   * @param {string} newReview - The state details
   * @returns {object} An instance of the Reviews model class
   */
  static async addReview(newReview) {
    try {
      return await database.Reviews.create(newReview);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Reviews model class
   */
  static async getAllReviews() {
    try {
      return await database.Reviews.findAll({
        order: [
          ["isHelpful", "DESC"]
        ],
        attributes: [
          "id", "userId", "name", "image", "lanlordReview",
          "enviromentReview", "apartmentLocation", "amenitiesQuality",
          "isHelpful", "createdAt", "updatedAt"
        ]
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The Review id
   * @returns {object} An instance of the Reviews model class
   */
  static async getReview(id) {
    try {
      return await database.Reviews.findOne({
        where: {
          id
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The Review name
   * @returns {object} An instance of the Reviews model class
   */
  static async deleteReview(id) {
    try {
      const Review = await database.Reviews.findOne({ where: { id } });
      return await Review.destroy({ cascade: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The old state name
   * @param {string} Review - The new state details
   * @returns {object} An instance of the Reviews model class
   */
  static async updateReview(id, Review) {
    try {
      return await database.Reviews.update(Review, {
        where: { id },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The old state name
   * @returns {object} An instance of the Reviews model class
   */
  static async addCount(id) {
    try {
      return await database.Reviews.increment({
        isHelpful: +1
      }, {
        where: {
          id
        },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  }
}
