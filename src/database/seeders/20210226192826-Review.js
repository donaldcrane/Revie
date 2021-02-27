module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Reviews", [
      {
      id: "c375c640-81ff-405a-89a8-460ea2f71755",
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      name: "3 bedroom bungaow",
      image: "http://facebook.com",
      lanlordReview: "He is a good man",
      enviromentReview: "Very peacful place",
      apartmentLocation: "24 ajah bustop",
      amenitiesQuality: "Very good",
      isHelpful: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a430e505-937b-4908-9422-7aa57044e85a",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      name: "Duplex",
      image: "http://facebook.com",
      lanlordReview: "He is a nice man, and a friendly person",
      enviromentReview: "Very quiet place",
      apartmentLocation: "124 festac bustop",
      amenitiesQuality: "Very good",
      isHelpful: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      id: "7cc6de97-2ed6-4422-9ce2-9ff22cc5e97a",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      name: "1 bedroom flat",
      image: "http://facebook.com",
      lanlordReview: "He is a quiet man",
      enviromentReview: "Very nice place",
      apartmentLocation: "2 obalande bustop",
      amenitiesQuality: "Good",
      isHelpful: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      id: "6cbaa746-6e42-453e-91f4-c0de15fb4b9f",
      userId: "57af7c29-efb2-434e-9fce-b87c77447aaa",
      name: "Single room",
      image: "http://facebook.com",
      lanlordReview: "He is a bad man, and he stinks",
      enviromentReview: "Very bad enviroment, full with criminals",
      apartmentLocation: "24 mushin bustop",
      amenitiesQuality: "Bad",
      isHelpful: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ,], 
    {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
