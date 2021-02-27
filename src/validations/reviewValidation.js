import Joi from "joi";

const validation = review => {
  const schema = Joi.object({
    name: Joi.string().empty().required()
      .messages({
        "any.required": "Sorry, Apartment name is required.",
        "string.empty": "Apartment name cannot be an empty field.",
      }),
    image: Joi.string().empty().required()
      .messages({
        "any.required": "Image is required.",
        "string.base": "Please provide a valid link",
        "string.empty": "Sorry, image Picture cannot be an empty field"
      }),
    lanlordReview: Joi.string().empty().required()
      .messages({
        "any.required": "lanlord Review is required.",
        "string.empty": "Sorry, lanlord Review cannot be an empty field"
      }),
    enviromentReview: Joi.string().empty().required()
      .messages({
        "any.required": "Enviroment Review is required.",
        "string.empty": "Sorry, enviroment Review cannot be an empty field"
      }),
    apartmentLocation: Joi.string().empty().required()
      .messages({
        "any.required": "Apartment Location is required.",
        "string.empty": "Sorry, apartment Location cannot be an empty field"
      }),
    amenitiesQuality: Joi.string().empty().required()
      .messages({
        "any.required": "Quality is required.",
        "string.empty": "Sorry, Amenities quality cannot be an empty field"
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(review);
};
const validateId = ids => {
  const schema = Joi.object({
    id: Joi.string().required()
      .empty().guid({ version: "uuidv4" })
      .messages({
        "any.required": "ID not provided. Please provide an ID.",
        "string.empty": "ID cannot be an empty field.",
        "string.base": "ID must be a string.",
        "string.guid": "ID must be a UUID"
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(ids);
};

export { validation, validateId };
