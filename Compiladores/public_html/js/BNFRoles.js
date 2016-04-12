var BNFRoles = BNFRoles || {};


BNFRoles.ID = function(val){

	return /^([a-z]+|[A-Z]+)$/.test(val)
}

BNFRoles.num = function(token,val){
	var rgex = /^([0-9]+)$/
}

BNFRoles.SpecialSymbols = function(val){
	return /^(\+|\-|\*|\/|<|<=|>|>=|==|!=|=|;|,|\(|\)|\[|\]|\{|\}|\/\*|\*\/)$/.test(val);
};

BNFRoles.mulop = function(){
	var rgex = /^(\*|\/)$/
};

BNFRoles.relop = function(){
	var rgex = /<=|<|>|>=|==|!=/
}

BNFRoles.addop = function(){
	var rgex = /(\+|\-)/
}

BNFRoles.Keywords = function(){
	var rgex = /^(else|if|int|return|void|while)$/
}

BNFRoles.var = function(val){
	
	//var -> ID | ID [ expression ]

	if(val.length == 1){
		return BNFRoles.ID(val[0].nome);
	} else if(val.length == 4){
		if(BNFRoles.ID(val[0].nome)){
			if(BNFRoles.SpecialSymbols(val[1].nome) && val[1].nome == "["){

				if(BNFRoles.SpecialSymbols(val[3].nome) && val[3].nome == "]"){
					return true;
				}
			}
		}
	}
	return false;
};

BNFRoles.adtiveExpression = function(val){

	if(val.length == 1){
		if(BNFRoles.term(val[0].nome)){
			return true;
		}
	}

	if(val.length == 3){
		if(BNFRoles.adtiveExpression(val[0].nome)){
			if(BNFRoles.addop(val[1].nome)){
				if(BNFRoles.term(val[2].nome)){
					return true;
				}
			}
		}
	}
	return false
};

BNFRoles.term = function(val){
	
	if(val.length == 1){
		if(BNFRoles.factor(val[0].nome)){
			return true;
		}
	}

	if(val.length == 3){
		if(BNFRoles.term(val[0].nome)){
			if(BNFRoles.mulop(val[1]).nome){
				if(BNFRoles.factor(val[2].nome)){
					return true;
				}
			}
		}
	}

	return false;
};

BNFRoles.factor = function(val){
	//( expression ) | var | CALL | NUM

	if(val.length == 3){
		if(BNFRoles.SpecialSymbols(val[0].nome) && val[0].nome == "("){
			if(BNFRoles.expression(val[1].nome)){
				if(BNFRoles.SpecialSymbols(val[2].nome) && val[2].nome == ")"){
					return true;
				}
			}
		}
	}

	if(val.length == 1){
		
		if(BNFRoles.var(val[0].nome)){
			return true;
		}

		if(BNFRoles.num[val[0].nome]){
			return true;
		}

		if(BNFRoles.CALL(val[0].nome)){
			return true;
		}
	}

	return false;

};

BNFRoles.CALL = function(val){
	if(val.length == 4){
		if(BNFRoles.ID(val[0].nome)){
			if(BNFRoles.SpecialSymbols(val[1].nome) && val[1].nome == "("){
				if(BNFRoles.args(val[2].nome)){
					if(BNFRoles.SpecialSymbols(val[3].nome) && val[3].nome == ")"){
						return true;
					}
				}
			}
		}
	}
	return false;
};

BNFRoles.args = function(val){

};

BNFRoles.expression = function(val){

	if(val.length == 3){
		if(BNFRoles.var(val[0])){
			if(BNFRoles.SpecialSymbols(val[1].nome) && val[1].nome == "="){
				if(BNFRoles.expression(val[2].nome)){
					return true;	
				}
			}	
		}
	}

	if(val.length = 1){
		if(BNFRoles.simpleExpression(val[0].nome)){
			return true;
		}
	}

	return false;

};

BNFRoles.simpleExpression = function(val){

	if(val.length == 1){
		if(BNFRoles.adtiveExpression(val[0].nome)){
			return true;			
		}
	}
	
	if(val.length == 3){
		if(BNFRoles.adtiveExpression(val[0].nome) && BNFRoles.adtiveExpression(val[2].nome)){
			if(BNFRoles.relop(val[1].nome)){
				return true;
			}			
		}
	}

	return false;

};

BNFRoles.varDeclaration = function(token,val){
	
	if(token.type == id){
		var singleRegEx   =   /^(int|string)\s*[a-z]\s*;$/
		var complexRegEx2 =   /^(int|string)\s*[a-z]\s*\[[0-9]+\]\s*;$/
		
		if(singleRegEx.test(val) || complexRegEx2.test(val)){
			return true;
		}

	}

	return false;

};

BNFRoles.funcDeclaration = function(token,val){
	
	if(token.type == id){
		var firstTest   = /^(int|string)\s*\(\s/
		var secondTest  = "";
		var thirdTest   = /\s*\)\s*\{/

	}

};

BNFRoles.params = function(token,val){

	if(token.type == id){

		var rgex = /^void$/;

	}

};

BNFRoles.returnStmt = function(val){

	if(BNFRoles.Keywords.test(val[0].nome) && val[0].nome == "return"){
		if(val.length == 2){
			if(BNFRoles.SpecialSymbols(val[1].nome) && val[1].nome == ";"){
				return true
			}
		}
		if(val.length == 3){
			if(BNFRoles.expression(val[1].nome)){
				if(BNFRoles.SpecialSymbols(val[2].nome) && val[2].nome == ";"){
				return true
				}
			}
		}
	}

	return false;

};

BNFRoles.typeSpecifier = function(token,val){

		var rgex = /(int|string)/
}


BNFRoles.paramList = function(token,val){

};

BNFRoles.param = function(token,val){

	if(BNFRoles.typeSpecifier(val[0].nome)){
		if(BNFRoles.ID(val[1].nome)){
			if(val.length == 2){
				return true;
			}
			if(BNFRoles.SpecialSymbols(val[2].nome) && val[2].nome == "["){
				if(BNFRoles.SpecialSymbols(val[3].nome) && val[3].nome == "]"){
					return true;
				}
			}
		}
	}
	
	return false;
	
};
