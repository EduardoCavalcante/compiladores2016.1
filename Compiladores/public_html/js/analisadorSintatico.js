var analisadorSintatico = {} ||analisadorSintatico;


analisadorSintatico.initialize = function(analisadorLexico){

	var _tokens = analisadorLexico.tokens;
	analisadorSintatico.scope = {ID: 0, parent : null , childrens : [],value : 'program'};
	analisadorSintatico.scopes = [];
	analisadorSintatico.scanner(_tokens);


};

analisadorSintatico.createScope = function(parent,expression){
	return {
			ID: (analisadorSintatico.scopes.length + 1),
		 	parent : parent ,
		 	childrens : [],
		 	value : expression,
		 	name : 'scope' + (analisadorSintatico.scopes.length + 1),
		 	hasFinishScope : false,
		};
}

analisadorSintatico.scanner = function(tokens){
	var _expression = "";
	var _finalizadoresEncontrados = 0;
	tokens.forEach(function(line){
		line.forEach(function(token){
			_expression += token.nome;
			var _parent = null;
			if(token.nome == "{"){
				if(analisadorSintatico.scopes.length == 0){
					_parent = analisadorSintatico.scope;
				}else{
					_parent = analisadorSintatico.scope.childrens[analisadorSintatico.scopes.length - 1];
				}
				_newScope = analisadorSintatico.createScope(_parent,_expression);
				_parent.childrens.push(_newScope);
				_expression = "";	

				analisadorSintatico.scopes.push(_newScope);
			}
			if(token.nome == "}"){
				_finalizadoresEncontrados = _finalizadoresEncontrados + 1;

				if(analisadorSintatico.scopes.length > 0 && analisadorSintatico.scopes.length >= _finalizadoresEncontrados){
					var i = analisadorSintatico.scopes.length - 1;
					while(i  >= 0){
						if(!analisadorSintatico.scopes[i].hasFinishScope){
							analisadorSintatico.scopes[i].hasFinishScope = true;
							break;
						}
						i--;
					}
					
				}else{
					alert("erro, simbolo de finalização de escopo invalida");
				}
			}
			
			if(token.nome == ";"){
				if(analisadorSintatico.scopes.length > 0){
					analisadorSintatico.scopes[analisadorSintatico.scopes.length - 1].childrens.push(_expression);
				}else{
					alert("erro, scopo não definido");
				}
				_expression = "";
			}
			
		});
	});
	console.log(analisadorSintatico);

};