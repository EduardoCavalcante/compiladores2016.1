var BNFRoles = BNFRoles || {};



BNFRoles.ID = function(val){

	return /^\s*([a-z]+|[A-Z]+)\s*$/.test(val)
}

BNFRoles.num = function(val){
	return /^\s*([0-9]+)\s*$/.test(val);
}

BNFRoles.SpecialSymbols = function(search){
	
	if(search){
	    return /\+|\-|\*|\/|<|<=|>|>=|==|!=|=|;|,|\(|\)|\[|\]|\{|\}|\/\*|\*\//;
	}else{
		return /(^\s*\+\s*$)|(^\s*\-\s*$)|(^\s*\*\s*$)|(^\s*\/\s*$)|(^\s*<\s*$)|(^\s*<=\s*$)|(^\s*>\s*$)|(^\s*>=\s*$)|(^\s*==\s*$)|(^\s*!=\s*$)|(^\s*=\s*$)|(^\s*;\s*$)|(^\s*\,\s*$)|(^\s*\(\s*$)|(^\s*\)\s*$)|(^\s*\[\s*$)|(^\s*\]\s*$)|(^\s*\{\s*$)|(^\s*\}\s*$)|(^\s\/\*\s*$)|(^\s*\*\/\s*$)/;
	}

};


BNFRoles.typeSpecifier = function(search){

		if(search){
		return  /int|string/;
	}else{
		return  /(^\s*int\s*$)|(^\s*string\s*$)/;
	}

}


BNFRoles.param = function(val){
	
	if(val.match(BNFRoles.typeSpecifier(true)) && val.match(BNFRoles.typeSpecifier(true)).index == 0){
		var _parts = [];
		_parts[0] = val.substring(0,val.match(BNFRoles.typeSpecifier(true))[0].length);
		_parts[1] = val.substring(val.match(BNFRoles.typeSpecifier(true))[0].length);

		if(BNFRoles.ID(_parts[1])){			
			return true;			
		}

		if(val.match(/\s*\[\s*\]\s*$/) && val.match(/\s*\[\s*\]\s*$/).index > 0){
			var _subparts = [];
			_subparts[0] = _parts[1].substring(0,_parts[1].match(/\s*\[\s*\]\s*$/).index);
			_subparts[1] = _parts[1].substring(_parts[1].match(/\s*\[\s*\]\s*$/).index);

			return BNFRoles.ID(_subparts[0]) && /\s*\[\s*\]\s*$/.test(_subparts[1]);
		}

	}

	return false;
};

BNFRoles.addop = function(search){

	if(search){
		return  /\+|\-/;
	}else{
		return  /(^\s*\+\s*$)|(^\s*\-\s*$)/;
	}

	//return /^\s*([a-z,A-Z]+|[0-9])\s*(\+|\-)\s*([a-z,A-Z]+|[0-9])\s*;\s*$/.test(val);
}

BNFRoles.mulop = function(search){
	//var rgex = /^\s*([a-z,A-Z]+|[0-9])\s*(\*|\/)\s*([a-z,A-Z]+|[0-9])\s*;\s*$/.test(val);

	if(search){
		return  /\*|\//;
	}else{
		return  /(^\s*\*\s*$)|(^\s*\/\s*$)/;
	}

};

BNFRoles.relop = function(search){

	if(search){
		return  /^>=|<=|<|>|==|!=/;
	}else{
		return  /^ (^\s*<=\s*$)|(^\s*<\s*$)|(^\s*>\s*$)|(^\s*>=\s*$)|(^\s*==\s*$)|(^\s*!=\s*$)/;
	}

}

BNFRoles.Keywords = function(){
	var rgex = /^(else|if|int|return|void|while)$/
}

BNFRoles.argList = function(val){
	
	if(BNFRoles.expression(val)){
		return true;
	}

	var containsComma = /\,/.test(val) && val.match(/\,/).index > 0

	if(containsComma){
			var _parts = [];
			_parts[0] = val.substring(0,val.match(/\,/).index);
			_parts[1] = val.substring(val.match(/\,/).index, val.match(/\,/).index + 1);
			_parts[2] = val.substring(val.match(/\,/).index + 1);

			var isArgsList = BNFRoles.argList(_parts[0]);
			var isComma = _subparts[1].match(BNFRoles.SpecialSymbols(true)) && _parts[1].match(BNFRoles.SpecialSymbols(true)).index > -1  && _parts[1] == ",";
			var isExpression = BNFRoles.ex
			pression(_parts[2]);

			return  isArgsList && isComma && isExpression;
	}

	return false;

};

BNFRoles.args = function(val){
	
	var simpleExpresion = /^\s*$/;

	if(simpleExpresion.test(val)){
		return true;
	}

	if(BNFRoles.argList(val)){
		return true;
	}

	return false;

};

BNFRoles.CALL = function(val){
	
	var containsStartExpression = /^[a-z,A-Z]+\s*\(/.test(val);
	var containsFinishExpression = /\s*\)$/.test(val);

	if(containsStartExpression && containsFinishExpression){
		var _parts =[];
		_parts[0] = val.substring(0,val.match(/\(/).index);
		_parts[1] = val.substring(val.match(/\(/).index, val.match(/\(/).index + 1);
		_parts[2] = val.substring(val.match(/\(/).index + 1,val.match(/\)/).index);
		_parts[3] = val.substring(val.match(/\)/).index);

		var isVar = BNFRoles.var(_parts[0]);
		var isStartExpression = _parts[1].match(BNFRoles.SpecialSymbols(true)) && _parts[1].match(BNFRoles.SpecialSymbols(true)).index > -1  && _parts[1] == "(";
		var isArgs =  BNFRoles.args(_parts[2])
		var isFinishExpression = _parts[3].match(BNFRoles.SpecialSymbols(true)) && _parts[3].match(BNFRoles.SpecialSymbols(true)).index > -1  &&  _parts[3] == ")";
		
		return isVar && isStartExpression && isArgs && isFinishExpression;
		
	}else{
		return false;
	}
};

BNFRoles.factor = function(val){
	
	var isIniExpression = /^\s*\(/.test(val);
	var isFinishExpression = /\s*\)$/.test(val);

	if( isIniExpression && isFinishExpression){

		var _parts = [];
		_parts[0] = val.substring(0,val.indexOf("(") + 1);
		_parts[1] = val.substring(val.indexOf("(") + 1,val.indexOf(")"));
		_parts[2] = val.substring(val.indexOf(")"));

		if(BNFRoles.expression(_parts[1])){
			return true;
		}

	}

	if(BNFRoles.var(val)){
		return true;
	}

	if(BNFRoles.CALL(val)){
		return true;
	}

	if(BNFRoles.num(val)){
		return true;
	}

	return false;

};


BNFRoles.term = function(val){
	
	if(BNFRoles.factor(val)){
		return true;
	}

	if(val.match(BNFRoles.mulop(true)) && val.match(BNFRoles.mulop(true)).index > 1 ){

		var _parts = [];
		_parts[0] = val.substring(0,val.match(BNFRoles.mulop(true)).index);
		_parts[1] = val.substring(val.match(BNFRoles.mulop(true)).index, val.match(BNFRoles.mulop(true)).index + 1);
		_parts[2] = val.substring(val.match(BNFRoles.mulop(true)).index + 1);


		return BNFRoles.term(_parts[0]) 
			&& BNFRoles.mulop().test(_parts[1]) 
			&& BNFRoles.factor(_parts[2]);

	}

	return false;
};

BNFRoles.additiveExpression = function(val){

	if(BNFRoles.term(val)){
		return true;
	}

	if(val.match(BNFRoles.addop(true)) && val.match(BNFRoles.addop(true)).index > 1){
		var _parts =[];
		_parts[0] = val.substring(0,val.match(BNFRoles.addop(true)).index);
		_parts[1] = val.substring(val.match(BNFRoles.addop(true)).index, val.match(BNFRoles.addop(true)).index + 1);
		_parts[2] = val.substring(val.match(BNFRoles.addop(true)).index + 1);
		
		return BNFRoles.additiveExpression(_parts[0])
		 && BNFRoles.addop().test(_parts[1])
		 && BNFRoles.term(_parts[2]);

	}
	return false;
};

BNFRoles.simpleExpression = function(val){
	
	if(BNFRoles.additiveExpression(val)){
		return true;
	}

	if( val.match(BNFRoles.relop(true)) && val.match(BNFRoles.relop(true)).index > 1){
		var _parts = [];
		_parts[0] = val.substring(0,val.match(BNFRoles.relop(true)).index);
		_parts[1] = val.substring(val.match(BNFRoles.relop(true)).index,val.match(BNFRoles.relop(true)).index + 2);
		if(!BNFRoles.relop().test(_parts[1])){
			_parts[1] = val.substring(val.match(BNFRoles.relop(true)).index,val.match(BNFRoles.relop(true)).index + 1);
		}
		_parts[2] = val.substring(val.indexOf(_parts[1]) + _parts[1].length);

		return BNFRoles.additiveExpression(_parts[0]) && 
		BNFRoles.relop().test(_parts[1]) && 
		BNFRoles.additiveExpression(_parts[2]);

	};
	
	return false;

};

BNFRoles.expression = function(val){

		if(val.indexOf("=") > -1){
			var _parts = [];
			_parts[0] = val.substring(0,val.indexOf("="));
			_parts[1] = val.substring(val.indexOf("="),val.indexOf("=") + 1);
			_parts[2] = val.substring(val.indexOf("=") + 1);

			if(BNFRoles.var(_parts[0]) && _parts[1].match(BNFRoles.SpecialSymbols(true)) && _parts[1].match(BNFRoles.SpecialSymbols(true)).index > -1  && _parts[1] == "="){
				return BNFRoles.expression(_parts[2]);
			}else{
				alert("erro");
			}
		}else{
			return BNFRoles.simpleExpression(val);
		}


};


// combinações de símbolos que tem o ; como finalizador!

//14. expression-stmt -> expression ; | ; 

BNFRoles.expressionStmt = function(val){
	
	if(/^\s*;\s*$/.test(val)){
		return true;
	}

	if(/\s*;\s*$/.test(val)){
		var _parts = [];
		_parts[0] = val.substring(0,val.match(/\s*;\s*$/).index);
		_parts[1] = val.substring(val.match(/\s*;\s*$/).index);

		return BNFRoles.expression(_parts[0]);
	}

	return false;
};

BNFRoles.var = function(val){
	
	if(BNFRoles.ID(val)){
		return true;
	}

	return /^([a-z]+|[A-Z]+)\[([a-z,[A-Z]*|[0-9])\];$/.test(val) 
};

BNFRoles.varDeclaration = function(val){
	
		var singleRegEx   =   /^(int|string)\s*[a-z]\s*(\,\s*[a-z])*;$/
		var complexRegEx2 =   /^(int|string)\s*[a-z]\s*\[[0-9]+\]\s*;$/
		
		if(singleRegEx.test(val) || complexRegEx2.test(val)){
			return true;
		}
	return false;

};

BNFRoles.returnStmt = function(val){

	if(/^\s*return{1}\s*;{1}\s*$/.test(val)){
		return true
	}

	if(/^\s*return{1}\s*/.test(val) && /\s*;{1}\s*$/.test(val)){

		var _parts = [];
		_parts[0] = val.substring(0, val.match(/^\s*return{1}\s*/).index + val.match(/^\s*return{1}\s*/)[0].length );
		_parts[1] = val.substring(val.match(/^\s*return{1}\s*/).index  + val.match(/^\s*return{1}\s*/)[0].length, val.match(/\s*;{1}\s*$/).index);
		_parts[2] = val.substring(val.match(/\s*;{1}\s*$/).index);

		return BNFRoles.expression(_parts[1]);

	}

	return false;

};


/*


BNFRoles.funDeclaration = function(token,val){
	
	if(val.length == 6){
		if(BNFRoles.typeSpecifier(val[0].nome)){
			if(BNFRoles.ID(val[1].nome)){
				if(BNFRoles.SpecialSymbols(val[2].nome) && val[2].nome == "("){
					if(BNFRoles.params(val[3].nome)){
						if(BNFRoles.SpecialSymbols(val[4].nome) && val[4].nome == ")"){
							if(BNFRoles.compoundStmt(val[5].nome)){
								return true;
							}
						}
					}
				}
			}
		}
	}

	return false;
};

BNFRoles.compoundStmt = function(token,val){

	if(val.length == 4){
		if(BNFRoles.SpecialSymbols(val[0].nome) && val[0].nome  == "{"){
			if(BNFRoles.localDeclarations(val[1].nome)){
				if(BNFRoles.statementList(val[2].nome)){
					return true;
				}
			}
		}	
	}
	return false;
};

BNFRoles.localDeclarations = function(token,val){
	
	if(val.length == 0){
		return true;
	}

	if(val.length == 2){
		if(BNFRoles.localDeclarations(val[0].nome)){
			if(BNFRoles.varDeclarations(val[1].nome)){
				return true;
			}
		}
	}

	return false;
};
BNFRoles.statementList = function(token,val){
	if(val.length == 0){
		return true;
	}
	if(val.length == 2){
		if(BNFRoles.statementList(val[0].nome)){
			if(BNFRoles.statement(val[1].nome)){
				return true;
			}
		}
	}
};

BNFRoles.params = function(token,val){

	if(token.type == id){

		var rgex = /^void$/;

	}

};






BNFRoles.paramList = function(token,val){
	
	if(val.length == 1){
		if(BNFRoles.param(val[0].nome)){
			return true;
		}
	}
	
	if(val.length == 3){
		if(BNFRoles.paramList(val[0].nome)){
			if(BNFRoles.SpecialSymbols(val[1].nome) && val[1].nome == ","){
				if(BNFRoles.param(val[2].nome)){
					return true;
				}
			}
		}
	}

	return false
};

BNFRoles.params = function(token,val){
	if(BNFRoles.paramList(val[0])){
		return true;
	}
	if(BNFRoles.Keywords(val[0].nome) && val[0].nome == "void"){
		return true;
	}
	return false;
};

 */
