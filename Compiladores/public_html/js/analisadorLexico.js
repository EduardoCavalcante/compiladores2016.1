var analisadorLexico = {} || analisadorLexico;

// cria as linhas a tabela de caracteres

analisadorLexico.printLines = function(){

	var table = document.getElementById("tabelaDeSimbolos");

	var tbody = table.getElementsByTagName("tbody")[0];

	while(tbody.firstElementChild){
		tbody.removeChild(tbody.firstElementChild)
	}

	analisadorLexico.tokens.forEach(function(currentLine){
		var line = analisadorLexico.tokens.indexOf(currentLine);  
	  	currentLine.forEach(function(token){

	  		if(line == analisadorLexico.tabelaDeSimbolos[token.nome].line[0]){

		  		var tr = document.createElement("TR");
		  		
		  		var tdSimbolo = document.createElement("td");
		  		tdSimbolo.innerHTML = token.nome;

		  		var tdType = document.createElement("td");
		  		tdType.innerHTML = token.type;

		  		var tdDescricao = document.createElement("td");
		  		tdDescricao.innerHTML = token.description;

		  		var tdLinha = document.createElement("td");

		  		 tdLinha.innerHTML = analisadorLexico.tabelaDeSimbolos[token.nome] && 
		  		 analisadorLexico.tabelaDeSimbolos[token.nome].line ? analisadorLexico.tabelaDeSimbolos[token.nome].line.join() : "";
		  		
		  		var tdOcorrencias = document.createElement("td");
		  		tdOcorrencias.innerHTML = analisadorLexico.tabelaDeSimbolos[token.nome] && 
		  		analisadorLexico.tabelaDeSimbolos[token.nome].ocorrencias;

		  		tr.appendChild(tdSimbolo);
		  		tr.appendChild(tdType);
		  		tr.appendChild(tdDescricao);
		  		tr.appendChild(tdOcorrencias);
		  		tr.appendChild(tdLinha);
		  		tbody.appendChild(tr);
	  		}

	  	});	  			  
	});

}
analisadorLexico.cleanNotifications = function(){
	var notificacoes = document.getElementById("notificacoes");
	while(notificacoes.firstElementChild){
		notificacoes.removeChild(notificacoes.firstElementChild);
	}
};
analisadorLexico.addNotifications = function(message){
	
	var notificacoes = document.getElementById("notificacoes");

	var content = document.createElement("p");
	content.innerHTML = message;

	notificacoes.appendChild(content);

}

/* 
1- busca se o caracter passado como parâmetro está presente  na tabela de simbolos.
2- se o caracter estiver na tabela de simbolos é retornado o valor do mesmo na tabela de simbolos, em caso negativo
é retornado o valor FALSE
*/
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
				if((i-1 >= 0) && ((contentLine[i-1].nome == "/" && contentLine[i].nome == "*") 
				|| (contentLine[i-1].nome == "*" && contentLine[i].nome == "/") 
				|| (contentLine[i-1].nome == "<" && contentLine[i].nome == "=") || 
				(contentLine[i-1].nome == ">" && contentLine[i].nome == "=")|| 
				(contentLine[i-1].nome == "=" && contentLine[i].nome == "="))){
				    var caracter = contentLine[i-1].nome + contentLine[i].nome;
				    var token = analisadorLexico.searchSymbol(caracter); 
				    if(token){
				      	token.contentLine = contentLine[i].line;
				      	var firstToken = analisadorLexico.tabelaDeSimbolos[contentLine[i].nome].line.indexOf(line);
				      	var secondToken = analisadorLexico.tabelaDeSimbolos[contentLine[i - 1].nome].line.indexOf(line);

				      	if(firstToken > -1){
				      		analisadorLexico.tabelaDeSimbolos[contentLine[i].nome].line.splice(firstToken,1);
				      	}
				      	if(secondToken > -1){
				      		analisadorLexico.tabelaDeSimbolos[contentLine[i - 1].nome].line.splice(secondToken,1);
				      	}
				      	
				      	analisadorLexico.tabelaDeSimbolos[contentLine[i].nome].ocorrencias = analisadorLexico.tabelaDeSimbolos[contentLine[i].nome].ocorrencias - 1; 
				      	analisadorLexico.tabelaDeSimbolos[contentLine[i -1].nome].ocorrencias = analisadorLexico.tabelaDeSimbolos[contentLine[i].nome].ocorrencias - 1; 

				      	analisadorLexico.tokens[line].splice(i -1 , 2);
				      	analisadorLexico.addToken(token,line);
				      	i = i -1;
				      }
				}    
			}		  
	});

}

analisadorLexico.updateSymbolTable = function(token,line){

	if(!analisadorLexico.tabelaDeSimbolos[token.nome]){
			analisadorLexico.tabelaDeSimbolos[token.nome] = new Object();
			analisadorLexico.tabelaDeSimbolos[token.nome].line = [];
			analisadorLexico.tabelaDeSimbolos[token.nome].ocorrencias = 1;
	}else{
		analisadorLexico.tabelaDeSimbolos[token.nome].ocorrencias =  analisadorLexico.tabelaDeSimbolos[token.nome].ocorrencias + 1;
	}
	analisadorLexico.tabelaDeSimbolos[token.nome].line.push(line);
}

analisadorLexico.addToken = function(token,line){
	
	if(token){
		
		analisadorLexico.updateSymbolTable(token,line);
			
			if(!analisadorLexico.tokens[line]){
				analisadorLexico.tokens[line] = [];
			}
			analisadorLexico.tokens[line].push(token);
	}
}

analisadorLexico.findNextSimbol = function(character){
	var find = [];	
	var error = false;
	analisadorLexico.tokens.forEach(function(currentLine){
	  	
	  	find = currentLine.filter(function(token){
	  		return token.nome == character;
	  	});	 
	  	 if(find.length > 0){
	  	 	error = true;
	  	 } 			  
	});

	return error;

	
}

analisadorLexico.incorrectToken = function(token){

	var _onlyLetter = /^[a-zA-Z]+$/;
	var _isIncorrect = false;
	if(!_onlyLetter.test(token.nome)){
		_isIncorrect = true;
		var _linesWithTOken = analisadorLexico.tabelaDeSimbolos[token.nome].line;

		for(var i = 0; i < _linesWithTOken;i++){
			var _line = _linesWithTOken[i];
			if(_line){
				var _listSingleQuotation = analisadorLexico.tokens[_line].filter(function(token){
					return token.nome == '\'';
				});
				var _listQuotation = analisadorLexico.tokens[_line].filter(function(token){
					return token.nome == '"';
				});
				if(_listSingleQuotation && (_listSingleQuotation.length> 0 && _listSingleQuotation.length < 2)){
					_isIncorrect = false;
				}else if(_listQuotation && (_listQuotation.length > 0 && _listQuotation.length < 2)){
					_isIncorrect = false;
				}
			}
		}

	}	
		
	return _isIncorrect;
	
	
};


analisadorLexico.findErrors = function(){
		
	analisadorLexico.tokens.forEach(function(currentLine){
	  	
	  	find = currentLine.forEach(function(token){
			if(token){

		  		if(token.nextSimbol){
					var exist = analisadorLexico.findNextSimbol(token.nextSimbol);
					if(!exist){
						 analisadorLexico.addNotifications("Erro o codigo contem o simbolo : " + token.nome + ", porem nao contem o simbolo : " + token.nextSimbol);
					}
				}

				if(token.type == "id"){
					if(analisadorLexico.incorrectToken(token)){
						 analisadorLexico.addNotifications("o id com o valor : " + token.nome + " é inválido de acordo com as regras da BNF só é aceito ID com Letras!");
					}
				}

				if(token.ocorrenciasMin){
					var ocorrencias = analisadorLexico.tabelaDeSimbolos[token.nome].ocorrencias;
					if( ocorrencias < token.ocorrenciasMin ){
						analisadorLexico.addNotifications("Erro o codigo contem o simbolo : " + token.nome + " apenas : " + ocorrencias + " vez");
					}
				}
			}

	  	});	  			  
		
	});
};
analisadorLexico.findTokens = function(caracteresDaLinha,line){
	var candidate = "";

	caracteresDaLinha.forEach(function(caracter){
		var token = null;
		if(analisadorLexico.searchSymbol(caracter) || caracter == " "){
			
			if(candidate.length > 0){
				token = isNaN(candidate) ? {nome : candidate.trim(), type: 'id', description : 'id'} : {nome : candidate ,type : "numeric",description : "numero"}
				analisadorLexico.addToken(token,line);
			}	
			
			if(caracter != " "){
				token = analisadorLexico.searchSymbol(caracter.trim());
				analisadorLexico.addToken(token,line);
			}
			
			candidate = "";

		}else{

		candidate = candidate + caracter;
	
			if(analisadorLexico.searchSymbol(candidate)){
				token = analisadorLexico.searchSymbol(candidate);
				
				analisadorLexico.addToken(token,line);
				candidate = "";
			}
		}
	});
}

/*
 1- percorre ás linas do arquivo em um forEach 
 2- quebra os caracteres da linha em um novo array chamado content
 3- chama o método findTokens (Linha 132)
 4 depois do forEach é chamado os métodos : findComentary( Linha ...),findErrors( Linha ...) e printLines( Linha ...)
*/

analisadorLexico.parser = function () {
	var parts = [];
	var line = 0;
	file.lines.forEach(function(currentLine){
		var content = currentLine.split("");
		analisadorLexico.findTokens(content,line);	
		line  = line + 1;		
	});
	analisadorLexico.findComentary();
	analisadorLexico.findErrors();
	analisadorLexico.printLines();
};
/*
1- inicializa as listas de caracter e de tokens
2- chama o método parser (Linha 177)
*/
analisadorLexico.initialize = function () {
	analisadorLexico.tabelaDeSimbolos = [];
	analisadorLexico.tokens = [];
	analisadorLexico.parser();	
};