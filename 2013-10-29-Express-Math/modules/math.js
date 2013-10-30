
exports.square = function(num){
  var sq = Math.pow(num,2);
  return sq;
};


exports.area = function(length, width){
  return length * width;
};

exports.volume = function(l,w,h){
  return this.area(l,w) * h;
};

