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