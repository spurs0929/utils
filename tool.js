// 封裝typeof方法
function myTypeof(val){
  var type = typeof(val);
  var toStr = Object.prototype.toString;
  // 調用Object原型上的toString方法
  var TOSTRTYPE = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'object number',
    '[object String]': 'object string',
    '[object Boolean]': 'object boolean'
  }
  // 排除typeof null -> 'object'
  if(val === null){
    return 'null';
  }else if (type === 'object'){
    var res = toStr.call(val); 
    return TOSTRTYPE[res];
  }else{
    return type;
  }
}