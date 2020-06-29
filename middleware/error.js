
const catchErrors = (err, req, res, next)=>{
    res.status = err.statusCode || 500;
   
    if(err.name === 'CastError')
        err.message = 'Invalid Parameter';
    else if(err.name === 'ValidationError')
        err.message = 'Validation Error';
    else if(err.name === 'MongoError')
        err.message = 'Database Error';
    //
    if(err.code === 11000)
        err.message = `${Object.values(err.keyValue)} must be unique`;
    else if(err.code === 66)
        err.message = 'Immutable Field';

    res.json({
        status: "error",
        statusCode: err.statusCode || 500,
        message: err.message
    });
};

module.exports = catchErrors;