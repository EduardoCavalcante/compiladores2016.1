var analisadorLexico = {} || analisadorLexico;

analisadorLexico.caracteres = [];
analisadorLexico.tokens = [];

analisadorLexico.searchSymbol = function(caracter){

	if(typeSpecifier[caracter]){
		return typeSpecifier[caracter];
	}else{
		return false;
	}

}
analisadorLexico.addToken = function(token,value){
	
	if(!analisadorLexico.tokens[token]){
		analisadorLexico.tokens[token] = value;
		analisadorLexico.tokens[token].ocorrencias = 1;
	}else{
		analisadorLexico.tokens[token].ocorrencias ++;
	}

}
analisadorLexico.findTokens = function(){

	var candidate = "";
	var isVariable = false;

	analisadorLexico.caracteres.forEach(function(caracter){

		if(analisadorLexico.searchSymbol(caracter) || caracter == " "){
			if(caracter != " "){
				var value = analisadorLexico.searchSymbol(caracter);
				analisadorLexico.addToken(caracter,value);
				if(value.type == "typeSpecifier"){
					isVariable = true;
				}
			}
			if(candidate.length > 0){
				var value = isNaN(candidate) ? candidate : {nome : candidate ,type : "numeric",description : "numero"}
				if(isVariable){
					value = {name : candidate, type : 'variable', description : 'variavel'}	
					isVariable = false;
				}
				analisadorLexico.addToken(candidate,value);
			}	
			if(typeof candidate == "string"){
				candidate = "";
			}
		}else{
		candidate = candidate + caracter;
			if(analisadorLexico.searchSymbol(candidate)){
				var value = analisadorLexico.searchSymbol(candidate);
				if(value.type == "typeSpecifier"){
					isVariable = true;
				}
				analisadorLexico.addToken(candidate,value);
				candidate = "";
			}
		}
	});

}

analisadorLexico.findCaracteres = function(content){

	content.forEach(function(caracter){

		if(typeof caracter == "string"){
			analisadorLexico.caracteres.push(caracter);
		}
	});
	analisadorLexico.findTokens();
}

analisadorLexico.parser = function () {
	var parts = [];
	var line = 0;
	file.lines.forEach(function(currentLine){
		parts = parts.concat(currentLine.split(""));
		//line  = line + 1;
	});
	analisadorLexico.findCaracteres(parts);	
};

analisadorLexico.initialize = function () {
	console.log("initialize function");
	analisadorLexico.parser();	
};