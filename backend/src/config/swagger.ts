import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Assignment API",
      version: "1.0.0",
    },
  },
  apis: [],
};

const specs = swaggerJsdoc(options);

export {
  swaggerUi,
  specs,
};