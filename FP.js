// 函數組合
function compose(){
  // args: 將arguments變成array
  var args = Array.prototype.slice.call(arguments),
      len = args.length;

  return function(x){
    var res = args[len](x);

    while(len--){
      res = args[len](res);
    }

    return res;
  }    
}

// 函數組合(reduceRight實現)
function compose1(){
  var args = Array.prototype.slice.call(arguments);

  return function(x){
    return args.reduceRight(function(res, cb){
      return cb(res);
    }, x);
  }
}