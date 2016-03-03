var typeSpecifier = typeSpecifier || {};


typeSpecifier = {
	
	'int' : {
		nome : "int",
		type : "typeSpecifier",
		description : "numeric...",		
	},
	'String' : {
		nome : "String",
		type : "typeSpecifier",
		description : "text...",	
	},

	'[' : {
		nome : "[",
		type : "specialSymbol",
		description : "abre chochetes...",
		nextSimbol : ["]"],
	},
	
	']' : {
		nome : "]",
		type : "specialSymbol",
		description : "fechaChochetes...",
		nextSimbol : ["["],
	},

	'{' : {
		nome : "{",
		type : "specialSymbol",
		description : "abre chaves",
		nextSimbol : ["}"],
	},
	
	'}' : {
		nome : "}",
		type : "specialSymbol",
		description : "fecha chaves",
		nextSimbol : ["{"],
	},
	';' : {
		nome : ";",
		type : "specialSymbol",
		description : "finalizador de linha",
	},
	'=' : {
		nome : "=",
		type : "specialSymbol",
		description : "atribuicao",
	},
	'==' : {
		nome : "==",
		type : "Special symbols",
		description : "comparacao",
	},
	'>=' : {
		nome : ">=",
		type : "Special symbols",
		description : "maior ou igual",
	},
	'<=' : {
		nome : "<=",
		type : "Special symbols",
		description : "menor ou igual",
	},
	'+' : {
		nome : "+",
		type : "addop",
		description : "soma",
	},
	'-' : {
		nome : "-",
		type : "addop",
		description : "subtracao",
	},
	'\'' : {
		nome : '\'',
		type : "specialSymbol",
		description : "aspas simples",
		ocorrenciasMin : 2,
	},
		'"' : {
		nome : '"',
		type : "specialSymbol",
		description : "aspas dupla",
		ocorrenciasMin : 2,
	},

		'*' : {
		nome : "*",
		type : "addop",
		description : "multiplicacao",
	},
	'/' : {
		nome : "/",
		type : "addop",
		description : "divisao",
	},

	'/*' : {
		nome : "/*",
		type : "specialSymbol",
		description : "inicio do comentario",
		nextSimbol : ["*/"],
	},	

	'*/' : {
		nome : "*/",
		type : "specialSymbol",
		description : "fim do comentario",
		nextSimbol : ["/*"],
	},

}