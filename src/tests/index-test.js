import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app";

chai.should();

chai.use(chaiHttp);

describe("/ Welcome to Green Lamp world", () => {
  it("it should get the welcome page", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

export default describe;
