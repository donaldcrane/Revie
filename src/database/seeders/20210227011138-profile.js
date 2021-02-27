module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Profiles", [
    {
      id: "0a973445-7f4e-412d-a880-96a7f708cc62",
      firstName: "Davido",
      lastName: "Adeleke",
      profilePicture: "http:/facebook.com",
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "330547ae-d310-4b4b-a70e-a11eb9dde8f9",
      firstName: "Taiwo",
      lastName: "Friday",
      profilePicture: "http:/facebook.com",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "c375c640-81ff-405a-89a8-460ea2f71756",
      firstName: "ishola",
      lastName: "wizkid",
      profilePicture: "http:/facebook.com",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a430e505-937b-4908-9422-7aa57044e85c",
      firstName: "Bolaji",
      lastName: "emma",
      profilePicture: "http:/facebook.com",
      userId: "57af7c29-efb2-434e-9fce-b87c77447aaa",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
