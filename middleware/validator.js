const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("name", "Name is required").notEmpty(),
  check("email", "Valid email is required").isEmail(),
  check("password", "Password must be 6+ characters").isLength({ min: 6 }),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array() });
  next();
};
