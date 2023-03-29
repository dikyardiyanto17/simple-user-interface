const errorHandler = (err, req, res, next) => {
  console.log(err, "<<<<<<<<<");
  if (err.name == "Bad Request") {
    res.status(400).json({ message: err.message });
  } else if (err.name == "Invalid"){
    res.status(201).json({message: err.message})
  }
};

module.exports = errorHandler;
