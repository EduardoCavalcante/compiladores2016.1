var analisadorSintatico = {} ||analisadorSintatico;


analisadorSintatico.initialize = function(analisadorLexico){

	analisadorSintatico.scanner = analisadorLexico;
	analisadorSintatico.stack = [];
	currentToken = scanner.tokens[0];
};

analisadorSintatico.scanner = function(token,nextToken){

};