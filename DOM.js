// 找出元素子元素
function elemChildren(node){
  var temp = {
        'length': 0,
        'splice': Array.prototype.splice
      },
      len = temp.length;
  
  for(var i = 0; i < len; i++){
    var childItem = node.childNodes[i];
    if(childItem.nodeType === 1){
      temp[temp['length']] = childItem;
      temp['length']++;
    }
  }    
  
  return temp;
}

// 查看滾動條距離
function getScrollOffset(){
  if(window.pageXOffset){
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  }else{
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop 
    }
  }
}