/**
 * 深拷貝 ES5
 * @param origin 原始物件 
 * @param target 目標
 */
function deepClone(origin, target){
  /**
   * tar: 沒傳入target給空物件
   * toString: 調用Object.prototype上的toString方法
   * arrayType: 調用toString方法判定是否為Array的回傳結果
   */
  var tar = target || {},
      toString = Object.prototype.toString,
      arrayType = '[object Array]';

  for(var key in origin){
    // 篩選掉原型上的屬性
    if(origin.hasOwnProperty(key)){
      // origin的屬性值為object且不為null
      if(typeof(origin[key]) === 'object' && origin[key] !== null){
        // origin[key]為陣列
        if(toString.call(origin[key]) === arrayType){
          tar[key] = [];
        // origin[key]為物件
        }else{
           tar[key] = {}; 
        }
        // 遞迴深拷貝
        deepClone(origin[key], tar[key]);
      }else{
        tar[key] = origin[key];
      }
    }
  }

  return tar;
}