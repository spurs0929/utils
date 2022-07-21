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
// 查看具有父級定位元素到可視窗口的距離 
function getElemDocPosition(el){
  var parent = el.offsetParent,
      offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop;
   
  while(parent){
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }    

  return {
    left: offsetLeft,
    top: offsetTop
  }
}

// 取消冒泡事件並兼容IE
function cancelBubble(e){
  var e = e || window.event;
  if(e.stopPropagation){
    e.stopPropagation();
  }else{
    e.cancelBubble = true;
  }
}