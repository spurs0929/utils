// 深度凍結物件(自身可列舉屬性)
function _freeze(obj){
	Object.freeze(obj);
	// 獲取自身屬性(可列舉)
	for(var key in obj){
		var prop = obj[key];
		if(typeof prop === 'object' && prop !== null){
			_freeze(prop);
		}
	}
}

// 深度凍結物件(自身可列舉/不可列舉屬性)
function $freeze(obj){
	Object.freeze(obj);
	
  // 獲取 自身可列舉屬性 / 自身不可列舉屬性 / 自身鍵名為Symbol
	const propArr = Object.getOwnPropertyNames(obj);

	propArr.forEach(name => {
		const propItem = obj[name];
		
    if(typeof propItem === 'object' && propItem !== null){
			$freeze(propItem);
		}
    
	}); 
}

// 深度凍結物件
function $$freeze(obj){
  
  Object.freeze(obj);  

  // 獲取 自身可列舉屬性 / 自身不可列舉屬性 / 自身鍵名為Symbol
  const propArr = Reflect.ownKeys(obj);
  
  for(const name of propArr){
    const propItem = obj[name];

    if(typeof propItem === 'object' && propItem !== null){
      $$freeze(propItem);
    }
  }
}