let commonFunction = require('../routes/commonFunction');
var commonFunctionObj = new commonFunction();
class CommonMiddleware{
    constructor(){

    }
    async IfNotLoggedIn(req, res, next){
        var token = req.session.userToken;
        // decode token
        if (token) {
            Jwt.verifyToken(token)
                .then(async function (jwtDecres) { //VALID TOKEN
                    //VALID USER CHECK
                    if ((req.session.userEmail != jwtDecres.email) || (req.session.userId != jwtDecres.id)) {
                        req.session.token = null;
                        req.session.isAuth = false;
                        res.redirect('/login');
                    } else { 
                        next();
                    }
                }).catch(function (err) {
                    console.log(err);
                    req.session.token = null;
                    req.session.isAuth = false;
                    res.redirect('/login');
                });
        } else {
            req.session.token = null;
            req.session.isAuth = false;
            res.redirect('/login');
        }
    }
    async checkUserLoggedIn(req, res, next){
        if(req.session.isAuth && req.session.userId){
            // return res.redirect('/dashboard');
            next()
        }
        //next()
      
    }
    async logout(req, res, next){
        return
    }
}
module.exports = CommonMiddleware;