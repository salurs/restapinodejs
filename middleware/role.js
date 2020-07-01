
const roles = (req, res, next)=>{
    if(!req.user.isAdmin)
        return res.status(403).json({
            status: 'error',
            statusCode: 403,
            data:null,
            message:"Permission denied"
        });
    next();
};

module.exports = roles;