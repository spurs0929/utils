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

// 封裝instanceof方法
function _instanceof(target, type){
  type = type.prototype;
  target = target.__proto__;

  while(true){
    // target === null 代表找到原型鏈的頂
    if(target === null){
      return false;
    }

    // target === type 代表找到
    if(target === type){
      return true;
    }

    // 根據原型鏈往上找
    target = target.__proto__;
  }
}