

const logger = function(req,res,next){
  console.log(new Date(), req.method, req.url);
  next();
};

module.exports = { logger };
