// middleware/errorHandler.js
const jsonParseErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: "Invalid JSON" });
    }
    next();
};

module.exports = {
    jsonParseErrorHandler,
};
