var analisadorLexico = {} || analisadorLexico;

analisadorLexico.searchSymbol = function(caracter){

	if(typeSpecifier[caracter]){
		return typeSpecifier[caracter];
	}else{
		return false;
	}
}

analisadorLexico.findComentary = function(){
	
	analisadorLexico.tokens.forEach(function(contentLine){
	var line = analisadorLexico.tokens.indexOf(contentLine);  	
	  	for(var i = 0; i < contentLine.length;i++){
			    if((i-1 >= 0) && ((contentLine[i-1].nome == "/" && contentLine[i].nome == "*") || (contentLine[i-1].nome == "*" && contentLine[i].nome == "/"))){
			      var caracter = contentLine[i-1].nome + contentLine[i].nome;
			      var value = analisadorLexico.searchSymbol(caracter); 
			      if(value){
			      	value.ocorrencias = 0;
			      	value.contentLine = contentLine[i].line;
			      	analisadorLexico.tokens[line].splice(i -1 , 2,value);	
			      }
			    }    
		  }		  
	});

}

analisadorLexico.addToken = function(token,value,line){
		
		if(!value.ocorrencias){
			value.ocorrencias = 1;	
		}else{
			value.ocorrencias  = value.ocorrencias + 1;
		}
		
		if(value != null && typeof value == 'object'){
			value.line = [];
			value.line.push(line);	
			if(!analisadorLexico.tokens[line]){
				analisadorLexico.tokens[line] = [];
			}
			analisadorLexico.tokens[line].push(value);
		}
}

analisadorLexico.findNextSimbol = function(character){
	var find = [];	
	
	analisadorLexico.tokens.forEach(function(currentLine){
	  	
	  	find = currentLine.filter(function(token){
	  		return token.nome == character;
	  	});	  			  
	});

	 return find.length > 0;
}

analisadorLexico.findErrors = function(){
	
	analisadorLexico.tokens.forEach(function(currentLine){
	  	
	  	find = currentLine.forEach(function(token){
	  		
	  		if(token && token.nextSimbol != null && typeof token.nextSimbol != "undefined"){
				var exist = analisadorLexico.findNextSimbol(token.nextSimbol);
				if(!exist){
					console.log("Erro o codigo contem o simbolo : " + token.nome + ", porem nao contem o simbolo : " + token.nextSimbol );
				}
			}

			if(token && token.ocorrenciasMin != null && typeof token.ocorrenciasMin != "undefined"){
				if(token.ocorrencias < token.ocorrenciasMin ){
					console.log("Erro o codigo contem o simbolo : " + token.nome + " apenas : " + token.ocorrencias + " vez");
				}
			}

	  	});	  			  
	});
	
};
analisadorLexico.findTokens = function(caracteresDaLinha,line){
	var candidate = "";
	var isVariable = false;

	caracteresDaLinha.forEach(function(caracter){
		if(analisadorLexico.searchSymbol(caracter) || caracter == " "){
			
			if(candidate.length > 0){
				var value = isNaN(candidate) ? candidate : {nome : candidate ,type : "numeric",description : "numero"}
				if(isVariable){
					value = {name : candidate, type : 'variable', description : 'variavel'}	
					isVariable = false;
				}
				analisadorLexico.addToken(candidate,value,line);
			}	
			
			if(caracter != " "){
				var value = analisadorLexico.searchSymbol(caracter);
				analisadorLexico.addToken(caracter,value,line);
				if(value.type == "typeSpecifier"){
					isVariable = true;
				}
			}
				candidate = "";
		}else{
		candidate = candidate + caracter;
			if(analisadorLexico.searchSymbol(candidate)){
				var value = analisadorLexico.searchSymbol(candidate);
				if(value.type == "typeSpecifier"){
					isVariable = true;
				}
				analisadorLexico.addToken(candidate,value,line);
				candidate = "";
			}
		}
	});
}

analisadorLexico.findCaracteres = function(content,line){
	var caracteresDaLinha = [];
	content.forEach(function(caracter){

		if(typeof caracter == "string"){
			caracteresDaLinha.push(caracter);
			analisadorLexico.caracteres.push(caracter);
		}
		
	});
	analisadorLexico.findTokens(caracteresDaLinha,line);
}

analisadorLexico.parser = function () {
	var parts = [];
	var line = 0;
	file.lines.forEach(function(currentLine){
		analisadorLexico.findCaracteres(currentLine.split(""),line);	
		line  = line + 1;		
	});
	analisadorLexico.findComentary();
	analisadorLexico.findErrors();
	
};

analisadorLexico.initialize = function () {
	analisadorLexico.caracteres = [];
	analisadorLexico.tokens = [];
	analisadorLexico.parser();	
};