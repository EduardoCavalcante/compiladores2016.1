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
		type : "Special symbols",
		description : "abre chochetes...",
		nextSimbol : ["]"],
	},	
	']' : {
		nome : "]",
		type : "Special symbols",
		description : "fechaChochetes...",
		nextSimbol : ["["],
	},

		'{' : {
		nome : "{",
		type : "Special symbols",
		description : "abre chaves",
		nextSimbol : ["}"],
	},
	
		'}' : {
		nome : "}",
		type : "Special symbols",
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
		type : "while",
		description : "if",
		
	},

	'else' : {
		nome : "else",
		type : "while",
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
		type : "palavra reservada",
		description : "printf",
		
	},


	'scanf' : {
		nome : "scanf",
		type : "palavra reservada",
		description : "scanf",
		
	},

	'void' : {
		nome : "void",
		type : "Keywords",
		description : "void",
	},

	'while' : {
		nome : "while",
		type : "Keywords",
		description : "while",
	},

	'return' : {
		nome : "return",
		type : "Keywords",
		description : "return",
	},

}