/**
 * Licence: LGPL
 * Code by: ehooo
 */
;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		var keywords = 'true false null nop public static final protected private build runtime system throw constructor interface enum strictfp synthetic annotation volatile transient';
		
		var point_end_keywords = 'field subannotation annotation method parameter local packed\\-switch array\\-data sparse\\-switch';
		var GetPointEndKeywords = function(){
			return '\\.end\\ ' + point_end_keywords.replace(/ /g, '|\\.end\\ ');
		};

		var point_keywords = 'locals '+point_end_keywords+' restart class super implements'+
		' line prologue epilogue catchall catch source enum registers'
		var GetPointKeywords = function(){
			return '\\.' + point_keywords.replace(/ /g, '|\\.');
		};

		var directives ='goto(16|32)? declared-synchronized'+
		' return(-(wide|object|void))? monitor-(enter|exit)'+
		' const(-(class|string|wide))?(/(4|16|high16|jumbo|32))?'+
		' if-(eqz|nez|ltz|gez|gtz|lez|eq|ne|lt|ge|gt|le) (cmpl|cmpg)-(float|double) cmp-long'+
		' (neg|not)-(int|long|float|double)'+
		' int-to-(long|float|double|byte|char|short)'+
		' (long|float|double)-to-(long|float|double|int)'+
		' move(-result)?(-(exception|wide|object))?(/(16|from16))?'+
		' (sget|sput|aget|aput)(-(wide|object|boolean|byte|char|short))?'+
		' (iput|iget)(-(wide|object|boolean|byte|char|short))?(-quick)?'+
		' (and|or|xor|shl|shr|ushr)-(int|long)(/(lit8|lit16|2addr))? rsub-int(/lit8)?'+
		' (mul|div|rem|add|sub)-(int|long|double|float)(/(lit8|lit16|2addr))?'+
		' invoke-(virtual(-quick)?|super(-quick)?|direct(-empty)?|static|interface)(/range)?'+
		' filled-new-array(/range)? execute-inline(/range)?'+
		' check-cast new-instance instance-of new-array array-length filled-new-array fill-array-data packed-switch sparse-switch';
		var GetDirectives = function(){
			var tmp = directives.replace('-', '\\-');
			return '\\b' + tmp.replace(/ /g, '\\b|\\b')+'\\b';
		};

		var class_re = 'L([a-zA-Z_]+[a-z_A-Z0-9]*)(/([a-z_A-Z]+[a-z_A-Z0-9\\$]*))+;';
		var ret = '((\\[)*('+class_re+'|I|Z|B|S|C|J|F|D|V))';
		var function_re = class_re+'\\-&gt;(&lt;(init|clinit)&gt;|[a-z_A-Z]+[a-z_A-Z0-9]*)\\('+ret+'*\\)'+ret;

		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.singleLinePerlComments,		css: 'comments' },	// #one line comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },		// "double quoted strings"
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },		// 'single quoted strings'
			{ regex: /\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,				css: 'number' },		// numbers
			{ regex: new RegExp('\\b(v|p)[\\d]+(\\.[\\d]+)?\\b', 'gi'),	css: 'variable' },		// valiable

			{ regex: new RegExp(class_re, 'g'),							css: 'color1' },		// class
			{ regex: new RegExp(function_re, 'gi'),						css: 'functions' },

			{ regex: new RegExp(GetDirectives(), 'gm'),					css: 'keyword' },
			{ regex: new RegExp(GetPointEndKeywords(), 'gm'),			css: 'keyword' },
			{ regex: new RegExp(GetPointKeywords(), 'gm'),				css: 'keyword' },
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),		css: 'keyword' }
			];
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['smali','android'];

	SyntaxHighlighter.brushes.Xml = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

 