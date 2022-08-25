// 封裝ajax
var $ = (function(){
  // 兼容性
  var o = window.XMLHttpRequest ?
          new XMLHttpRequest : 
          new ActiveXObject('Microsoft.XMLHTTP');
  if(!o){
    throw new Error('目前使用的瀏覽器不支持HTTP請求');
  }

  _doAjax = function(opt){
    var opt = opt || {},
        type = (opt.type || 'GET').toUpperCase,
        async = opt.async || true,
        url = opt.url,
        data = opt.data || null,
        error = opt.error || function(){},
        success = opt.success || function(){},
        complete = opt.complete || function(){};

    if(!url){
      throw new Error('請輸入url');
    }    

    o.open(type, url, async);
    // 如果為POST請求要設置Content-type
    type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    o.send(type === 'GET' ? null : formatData(data));
    o.onreadystatechange = function(){
      if(o.readyState === 4){
        if((o.status >= 200 && o.status < 300) || o.status === 304){
          switch(dataType.toUpperCase()){
            case 'JSON':
              success(JSON.parse(o.responseText)); 
              break;
            case 'TEXT':
              success(o.responseText);
              break;
            case 'XML':
              success(o.responseXML);
              break;
            default:
              success(JSON.parse(o.responseText)); 
          } 
        }else{
          error();
        }
        complete();
        clearTimeout(t);
        t = null;
        o = null;
      }
    }
  }
  // 轉換資料格式
  function formatData(obj){
    var str = '';
    // 遍歷opt參數將鍵值對變成key=value&key1=value1&...
    for(var key in obj){
      str += key + '=' + obj[key] + '&'
    }
    // 將最後一個&符號去除
    return str.replace(/&$/, '');
  }

  return {
    ajax: function(opt){
      _doAjax(opt);
    },
    post: function(url, data, callback){
      _doAjax({
        type: 'POST',
        url: url,      
        data: data,
        success: callback  
      });
    },
    get: function(url, callback){
      _doAjax({
        type: 'GET',
        url: url,
        success: callback
      });
    }
  }         
})();