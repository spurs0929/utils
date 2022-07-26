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

// 阻止默認事件兼容性
function preventDefaultEvent(){
  var e = e || window.event;
  if(e.preventDefault){
    e.preventDefault();
  }else{
    e.returnValue = false;
  }
}

// 註冊/綁定 事件處理函數及兼容版本
function addEvent(el, type, fn){
  if(el.addEventListener){
    el.addEventListener(type, fn. false);
  }else if(el.attachEvent){
    el.attachEvent('on' + type, function(){
      fn.call(el);
    });
  }else{
    el['on' + type] = fn;
  }
}

// 取消註冊事件 / 移除事件處理函數兼容
function removeEvent(el, type, fn){
  if(el.addEventListener){
    el.removeEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.detachEvent('on' + type, function(){
      fn.call(el);
    });
  }else{
    el['on' + type] = null;
  }
}

// 瀏覽器可視區域的尺寸(窗口的寬高)怪異模式和標準模式並兼容IE9及IE8
function getViewportSize(){
  if(window.innerWidth){ // 正常
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }else{
    if(document.compatMode === 'BackCompat'){ //怪異模式
      return {
        width: document.body.clientWidth, 
        height: document.body.clientHeight
      }
    }else{
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}

// 查看元素属性(寬高)兼容IE9及IE8
function getStyles(el, prop){
  if(window.getComputedStyle){
    if(prop){
      return window.getComputedStyle(el, null)[prop];
    }
    return window.getComputedStyle(el, null); 
  }else{
    if(prop){
      return el.styleCurrent.prop;
    }
    return el.styleCurrent;
  }
}

// 監測html文檔大小
function getScrollSize(){
  if(document.body.scrollWidth){
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  }else{
    return {
      width: document.documentElement.scrollWidth,
      heigh: document.documentElement.scrollHeight
    }
  }
}

/**
 * 尋找元素父節點的方法
 * @param node 元素節點
 * @param n n層父節點
 */
function elemParent(node, n){
  // 取得 n 的類型
  var type = typeof(n);

  if(type === 'undefined'){
    return node.parentNode;
  }else if(n < 0 || type !== 'number'){
    return undefined;
  }

  while(n){
    node = node.parentNode;
    n--;
  }

  return node;
} 

// 滑鼠位置座標pageX/Y
function pagePos(e){
  var sLeft = getScrollOffset().left,
      sTop = getScrollOffset().top(),
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.clientTop || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }    
}

// 封裝getElementsByClassName
Document.prototype.getElementsByClassName = 
Element.prototype.getElementsByClassName = 
document.getElementsByClassName || function(className){
  var allDoms = this.getElementsByTagName('*'), // 所有標籤
      allDomsLen = allDoms.length,  // 所有標籤長度
      allDomsItem, 
      finalDoms = []; // 結果陣列
  
  for(var i = 0; i < allDomsLen; i++){
    allDomsItem = allDoms[i];
    
    var classArr = trimSpace(allDomsItem.className).trim().split(' '), // 所有標籤className
        classArrLen = classArr.length, // 所有標籤className長度
        classArrItem;

    for(var j = 0; j < classArrLen; j++){
      classArrItem = classArr[j];
      if(classArrItem === className){
        finalDoms.push(classArrItem);
      }
    }    
  }
  // 將多個空格變成1個空格
  function trimSpace(str){
    return str.replace(/\s+/g, ' ');
  }

  return finalDoms;
}

/**
 * 封裝insertAfter方法
 * @param {插入的節點} target 
 * @param {目標節點} afterNode 
 */
Element.prototype.insertAfter = function(target, afterNode){
  // 目標節點的後一個節點
  var nextElement = afterNode.nextElementSibling;

  // nextElement存在
  if(nextElement){
    // 插入節點到nextElement前
    this.insertBefore(target, nextElement)
  }else{
    // 插入節點到父節點的最後一項
    this.appendChild(target);
  }
}

// 封裝拖曳函數
function elDrag(el){
  var x,
      y;

  addEvent(el, 'mousedown', function(e){
    var e = e || window.event;
    x = pagePos(e).X - getStyles(el, 'left');
    y = pagePos(e).Y - getStyles(el, 'top');

    addEvent(document, 'mousemove', mouseMove);
    addEvent(document, 'mouseup', mouseUp);
    cancelBubble(e);
    preventDefaultEvent(e);
  });

  function mouseMove(e){
    var e = e || window.event;
    el.style.top = pagePos(e).Y - y + 'px';
    el.style.left = pagePos(e).X - x + 'px';
  }

  function mouseUp(e){
    var e = e || window.event;
    removeEvent(document, 'mousemove', mouseMove);
    removeEvent(document, 'mouseup', mouseUp);
  }
}