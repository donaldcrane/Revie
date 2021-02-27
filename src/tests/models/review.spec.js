import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from "sequelize-test-helpers";
import chai, { expect } from "chai";

import sinonChai from "sinon-chai";
import ReviewModel from "../../models/review";

chai.use(sinonChai);

describe("src/models/review", () => {
  const Review = ReviewModel(sequelize, dataTypes);
  const review = new Review();

  checkModelName(Review)("Reviews");
  context("properties", () => {
    ["userId", "name", "image", "lanlordReview", "enviromentReview", "apartmentLocation", "amenitiesQuality", "isHelpful"].forEach(
      checkPropertyExists(review),
    );
  });
});
