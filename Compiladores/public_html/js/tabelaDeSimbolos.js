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
	'!=' : {
		nome : "!=",
		type : "Special symbols",
		description : "comparacao",

	},
		'>' : {
		nome : ">",
		type : "Special symbols",
		description : "maior",
	},
		'<' : {
		nome : "<",
		type : "Special symbols",
		description : "menor",
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

	'if' : {
		nome : "if",
		type : "specialSymbol",
		description : "if",
		
	},

	'else' : {
		nome : "else",
		type : "specialSymbol",
		description : "else",
		
	},

	',' : {
		nome : ",",
		type : "specialSymbol",
		description : ",",
		
	},

	'(' : {
		nome : "(",
		type : "specialSymbol",
		description : "(",
		nextSimbol : [")"],
		
	},


	')' : {
		nome : ")",
		type : "specialSymbol",
		description : ")",
		nextSimbol : ["("],
		
	},

	'printf' : {
		nome : "printf",
		type : "specialSymbol",
		description : "printf",
		
	},


	'scanf' : {
		nome : "scanf",
		type : "specialSymbol",
		description : "scanf",
		
	},

	'void' : {
		nome : "void",
		type : "specialSymbol",
		description : "void",
	},

	'return' : {
		nome : "return",
		type : "specialSymbol",
		description : "return",
	},

}