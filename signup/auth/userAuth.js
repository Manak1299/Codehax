let express = require('express');
let jwt  = require('jsonwebtoken');
//require('dotenv').config()


function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  //console.log(bearerHeader);
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    user=jwt.verify(req.token,process.env.jwt_publickey);
    req.userid=user.Userid;
    //console.log(req.userid);

    next();
  } else {
    res.sendStatus(403);
  }

}

module.exports=verifyToken;