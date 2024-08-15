const { Types } = require('mongoose');

const isValid = (id) => Types.ObjectId.isValid(id);

const validateIds = (req, res, next) => {
  const { categoryId, subCategoryId } = req.body; // or req.params, depending on input source

  const idsToValidate = [categoryId, subCategoryId].filter(id => id); // Filter out undefined or null values
  const allValid = idsToValidate.every(isValid);
  if (!allValid) {
    return res.status(400).json({ msg: 'Invalid ObjectId(s) provided' });
  }

  next();
};
module.exports = validateIds