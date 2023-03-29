const errorHandler = (err, req, res, next) => {
    console.log(err, "<<<<<<<<<")
    if (err.name == "Bad Request"){
        res.status(400).json({statusCode: 400, message: err.message})
    }
    else if (err.name == "Tugas tidak ada") res.status(404).json({statusCode: 404, message: err.message})
    else if (err.name == "CastError") res.status(404).json({statusCode: 404, message: "Tugas yang dicari tidak ada atau id tidak valid"})
    else res.status(500).json({statusCode: 500, message: "Internal Server Error"})
}

module.exports = errorHandler