import chai from "chai";
import chaiHttp from "chai-http";
import db from "../../models/index";
import { user4 } from "./user-sign-in-test-data";
import {
  review, review2, review3, review4, review5
} from "./review-data";
import server from "../../app";

chai.should();

const { expect } = chai;
chai.use(chaiHttp);

describe("Add review", () => {
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow user with token add a review", done => {
    chai
      .request(server)
      .post("/api/v1/auth/review")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(review)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it("should not allow user add a review with incomplete details", done => {
    chai
      .request(server)
      .post("/api/v1/auth/review")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(review2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should not allow user without token add a review ", done => {
    chai
      .request(server)
      .post("/api/v1/auth/review")
      .send(review3)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe("Update review", () => {
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow User update a review", done => {
    chai
      .request(server)
      .patch("/api/v1/auth/review/c375c640-81ff-405a-89a8-460ea2f71755")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send({ name: "Mansion" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully updated Review.");
        done();
      });
  });
  it("should not allow user update a review with invalid ID data type", done => {
    chai
      .request(server)
      .patch("/api/v1/auth/review/8d58")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send({ name: "Duplex" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when updating review which is not in db", done => {
    chai
      .request(server)
      .patch("/api/v1/auth/review/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send({ lanlordReview: "He is a kind person" })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Review not found.");
        done();
      });
  });
});

describe("Delete review", () => {
  beforeEach(async () => {
    await db.Reviews.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Reviews.create(review4);
  });
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow User Delete a review", done => {
    chai
      .request(server)
      .delete("/api/v1/auth/review/c375c640-81ff-405a-89a8-460ea2f71755")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully Deleted Review.");
        done();
      });
  });
  it("should not allow user delete a review with invalid ID data type", done => {
    chai
      .request(server)
      .delete("/api/v1/auth/review/8d58")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when deleting review which is not in db", done => {
    chai
      .request(server)
      .delete("/api/v1/auth/review/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Review not found.");
        done();
      });
  });
});

describe("GET review api route", () => {
  beforeEach(async () => {
    await db.Reviews.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Reviews.create(review4);
    await db.Reviews.create(review5);
  });
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("returns all reviews", done => {
    chai
      .request(server)
      .get("/api/v1/auth/reviews")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived all Reviews.");

        data.forEach(reviews => {
          expect(reviews).to.have.property("id");
          expect(reviews).to.have.property("name");
          expect(reviews).to.have.property("userId");
          expect(reviews).to.have.property("image");
          expect(reviews).to.have.property("lanlordReview");
          expect(reviews).to.have.property("enviromentReview");
          expect(reviews).to.have.property("apartmentLocation");
          expect(reviews).to.have.property("amenitiesQuality");
          expect(reviews).to.have.property("isHelpful");
        });

        expect(data).to.have.length(2);

        expect(data).to.be.an("array");
        done();
      });
  });

  it("returns review with specific id", done => {
    chai
      .request(server)
      .get("/api/v1/auth/review/c375c640-81ff-405a-89a8-460ea2f71755")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived Review.");
        expect(data).to.have.property("id");
        expect(data).to.have.property("name");
        expect(data).to.have.property("userId");
        expect(data).to.have.property("image");
        expect(data).to.have.property("lanlordReview");
        expect(data).to.have.property("enviromentReview");
        expect(data).to.have.property("apartmentLocation");
        expect(data).to.have.property("amenitiesQuality");
        expect(data).to.have.property("isHelpful");

        expect(data).to.be.an("object");
        done();
      });
  });
});
