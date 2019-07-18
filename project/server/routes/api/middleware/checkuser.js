const jwt = require('jsonwebtoken')
const checkuser = function(req, res, next) {
    //Authorization验证
    var sessionId = req.headers.authorization;
    try {
        // var decoded = jwt.decode(sessionId, 'yihang888');
        // console.log(decoded);
        jwt.verify(sessionId, 'yihang888', (err, decoded) => {
          if (!err) {
            req.info = decoded
            next()
          } else {
            res.status(401).json({
              name: 'Unauthorized',
              message: '用户未登录',
              code: 1
            })
          }
        });
        
      } catch (e) {
        res.status(401).json({
          name: 'Unauthorized',
          message: '用户未登录',
          code: 1
        })
    }
    next();
}

module.exports = checkuser;