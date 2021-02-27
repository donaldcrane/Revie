import Admin from "../services/review";
import { validation, validateId } from "../validations/reviewValidation";

const {
  addReview, addCount, getAllReviews, getReview, deleteReview, updateReview
} = Admin;

/**
 * @class AdminReviewController
 * @description create Review, get all Reviews, get a Review, delete a Review, update a Review
 * @exports AdminController
 */
export default class AdminReviewController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async addReview(req, res) {
    try {
      const { id } = req.decoded.user;
      const {
        name, image, lanlordReview, enviromentReview, apartmentLocation, amenitiesQuality
      } = req.body;
      const { error } = validation(req.body);
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const reviewName = name[0].toUpperCase() + name.slice(1).toLowerCase();
      const newReview = {
        name: reviewName, userId: id, image, lanlordReview, enviromentReview, apartmentLocation, amenitiesQuality
      };
      const createdReview = await addReview(newReview);
      return res.status(201).json({ status: 201, message: "A Review has been added.", data: createdReview, });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getReviews(req, res) {
    try {
      const reviews = await getAllReviews();
      res.status(200).json({
        status: 200,
        message: "Successfully retrived all Reviews.",
        data: reviews,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getReviewById(req, res) {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const review = await getReview(id);
      if (!review) return res.status(404).json({ status: 404, error: "Review not found" });
      return res.status(200).json({
        status: 200,
        message: "Successfully retrived Review.",
        data: review,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found."
      });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async deleteReview(req, res) {
    const { id } = req.params;
    try {
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const review = await getReview(id);
      if (!review) return res.status(404).json({ status: 404, error: "Review not found." });
      await deleteReview(id);
      return res.status(200).json({
        status: 200,
        message: "Successfully Deleted Review.",
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found.",
      });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async addHelpfulReview(req, res) {
    const { id } = req.params;
    try {
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const review = await getReview(id);
      if (!review) return res.status(404).json({ status: 404, error: "Review not found." });
      const helpfulReview = await addCount(id);
      return res.status(200).json({
        status: 200,
        message: "Successfully added count to Review.",
        data: helpfulReview
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Server error.",
      });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updateReview(req, res) {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const {
        name, image, lanlordReview, enviromentReview, apartmentLocation, amenitiesQuality
      } = req.body;
      const Review = await Admin.getReview(id);
      if (!Review) return res.status(404).json({ status: 404, error: "Review not found." });
      let newname;
      if (name) {
        newname = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        req.body.name = newname;
      }
      const newReview = await updateReview(id, req.body);
      return res.status(200).json({
        status: 200,
        message: "Successfully updated Review.",
        data: newReview[1],
      });
    } catch (error) {
      return res.status(404).json({ status: 404, error: "Resource not found.", });
    }
  }
}
