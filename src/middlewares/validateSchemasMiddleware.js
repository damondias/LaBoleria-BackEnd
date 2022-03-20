export default function validaSchemaMiddleware(schema) {
    return (req, res, next) => {
      const validation = schema.validate(req.body);
      if (validation.error) {
        const errorDetails = validation.error.details[0];
        if (errorDetails.path[0] === 'image') {
          res.status(422).send(errorDetails.message);
        } else {
          res.status(400).send(errorDetails.message);
        }
        return;
      }  
      next();
    }
  }