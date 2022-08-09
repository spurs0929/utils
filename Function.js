// 重寫Function.prototype.bind()
Function.prototype.$bind = finction(context){
  var _self = this,
      args = [].slice.call(arguments, 1),
      tempFn = function(){};

  var fn = function(){
    var newArgs = [].slice.call(arguments);
    _self.apply(this instanceof _self ? this : context, args.concat(newArgs));
  }    

  // 聖杯模式
  tempFn.prototype = this.prototype;
  fn.prototype = new tempFn();

  return fn;
}

// 陣列扁平化
function flatten(arr){
  var _arr = arr || [],
      result = [],
      len = _arr.length,
      item;

  for(var i = 0; i < len; i++){
    item = _arr[i];

    if(_isArray(item)){
      // item為Array
      result = result.concat(flatten(item));
    }else{
      // item不為Array
      result.push(item);
    }
  }    

  return result;

  // 判斷arr是否為元素
  function _isArray(arr){
    return {}.toString.call(arr) === '[object Array]';
  }

}