
// npm install ohm-js
'use strict';

const grammar =
      `
TINYBASIC {
Basic = Statement+
Statement =   "print" Expr_list -- print
            | "if" Expression Relop Expression "then" Statement -- ifthen
	    | "goto" Expression -- goto
	    | "input" Variable_list -- input
	    | "let" Variable "=" Expression --let
	    | "gosub" Expression -- gosub
	    | "return" -- return
	    | "clear" -- clear
	    | "list"  -- list
	    | "run"   -- run
	    | "end" -- end
	    
Expr_list = ( string | Expression ) CommaExpr*
CommaExpr = "," (string | Expression) 
Variable_list = Variable CommaVar*
CommaVar = "," Variable
Expression = ("+" | "-")? Term MoreTerm*
MoreTerm = ("+" | "-") Term
Term = Factor MoreFactor*
MoreFactor = ("*" | "/") Factor
Factor =   Variable -- var
         | Number -- number
	 | "(" Expression ")" -- paren
Variable = "a" .. "z" 
Number = digit+ 
Relop = "<>" | "<=" | "<" | "><" | ">=" | "=" 
string = dq notDQ* dq
dq = "\\""
notDQ = ~dq any
}



`;


function ohm_parse (grammar, text) {
    var ohm = require ('ohm-js');
    var parser = ohm.grammar (grammar);
    var cst = parser.match (text);
    if (cst.succeeded ()) {
	return { succeeded: true, message: "OK", parser: parser, cst: cst };
    } else {
	//console.log (parser.trace (text).toString ());
	//throw "glue: Ohm matching failed";
        
        return { succeeded: false, message: cst.message, parser: parser, cst: cst };
    }
}

function getNamedFile (fname) {
    var fs = require ('fs');
    if (fname === undefined || fname === null || fname === "-") {
	return fs.readFileSync (0, 'utf-8');
    } else {
	return fs.readFileSync (fname, 'utf-8');
    }	
}
'use strict'

var _scope;

function scopeStack () {
    this._stack = [];
    this.pushNew = function () {this._stack.push ([])};
    this.pop = function () {this._stack.pop ()};
    this._topIndex = function () {return this._stack.length - 1;};
    this._top = function () { return this._stack[this._topIndex ()]; };
    this.scopeAdd = function (key, val) {
	this._top ().push ({key: key, val: val});
    };
    this._lookup = function (key, a) { 
      return a.find (obj => {return obj && obj.key && (obj.key == key)}); };
    this.scopeGet = function (key) {
	var i = this._topIndex ();
	for (; i >= 0 ; i -= 1) {
	    var obj = this._lookup (key, this._stack [i]);
	    if (obj) {
		return obj.val;
	    };
	};
        process.stderr.write ('*** scopeGet error key=' + key + ' ***' + "\n");
	process.stderr.write (this._stack.toString () + "\n");
	process.stderr.write (key.toString () + "\n");
	process.exit (1);
    };
    this.scopeModify = function (key, val) {
	var i = this._topIndex ();
	for (; i >= 0 ; i -= 1) {
	    var obj = this._lookup (key, this._stack [i]);
	    if (obj) {
              obj.val = val;
              return val;
	    };
	};
        process.stderr.write ('*** scopeModify error key=' + key + ' ***' + "\n");
	process.stderr.write (this._stack.toString () + "\n");
	process.stderr.write (key.toString () + "\n");
	process.exit (1);
    };
}

function scopeAdd (key, val) {
  return _scope.scopeAdd (key, val);
}

function scopeModify (key, val) {
  return _scope.scopeModify (key, val);
}

function scopeGet (key, val) {
  return _scope.scopeGet (key, val);
}

function _ruleInit () {
    _scope = new scopeStack ();
}

function _ruleEnter (ruleName) {
    _scope.pushNew ();
}

function _ruleExit (ruleName) {
    _scope.pop ();
}

_ruleInit ();
function addSemantics (sem) {
  sem.addOperation (
'_glue',
{
Basic : function (_statements
,) {
_ruleEnter ("Basic");

var statements = _statements._glue ().join ('');
var _result = `${statements}`;
_ruleExit ("Basic");
return _result;
},
Statement_print : function (_printkeyword,_exprList,) {
_ruleEnter ("Statement_print");

var printkeyword = _printkeyword._glue ();var exprList = _exprList._glue ();
var _result = `${printkeyword} ${exprList}\n`;
_ruleExit ("Statement_print");
return _result;
},
Statement_ifthen : function (_ifkeyword,_e1,_relop,_e2,_thenkeyword,_statement,) {
_ruleEnter ("Statement_ifthen");

var ifkeyword = _ifkeyword._glue ();var e1 = _e1._glue ();var relop = _relop._glue ();var e2 = _e2._glue ();var thenkeyword = _thenkeyword._glue ();var statement = _statement._glue ();
var _result = `${ifkeyword} ${e1} ${relop} ${e2} ${thenkeyword} ${statement}\n`;
_ruleExit ("Statement_ifthen");
return _result;
},
Statement_goto : function (_gotokeyword,_expression,) {
_ruleEnter ("Statement_goto");

var gotokeyword = _gotokeyword._glue ();var expression = _expression._glue ();
var _result = `${gotokeyword} ${expression}\n`;
_ruleExit ("Statement_goto");
return _result;
},
Statement_input : function (_inputkeyword,_varList,) {
_ruleEnter ("Statement_input");

var inputkeyword = _inputkeyword._glue ();var varList = _varList._glue ();
var _result = `${inputkeyword} ${varList}\n`;
_ruleExit ("Statement_input");
return _result;
},
Statement_let : function (_letkeyword,_v,_eqkeyword,_e,) {
_ruleEnter ("Statement_let");

var letkeyword = _letkeyword._glue ();var v = _v._glue ();var eqkeyword = _eqkeyword._glue ();var e = _e._glue ();
var _result = `${letkeyword} ${v} ${eqkeyword} ${e}\n`;
_ruleExit ("Statement_let");
return _result;
},
Statement_gosub : function (_gosubkeyword,_e,) {
_ruleEnter ("Statement_gosub");

var gosubkeyword = _gosubkeyword._glue ();var e = _e._glue ();
var _result = `${gosubkeyword} ${e}\n`;
_ruleExit ("Statement_gosub");
return _result;
},
Statement_return : function (_returnkeyword,) {
_ruleEnter ("Statement_return");

var returnkeyword = _returnkeyword._glue ();
var _result = `${returnkeyword}\n`;
_ruleExit ("Statement_return");
return _result;
},
Statement_clear : function (_clearkeyword,) {
_ruleEnter ("Statement_clear");

var clearkeyword = _clearkeyword._glue ();
var _result = `${clearkeyword}\n`;
_ruleExit ("Statement_clear");
return _result;
},
Statement_list : function (_listkeyword,) {
_ruleEnter ("Statement_list");

var listkeyword = _listkeyword._glue ();
var _result = `${listkeyword}\n`;
_ruleExit ("Statement_list");
return _result;
},
Statement_run : function (_runkeyword,) {
_ruleEnter ("Statement_run");

var runkeyword = _runkeyword._glue ();
var _result = `${runkeyword}\n`;
_ruleExit ("Statement_run");
return _result;
},
Statement_end : function (_endkeyword,) {
_ruleEnter ("Statement_end");

var endkeyword = _endkeyword._glue ();
var _result = `${endkeyword}\n`;
_ruleExit ("Statement_end");
return _result;
},
Expr_list : function (_stringOrExpression1,_commaExpr
,) {
_ruleEnter ("Expr_list");

var stringOrExpression1 = _stringOrExpression1._glue ();var commaExpr = _commaExpr._glue ().join ('');
var _result = `${stringOrExpression1} ${commaExpr}`;
_ruleExit ("Expr_list");
return _result;
},
CommaExpr : function (_commakeyword,_stringOrExpression,) {
_ruleEnter ("CommaExpr");

var commakeyword = _commakeyword._glue ();var stringOrExpression = _stringOrExpression._glue ();
var _result = `${commakeyword} ${stringOrExpression}`;
_ruleExit ("CommaExpr");
return _result;
},
Variable_list : function (_v,_commaVar
,) {
_ruleEnter ("Variable_list");

var v = _v._glue ();var commaVar = _commaVar._glue ().join ('');
var _result = `${v}${commaVar}`;
_ruleExit ("Variable_list");
return _result;
},
CommaVar : function (_commakeyword,_v,) {
_ruleEnter ("CommaVar");

var commakeyword = _commakeyword._glue ();var v = _v._glue ();
var _result = `${commakeyword}${v}`;
_ruleExit ("CommaVar");
return _result;
},
Expression : function (_plusMinusKeyword
,_term,_moreFactor
,) {
_ruleEnter ("Expression");

var plusMinusKeyword = _plusMinusKeyword._glue ().join ('');var term = _term._glue ();var moreFactor = _moreFactor._glue ().join ('');
var _result = `${plusMinusKeyword} ${term} ${moreFactor}`;
_ruleExit ("Expression");
return _result;
},
MoreFactor : function (_plusMinusKeyword
,_term,) {
_ruleEnter ("MoreFactor");

var plusMinusKeyword = _plusMinusKeyword._glue ().join ('');var term = _term._glue ();
var _result = `${pluMinusKeyword} ${term}`;
_ruleExit ("MoreFactor");
return _result;
},
Term : function (_factor,_moreFactor
,) {
_ruleEnter ("Term");

var factor = _factor._glue ();var moreFactor = _moreFactor._glue ().join ('');
var _result = `${factor} ${moreFactor}`;
_ruleExit ("Term");
return _result;
},
MoreFactor : function (_timesDiv,_factor,) {
_ruleEnter ("MoreFactor");

var timesDiv = _timesDiv._glue ();var factor = _factor._glue ();
var _result = `${timesDiv} ${factor}`;
_ruleExit ("MoreFactor");
return _result;
},
Factor_var : function (_v,) {
_ruleEnter ("Factor_var");

var v = _v._glue ();
var _result = `${v}`;
_ruleExit ("Factor_var");
return _result;
},
Factor_number : function (_num,) {
_ruleEnter ("Factor_number");

var num = _num._glue ();
var _result = `${num}`;
_ruleExit ("Factor_number");
return _result;
},
Factor_paren : function (_openParen,_e,_closeParen,) {
_ruleEnter ("Factor_paren");

var openParen = _openParen._glue ();var e = _e._glue ();var closeParen = _closeParen._glue ();
var _result = `${openParen} ${e} ${closeParen}`;
_ruleExit ("Factor_paren");
return _result;
},
Variable : function (_c,) {
_ruleEnter ("Variable");

var c = _c._glue ();
var _result = `${c}`;
_ruleExit ("Variable");
return _result;
},
Number : function (_digit
,) {
_ruleEnter ("Number");

var digit = _digit._glue ().join ('');
var _result = `${digit}`;
_ruleExit ("Number");
return _result;
},
Relop : function (_op,) {
_ruleEnter ("Relop");

var op = _op._glue ();
var _result = `${op}`;
_ruleExit ("Relop");
return _result;
},
string : function (_q1,_cs
,_q2,) {
_ruleEnter ("string");

var q1 = _q1._glue ();var cs = _cs._glue ().join ('');var q2 = _q2._glue ();
var _result = `${q1}${cs}${q2}`;
_ruleExit ("string");
return _result;
},
dq : function (_q,) {
_ruleEnter ("dq");

var q = _q._glue ();
var _result = `${q}`;
_ruleExit ("dq");
return _result;
},
notDQ : function (_c,) {
_ruleEnter ("notDQ");

var c = _c._glue ();
var _result = `${c}`;
_ruleExit ("notDQ");
return _result;
},

_terminal: function () {return this.primitiveValue; }
});
}


function main () {
    // usage: node glue <file
    // grammar is inserted from grasem.ohm
    // test.grasem is read from stdin
    var text = getNamedFile ("-");
    var { succeeded, message, parser, cst } = ohm_parse (grammar, text);
    var sem = {};
    var outputString = "";
    if (cst.succeeded ()) {
	sem = parser.createSemantics ();
	addSemantics (sem);
	outputString = sem (cst)._glue ();
	return { succeeded: true, message: "OK", cst: cst, semantics: sem, resultString: outputString };
    } else {
	return { succeeded: false, message: message, cst: cst, semantics: sem, resultString: outputString };
    }
}


var { succeeded, message, cst, semantics, resultString } = main ();
if (succeeded) {
    console.log (resultString);
} else {
    process.stderr.write (`${message}\n`);
    return false;
}
