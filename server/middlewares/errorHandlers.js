const errorHandler = (err, req, res, next) => {
  console.log(err, "<<<<<<<<<");
  if (err.name == "Bad Request") {
    res.status(400).json({ message: err.message });
  } else if (err.name == "Invalid") {
    res.status(401).json({ message: err.message });
  } else if (err.name == "JsonWebTokenError") {
    res.status(400).json({ message: "Invalid Token" });
  } else if (err.name == "User Not Found") {
    res.status(404).json({ message: err.message });
  } else if (err.name == "CastError") {
    res.status(404).json({ message: "User is not valid" });
  } else if (err.name == "Registered") {
    res.status(401).json({ message: err.message });
  } else if (err.name == "Authorization") {
    res.status(403).json({ message: err.message });
  } else {
    res.status(500).json({message: "Internal Server Error"})
  }
};

module.exports = errorHandler;
