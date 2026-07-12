// Centralized error handling
const errorHandling = (err, res) => {
    console.log(err.stack);
    res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Something went wrong",
        error: err.message,
    });

};

export default errorHandling;