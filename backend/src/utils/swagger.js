import swaggerJSDoc from 'swagger-jsdoc';

export function buildSwaggerSpec() {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Weather Data Aggregation API',
        version: '1.0.0',
        description:
          'Aggregates historical weather data and returns average temperature for the past X days.'
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Local'
        }
      ]
    },
    apis: ['./src/routes/*.js'] // "yaml" swagger instructions in JSDoc comments
  };

  return swaggerJSDoc(options);
}
