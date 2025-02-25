// backend/swagger.js: Configuração do Swagger para a documentação da API.
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "Documentação da API para o MVP do E-commerce",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./routes.js", "./controllers/*.js"], // Caminhos para os arquivos com anotações Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
