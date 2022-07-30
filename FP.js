// 函數組合
function compose(){
  var args = Array.prototype.slice.call(arguments), // 將arguments轉換成陣列
      len = args.length; // args長度

  return function(x){
    // 執行傳入參數最右側的函數
    var res = args[len](x);

    // 從右到左依次執行函數
    while(len--){
      res = args[len](res);
    }

    return res;
  }    
}

// 函數組合(reduceRight實現)
function compose1(){
  var args = Array.prototype.slice.call(arguments); // 將arguments轉換成陣列

  return function(x){
    return args.reduceRight(function(res, cb){
      return cb(res);
    }, x);
  }
}

// 封裝偏函數
Function.prototype.partial = function(){
  var _self = this, // 保存this
      _args = [].slice.call(arguments); // 將arguments轉換成陣列

  return function(){
    var newArgs = _args.concat([].slice.call(arguments)); // concat arguments
    return _self.apply(this, newArgs);
  }    
}

// 封裝柯理化函數
function curry(fn, len){
  // fn參數個數
  var len = len || fn.length;
  // 返回函數
  var func = function(fn){
    var _args = [].slice.call(arguments, 1);
 
    return function(){
      var newArgs = _args.concat([].slice.call(arguments));
      return fn.apply(this, newArgs);
    }
  }

  return function(){
    var argLen = arguments.length;
    // arguments未傳完
    if(argLen < len){
      // 組裝參數
      var formatedArr = [fn].concat([].slice.call(arguments));
      // 遞迴柯理化函數
      return curry(func.apply(this, formatedArr), len - argLen); 
    }else{
      return fn.apply(this, arguments);
    }
  }
}