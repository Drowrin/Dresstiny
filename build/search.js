(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Search$GetManifest = function (a) {
	return {$: 'GetManifest', a: a};
};
var $author$project$Search$Loading = {$: 'Loading'};
var $author$project$Search$Model = F6(
	function (state, storagePermission, string, filter, fullResults, allItems) {
		return {allItems: allItems, filter: filter, fullResults: fullResults, state: state, storagePermission: storagePermission, string: string};
	});
var $author$project$Shared$None = {$: 'None'};
var $author$project$Shared$Status = F2(
	function (a, b) {
		return {$: 'Status', a: a, b: b};
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Search$StoredData = F3(
	function (version, data, index) {
		return {data: data, index: index, version: version};
	});
var $author$project$Const$dataVersion = '1.0';
var $author$project$ApiModel$Item = F8(
	function (hash, name, icon, screenshot, description, classType, source, sets) {
		return {classType: classType, description: description, hash: hash, icon: icon, name: name, screenshot: screenshot, sets: sets, source: source};
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map8 = _Json_map8;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$ApiModel$decodeItem = A9(
	$elm$json$Json$Decode$map8,
	$author$project$ApiModel$Item,
	A2($elm$json$Json$Decode$field, 'hash', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'icon', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'screenshot', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'classType', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'source', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'sets',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $rluiten$elm_text_search$Index$Defaults$elmTextSearchIndexType = '-= ElmTextSearch Index Type 1 =-';
var $rluiten$elm_text_search$Index$Defaults$getIndexSimpleConfig = function (_v0) {
	var ref = _v0.ref;
	var fields = _v0.fields;
	var listFields = _v0.listFields;
	return {fields: fields, indexType: $rluiten$elm_text_search$Index$Defaults$elmTextSearchIndexType, listFields: listFields, ref: ref};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$core$Basics$not = _Basics_not;
var $rluiten$elm_text_search$StopWordFilter$createFilterFunc = F2(
	function (tokens, index) {
		var tokenSet = $elm$core$Set$fromList(tokens);
		return _Utils_Tuple2(
			index,
			function (word) {
				return !A2($elm$core$Set$member, word, tokenSet);
			});
	});
var $rluiten$elm_text_search$StopWordFilter$stopEnglishWordList = _List_fromArray(
	['a', 'able', 'about', 'across', 'after', 'all', 'almost', 'also', 'am', 'among', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'but', 'by', 'can', 'cannot', 'could', 'dear', 'did', 'do', 'does', 'either', 'else', 'ever', 'every', 'for', 'from', 'get', 'got', 'had', 'has', 'have', 'he', 'her', 'hers', 'him', 'his', 'how', 'however', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'least', 'let', 'like', 'likely', 'may', 'me', 'might', 'most', 'must', 'my', 'neither', 'no', 'nor', 'not', 'of', 'off', 'often', 'on', 'only', 'or', 'other', 'our', 'own', 'rather', 'said', 'say', 'says', 'she', 'should', 'since', 'so', 'some', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'tis', 'to', 'too', 'twas', 'us', 'wants', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'yet', 'you', 'your']);
var $rluiten$elm_text_search$StopWordFilter$createDefaultFilterFunc = function (index) {
	return A2($rluiten$elm_text_search$StopWordFilter$createFilterFunc, $rluiten$elm_text_search$StopWordFilter$stopEnglishWordList, index);
};
var $rluiten$elm_text_search$Index$Defaults$defaultStopWordFilterFuncCreator = $rluiten$elm_text_search$StopWordFilter$createDefaultFilterFunc;
var $rluiten$elm_text_search$Index$Defaults$defaultFilterFactories = _List_fromArray(
	[$rluiten$elm_text_search$Index$Defaults$defaultStopWordFilterFuncCreator]);
var $rluiten$elm_text_search$Index$Utils$createFuncCreator = F2(
	function (func, index) {
		return _Utils_Tuple2(index, func);
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $rluiten$elm_text_search$TokenProcessors$forceRegex = A2(
	$elm$core$Basics$composeL,
	$elm$core$Maybe$withDefault($elm$regex$Regex$never),
	$elm$regex$Regex$fromString);
var $rluiten$elm_text_search$TokenProcessors$trimmerRegex = $rluiten$elm_text_search$TokenProcessors$forceRegex('^\\W+|\\W+$');
var $rluiten$elm_text_search$TokenProcessors$trimmer = A2(
	$elm$regex$Regex$replace,
	$rluiten$elm_text_search$TokenProcessors$trimmerRegex,
	function (_v0) {
		return '';
	});
var $rluiten$elm_text_search$Index$Defaults$defaultTokenTrimmerFuncCreator = $rluiten$elm_text_search$Index$Utils$createFuncCreator($rluiten$elm_text_search$TokenProcessors$trimmer);
var $rluiten$elm_text_search$Index$Defaults$defaultInitialTransformFactories = _List_fromArray(
	[$rluiten$elm_text_search$Index$Defaults$defaultTokenTrimmerFuncCreator]);
var $elm$core$String$reverse = _String_reverse;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$startsWith = _String_startsWith;
var $rluiten$stemmer$Stemmer$step1aX = function (drow) {
	return A2($elm$core$String$startsWith, 'sess', drow) ? A2($elm$core$String$dropLeft, 2, drow) : (A2($elm$core$String$startsWith, 'sei', drow) ? A2($elm$core$String$dropLeft, 2, drow) : (A2($elm$core$String$startsWith, 'ss', drow) ? drow : (A2($elm$core$String$startsWith, 's', drow) ? A2($elm$core$String$dropLeft, 1, drow) : drow)));
};
var $rluiten$stemmer$Stemmer$isVowelCore = F2(
	function (includeY, c) {
		switch (c.valueOf()) {
			case 'a':
				return true;
			case 'e':
				return true;
			case 'i':
				return true;
			case 'o':
				return true;
			case 'u':
				return true;
			case 'y':
				return includeY ? true : false;
			default:
				return false;
		}
	});
var $rluiten$stemmer$Stemmer$isVowelWithY = $rluiten$stemmer$Stemmer$isVowelCore(true);
var $rluiten$stemmer$Stemmer$hasVowel2X = function (word) {
	hasVowel2X:
	while (true) {
		var _v0 = $elm$core$String$uncons(word);
		if (_v0.$ === 'Just') {
			var _v1 = _v0.a;
			var h = _v1.a;
			var wordTail = _v1.b;
			var _v2 = $rluiten$stemmer$Stemmer$isVowelWithY(h);
			if (_v2) {
				return true;
			} else {
				var $temp$word = wordTail;
				word = $temp$word;
				continue hasVowel2X;
			}
		} else {
			return false;
		}
	}
};
var $rluiten$stemmer$Stemmer$isVowel = $rluiten$stemmer$Stemmer$isVowelCore(false);
var $rluiten$stemmer$Stemmer$hasVowelX = function (drow) {
	var _v0 = $elm$core$String$uncons(
		$elm$core$String$reverse(drow));
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var h = _v1.a;
		var wordTail = _v1.b;
		var _v2 = $rluiten$stemmer$Stemmer$isVowel(h);
		if (_v2) {
			return true;
		} else {
			return $rluiten$stemmer$Stemmer$hasVowel2X(wordTail);
		}
	} else {
		return false;
	}
};
var $rluiten$stemmer$Stemmer$foundConsonantX = F2(
	function (word, m) {
		foundConsonantX:
		while (true) {
			var _v3 = $elm$core$String$uncons(word);
			if (_v3.$ === 'Just') {
				var _v4 = _v3.a;
				var h = _v4.a;
				var wordTail = _v4.b;
				var _v5 = $rluiten$stemmer$Stemmer$isVowelWithY(h);
				if (_v5) {
					return A2($rluiten$stemmer$Stemmer$foundVowelX, wordTail, m);
				} else {
					var $temp$word = wordTail,
						$temp$m = m;
					word = $temp$word;
					m = $temp$m;
					continue foundConsonantX;
				}
			} else {
				return m;
			}
		}
	});
var $rluiten$stemmer$Stemmer$foundVowelX = F2(
	function (word, m) {
		foundVowelX:
		while (true) {
			var _v0 = $elm$core$String$uncons(word);
			if (_v0.$ === 'Just') {
				var _v1 = _v0.a;
				var h = _v1.a;
				var wordTail = _v1.b;
				var _v2 = $rluiten$stemmer$Stemmer$isVowel(h);
				if (_v2) {
					var $temp$word = wordTail,
						$temp$m = m;
					word = $temp$word;
					m = $temp$m;
					continue foundVowelX;
				} else {
					return A2($rluiten$stemmer$Stemmer$foundConsonantX, wordTail, m + 1);
				}
			} else {
				return m;
			}
		}
	});
var $rluiten$stemmer$Stemmer$foundLeadingConsonantX = function (word) {
	foundLeadingConsonantX:
	while (true) {
		var _v0 = $elm$core$String$uncons(word);
		if (_v0.$ === 'Just') {
			var _v1 = _v0.a;
			var h = _v1.a;
			var wordTail = _v1.b;
			var _v2 = $rluiten$stemmer$Stemmer$isVowelWithY(h);
			if (_v2) {
				return A2($rluiten$stemmer$Stemmer$foundVowelX, wordTail, 0);
			} else {
				var $temp$word = wordTail;
				word = $temp$word;
				continue foundLeadingConsonantX;
			}
		} else {
			return 0;
		}
	}
};
var $rluiten$stemmer$Stemmer$measureX = function (drow) {
	var word = $elm$core$String$reverse(drow);
	var _v0 = $elm$core$String$uncons(word);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var h = _v1.a;
		var wordTail = _v1.b;
		var _v2 = $rluiten$stemmer$Stemmer$isVowel(h);
		if (_v2) {
			return A2($rluiten$stemmer$Stemmer$foundVowelX, wordTail, 0);
		} else {
			return $rluiten$stemmer$Stemmer$foundLeadingConsonantX(wordTail);
		}
	} else {
		return 0;
	}
};
var $elm$core$String$cons = _String_cons;
var $rluiten$stemmer$Stemmer$endsWithCVCX = function (drow) {
	var _v0 = $elm$core$String$uncons(drow);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var c2 = _v1.a;
		var drowTail1 = _v1.b;
		if (!($rluiten$stemmer$Stemmer$isVowel(c2) || (_Utils_eq(
			c2,
			_Utils_chr('w')) || (_Utils_eq(
			c2,
			_Utils_chr('x')) || _Utils_eq(
			c2,
			_Utils_chr('y')))))) {
			var _v2 = $elm$core$String$uncons(drowTail1);
			if (_v2.$ === 'Just') {
				var _v3 = _v2.a;
				var v = _v3.a;
				var drowTail2 = _v3.b;
				if ($rluiten$stemmer$Stemmer$isVowelWithY(v)) {
					var _v4 = $elm$core$String$uncons(drowTail2);
					if (_v4.$ === 'Just') {
						var _v5 = _v4.a;
						var c1 = _v5.a;
						var drowTail3 = _v5.b;
						return !$rluiten$stemmer$Stemmer$isVowel(c1);
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
};
var $rluiten$stemmer$Stemmer$endsWithDoubleConsX = function (drow) {
	var _v0 = $elm$core$String$uncons(drow);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var c1 = _v1.a;
		var drowTail = _v1.b;
		if (!$rluiten$stemmer$Stemmer$isVowelWithY(c1)) {
			var _v2 = $elm$core$String$uncons(drowTail);
			if (_v2.$ === 'Just') {
				var _v3 = _v2.a;
				var c2 = _v3.a;
				var drowTail2 = _v3.b;
				return _Utils_eq(c1, c2);
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
};
var $rluiten$stemmer$Stemmer$step1b2X = function (drow) {
	if (A2($elm$core$String$startsWith, 'ta', drow) || (A2($elm$core$String$startsWith, 'lb', drow) || A2($elm$core$String$startsWith, 'zi', drow))) {
		return A2(
			$elm$core$String$cons,
			_Utils_chr('e'),
			drow);
	} else {
		var _v0 = $elm$core$String$uncons(drow);
		if (_v0.$ === 'Just') {
			var _v1 = _v0.a;
			var h = _v1.a;
			var drowTail = _v1.b;
			return ($rluiten$stemmer$Stemmer$endsWithDoubleConsX(drow) && (!(_Utils_eq(
				h,
				_Utils_chr('l')) || (_Utils_eq(
				h,
				_Utils_chr('s')) || _Utils_eq(
				h,
				_Utils_chr('z')))))) ? drowTail : ((($rluiten$stemmer$Stemmer$measureX(drow) === 1) && $rluiten$stemmer$Stemmer$endsWithCVCX(drow)) ? A2(
				$elm$core$String$cons,
				_Utils_chr('e'),
				drow) : drow);
		} else {
			return drow;
		}
	}
};
var $rluiten$stemmer$Stemmer$step1bX = function (drow) {
	if (A2($elm$core$String$startsWith, 'dee', drow)) {
		return ($rluiten$stemmer$Stemmer$measureX(
			A2($elm$core$String$dropLeft, 3, drow)) > 0) ? A2($elm$core$String$dropLeft, 1, drow) : drow;
	} else {
		if (A2($elm$core$String$startsWith, 'de', drow)) {
			var mets = A2($elm$core$String$dropLeft, 2, drow);
			return $rluiten$stemmer$Stemmer$hasVowelX(mets) ? $rluiten$stemmer$Stemmer$step1b2X(mets) : drow;
		} else {
			if (A2($elm$core$String$startsWith, 'gni', drow)) {
				var mets = A2($elm$core$String$dropLeft, 3, drow);
				return $rluiten$stemmer$Stemmer$hasVowelX(mets) ? $rluiten$stemmer$Stemmer$step1b2X(mets) : drow;
			} else {
				return drow;
			}
		}
	}
};
var $rluiten$stemmer$Stemmer$step1cX = function (drow) {
	var _v0 = $elm$core$String$uncons(drow);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var c = _v1.a;
		var drowTail = _v1.b;
		return (_Utils_eq(
			c,
			_Utils_chr('y')) && $rluiten$stemmer$Stemmer$hasVowelX(drowTail)) ? A2(
			$elm$core$String$cons,
			_Utils_chr('i'),
			drowTail) : drow;
	} else {
		return drow;
	}
};
var $rluiten$stemmer$Stemmer$step1X = A2(
	$elm$core$Basics$composeL,
	A2($elm$core$Basics$composeL, $rluiten$stemmer$Stemmer$step1cX, $rluiten$stemmer$Stemmer$step1bX),
	$rluiten$stemmer$Stemmer$step1aX);
var $elm$core$String$append = _String_append;
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $rluiten$stemmer$Stemmer$replaceStartX = F3(
	function (measureThreshold, _v0, drow) {
		var start = _v0.a;
		var newStart = _v0.b;
		var startLen = $elm$core$String$length(start);
		var drowStart = A2($elm$core$String$left, startLen, drow);
		if (_Utils_eq(drowStart, start)) {
			var drowEnd = A2($elm$core$String$dropLeft, startLen, drow);
			return (_Utils_cmp(
				$rluiten$stemmer$Stemmer$measureX(drowEnd),
				measureThreshold) > 0) ? _Utils_Tuple2(
				true,
				A2($elm$core$String$append, newStart, drowEnd)) : _Utils_Tuple2(true, drow);
		} else {
			return _Utils_Tuple2(false, drow);
		}
	});
var $rluiten$stemmer$Stemmer$replaceStartsX = F3(
	function (measureThreshold, rules, drow) {
		replaceStartsX:
		while (true) {
			if (rules.b) {
				var r = rules.a;
				var rs = rules.b;
				var _v1 = A3($rluiten$stemmer$Stemmer$replaceStartX, measureThreshold, r, drow);
				var patternMatched = _v1.a;
				var newDrow = _v1.b;
				if (patternMatched) {
					return newDrow;
				} else {
					var $temp$measureThreshold = measureThreshold,
						$temp$rules = rs,
						$temp$drow = drow;
					measureThreshold = $temp$measureThreshold;
					rules = $temp$rules;
					drow = $temp$drow;
					continue replaceStartsX;
				}
			} else {
				return drow;
			}
		}
	});
var $rluiten$stemmer$Stemmer$toR = $elm$core$String$reverse;
var $rluiten$stemmer$Stemmer$step2RulesX = _List_fromArray(
	[
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ational'),
		$rluiten$stemmer$Stemmer$toR('ate')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('tional'),
		$rluiten$stemmer$Stemmer$toR('tion')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('enci'),
		$rluiten$stemmer$Stemmer$toR('ence')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('anci'),
		$rluiten$stemmer$Stemmer$toR('ance')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('izer'),
		$rluiten$stemmer$Stemmer$toR('ize')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('bli'),
		$rluiten$stemmer$Stemmer$toR('ble')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('alli'),
		$rluiten$stemmer$Stemmer$toR('al')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('entli'),
		$rluiten$stemmer$Stemmer$toR('ent')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('eli'),
		$rluiten$stemmer$Stemmer$toR('e')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ousli'),
		$rluiten$stemmer$Stemmer$toR('ous')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ization'),
		$rluiten$stemmer$Stemmer$toR('ize')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ation'),
		$rluiten$stemmer$Stemmer$toR('ate')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ator'),
		$rluiten$stemmer$Stemmer$toR('ate')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('alism'),
		$rluiten$stemmer$Stemmer$toR('al')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('iveness'),
		$rluiten$stemmer$Stemmer$toR('ive')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('fulness'),
		$rluiten$stemmer$Stemmer$toR('ful')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ousness'),
		$rluiten$stemmer$Stemmer$toR('ous')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('aliti'),
		$rluiten$stemmer$Stemmer$toR('al')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('iviti'),
		$rluiten$stemmer$Stemmer$toR('ive')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('biliti'),
		$rluiten$stemmer$Stemmer$toR('ble')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('logi'),
		$rluiten$stemmer$Stemmer$toR('log'))
	]);
var $rluiten$stemmer$Stemmer$step2X = function (drow) {
	return A3($rluiten$stemmer$Stemmer$replaceStartsX, 0, $rluiten$stemmer$Stemmer$step2RulesX, drow);
};
var $rluiten$stemmer$Stemmer$step3RulesX = _List_fromArray(
	[
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('icate'),
		$rluiten$stemmer$Stemmer$toR('ic')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ative'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('alize'),
		$rluiten$stemmer$Stemmer$toR('al')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('iciti'),
		$rluiten$stemmer$Stemmer$toR('ic')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ical'),
		$rluiten$stemmer$Stemmer$toR('ic')),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ful'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ness'),
		'')
	]);
var $rluiten$stemmer$Stemmer$step3X = function (drow) {
	return A3($rluiten$stemmer$Stemmer$replaceStartsX, 0, $rluiten$stemmer$Stemmer$step3RulesX, drow);
};
var $rluiten$stemmer$Stemmer$step4IonX = F3(
	function (mThreshold, startLen, drow) {
		var afterNoi = A2($elm$core$String$dropLeft, startLen, drow);
		var _v0 = $elm$core$String$uncons(afterNoi);
		if (_v0.$ === 'Just') {
			var _v1 = _v0.a;
			var _char = _v1.a;
			var drowEnd = _v1.b;
			return ((_Utils_eq(
				_char,
				_Utils_chr('t')) || _Utils_eq(
				_char,
				_Utils_chr('s'))) && (_Utils_cmp(
				$rluiten$stemmer$Stemmer$measureX(afterNoi),
				mThreshold) > 0)) ? afterNoi : drow;
		} else {
			return drow;
		}
	});
var $rluiten$stemmer$Stemmer$step4RulesX = _List_fromArray(
	[
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('al'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ance'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ence'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('er'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ic'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('able'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ible'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ant'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ement'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ment'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ent'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ou'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ism'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ate'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('iti'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ous'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ive'),
		''),
		_Utils_Tuple2(
		$rluiten$stemmer$Stemmer$toR('ize'),
		'')
	]);
var $rluiten$stemmer$Stemmer$step4X = function (drow) {
	var mThreshold = 1;
	var ionCase = 'noi';
	var ionLen = $elm$core$String$length(ionCase);
	var drowStart = A2($elm$core$String$left, ionLen, drow);
	return _Utils_eq(drowStart, ionCase) ? A3($rluiten$stemmer$Stemmer$step4IonX, mThreshold, ionLen, drow) : A3($rluiten$stemmer$Stemmer$replaceStartsX, mThreshold, $rluiten$stemmer$Stemmer$step4RulesX, drow);
};
var $rluiten$stemmer$Stemmer$step5aX = function (drow) {
	var _v0 = $elm$core$String$uncons(drow);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var _char = _v1.a;
		var drowEnd = _v1.b;
		if (_Utils_eq(
			_char,
			_Utils_chr('e'))) {
			var m = $rluiten$stemmer$Stemmer$measureX(drowEnd);
			return (m > 1) ? drowEnd : (((m === 1) && (!$rluiten$stemmer$Stemmer$endsWithCVCX(drowEnd))) ? drowEnd : drow);
		} else {
			return drow;
		}
	} else {
		return drow;
	}
};
var $rluiten$stemmer$Stemmer$step5bX = function (drow) {
	var _v0 = $elm$core$String$uncons(drow);
	if (_v0.$ === 'Just') {
		var _v1 = _v0.a;
		var _char = _v1.a;
		var drowEnd = _v1.b;
		return (_Utils_eq(
			_char,
			_Utils_chr('l')) && (($rluiten$stemmer$Stemmer$measureX(drowEnd) > 1) && $rluiten$stemmer$Stemmer$endsWithDoubleConsX(drow))) ? drowEnd : drow;
	} else {
		return drow;
	}
};
var $rluiten$stemmer$Stemmer$step5X = A2($elm$core$Basics$composeL, $rluiten$stemmer$Stemmer$step5bX, $rluiten$stemmer$Stemmer$step5aX);
var $rluiten$stemmer$Stemmer$allStepsX = A2(
	$elm$core$Basics$composeL,
	A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					A2($elm$core$Basics$composeL, $elm$core$String$reverse, $rluiten$stemmer$Stemmer$step5X),
					$rluiten$stemmer$Stemmer$step4X),
				$rluiten$stemmer$Stemmer$step3X),
			$rluiten$stemmer$Stemmer$step2X),
		$rluiten$stemmer$Stemmer$step1X),
	$elm$core$String$reverse);
var $rluiten$stemmer$Stemmer$stem = function (word) {
	return ($elm$core$String$length(word) < 3) ? word : $rluiten$stemmer$Stemmer$allStepsX(word);
};
var $rluiten$elm_text_search$Index$Defaults$defaultStemmerFuncCreator = $rluiten$elm_text_search$Index$Utils$createFuncCreator($rluiten$stemmer$Stemmer$stem);
var $rluiten$elm_text_search$Index$Defaults$defaultTransformFactories = _List_fromArray(
	[$rluiten$elm_text_search$Index$Defaults$defaultStemmerFuncCreator]);
var $rluiten$elm_text_search$Index$Defaults$getDefaultIndexConfig = function (_v0) {
	var indexType = _v0.indexType;
	var ref = _v0.ref;
	var fields = _v0.fields;
	var listFields = _v0.listFields;
	return {fields: fields, filterFactories: $rluiten$elm_text_search$Index$Defaults$defaultFilterFactories, indexType: indexType, initialTransformFactories: $rluiten$elm_text_search$Index$Defaults$defaultInitialTransformFactories, listFields: listFields, ref: ref, transformFactories: $rluiten$elm_text_search$Index$Defaults$defaultTransformFactories};
};
var $rluiten$elm_text_search$Index$Model$Index = function (a) {
	return {$: 'Index', a: a};
};
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $rluiten$elm_text_search$Index$Utils$buildOrderIndex = function (tokenSet) {
	var withIndex = A2(
		$elm$core$List$indexedMap,
		$elm$core$Tuple$pair,
		$elm$core$Set$toList(tokenSet));
	return A3(
		$elm$core$List$foldr,
		F2(
			function (_v0, d) {
				var i = _v0.a;
				var v = _v0.b;
				return A3($elm$core$Dict$insert, v, i, d);
			}),
		$elm$core$Dict$empty,
		withIndex);
};
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $rluiten$elm_text_search$Index$Load$createIndex = function (_v0) {
	var config = _v0.a;
	var decodedIndex = _v0.b;
	return $elm$json$Json$Decode$succeed(
		$rluiten$elm_text_search$Index$Model$Index(
			{
				corpusTokens: decodedIndex.corpusTokens,
				corpusTokensIndex: $rluiten$elm_text_search$Index$Utils$buildOrderIndex(decodedIndex.corpusTokens),
				documentStore: decodedIndex.documentStore,
				fields: config.fields,
				filterFactories: config.filterFactories,
				filters: $elm$core$Maybe$Nothing,
				idfCache: $elm$core$Dict$empty,
				indexType: decodedIndex.indexType,
				indexVersion: decodedIndex.indexVersion,
				initialTransformFactories: config.initialTransformFactories,
				initialTransforms: $elm$core$Maybe$Nothing,
				listFields: config.listFields,
				ref: config.ref,
				tokenStore: decodedIndex.tokenStore,
				transformFactories: config.transformFactories,
				transforms: $elm$core$Maybe$Nothing
			}));
};
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $rluiten$elm_text_search$Index$Model$CodecIndexRecord = F5(
	function (indexVersion, indexType, documentStore, corpusTokens, tokenStore) {
		return {corpusTokens: corpusTokens, documentStore: documentStore, indexType: indexType, indexVersion: indexVersion, tokenStore: tokenStore};
	});
var $rluiten$trie$TrieModel$EmptyTrie = {$: 'EmptyTrie'};
var $rluiten$trie$TrieModel$TrieNode = function (a) {
	return {$: 'TrieNode', a: a};
};
var $rluiten$trie$TrieModel$ValNode = function (a) {
	return {$: 'ValNode', a: a};
};
var $rluiten$trie$TrieModel$ValTrieNode = function (a) {
	return {$: 'ValTrieNode', a: a};
};
var $rluiten$trie$Trie$Json$Decoder$decoderValDict = $elm$json$Json$Decode$dict;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $elm$json$Json$Decode$lazy = function (thunk) {
	return A2(
		$elm$json$Json$Decode$andThen,
		thunk,
		$elm$json$Json$Decode$succeed(_Utils_Tuple0));
};
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $rluiten$trie$Trie$Json$Decoder$decoder = function (valDec) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($rluiten$trie$TrieModel$EmptyTrie),
				$rluiten$trie$Trie$Json$Decoder$decoderTrie(valDec)
			]));
};
var $rluiten$trie$Trie$Json$Decoder$decoderTrie = function (valDec) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$map,
				$rluiten$trie$TrieModel$ValNode,
				$rluiten$trie$Trie$Json$Decoder$decoderValDict(valDec)),
				A2(
				$elm$json$Json$Decode$map,
				$rluiten$trie$TrieModel$TrieNode,
				$elm$json$Json$Decode$lazy(
					function (_v0) {
						return $rluiten$trie$Trie$Json$Decoder$decoderTrieDict(valDec);
					})),
				A2(
				$elm$json$Json$Decode$map,
				$rluiten$trie$TrieModel$ValTrieNode,
				$elm$json$Json$Decode$lazy(
					function (_v1) {
						return $rluiten$trie$Trie$Json$Decoder$decoderValTrieNode(valDec);
					})),
				$elm$json$Json$Decode$fail('Invalid Trie Structure found.')
			]));
};
var $rluiten$trie$Trie$Json$Decoder$decoderTrieDict = function (valDec) {
	return $elm$json$Json$Decode$dict(
		$rluiten$trie$Trie$Json$Decoder$decoder(valDec));
};
var $rluiten$trie$Trie$Json$Decoder$decoderValTrieNode = function (valDec) {
	return A3(
		$elm$json$Json$Decode$map2,
		$elm$core$Tuple$pair,
		A2(
			$elm$json$Json$Decode$index,
			0,
			$rluiten$trie$Trie$Json$Decoder$decoderValDict(valDec)),
		A2(
			$elm$json$Json$Decode$index,
			1,
			$rluiten$trie$Trie$Json$Decoder$decoderTrieDict(valDec)));
};
var $rluiten$elm_text_search$ElmTextSearch$Json$Decoder$setDecoder = A2(
	$elm$json$Json$Decode$map,
	$elm$core$Set$fromList,
	$elm$json$Json$Decode$list($elm$json$Json$Decode$string));
var $rluiten$elm_text_search$ElmTextSearch$Json$Decoder$documentStoreDecoder = $elm$json$Json$Decode$dict($rluiten$elm_text_search$ElmTextSearch$Json$Decoder$setDecoder);
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $rluiten$elm_text_search$ElmTextSearch$Json$Decoder$decoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'tokenStore',
	$rluiten$trie$Trie$Json$Decoder$decoder($elm$json$Json$Decode$float),
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'corpusTokens',
		$rluiten$elm_text_search$ElmTextSearch$Json$Decoder$setDecoder,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'documentStore',
			$rluiten$elm_text_search$ElmTextSearch$Json$Decoder$documentStoreDecoder,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'indexType',
				$elm$json$Json$Decode$string,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'indexVersion',
					$elm$json$Json$Decode$string,
					$elm$json$Json$Decode$succeed($rluiten$elm_text_search$Index$Model$CodecIndexRecord))))));
var $rluiten$elm_text_search$Index$Load$errorPrefix = 'Error cannot load Index.';
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $rluiten$elm_text_search$Index$Defaults$indexVersion = '1.1.0';
var $elm$core$Basics$neq = _Utils_notEqual;
var $rluiten$elm_text_search$Index$Load$mapIndexConfig = F2(
	function (supportedIndexConfigs, index) {
		if (!_Utils_eq($rluiten$elm_text_search$Index$Defaults$indexVersion, index.indexVersion)) {
			return $elm$json$Json$Decode$fail($rluiten$elm_text_search$Index$Load$errorPrefix + (' Version supported is ' + ($rluiten$elm_text_search$Index$Defaults$indexVersion + ('. Version tried to load is ' + (index.indexVersion + '.')))));
		} else {
			var config = A2(
				$elm$core$List$filter,
				function (cfg) {
					return _Utils_eq(cfg.indexType, index.indexType);
				},
				supportedIndexConfigs);
			if (!config.b) {
				return $elm$json$Json$Decode$fail($rluiten$elm_text_search$Index$Load$errorPrefix + (' Tried to load index of type \"' + (index.indexType + '\". It is not in supported index configurations.')));
			} else {
				var matchedConfig = config.a;
				return $elm$json$Json$Decode$succeed(
					_Utils_Tuple2(matchedConfig, index));
			}
		}
	});
var $rluiten$elm_text_search$Index$Load$loadIndexValueWith = F2(
	function (supportedIndexConfigs, inputValue) {
		return A2(
			$elm$json$Json$Decode$decodeValue,
			A2(
				$elm$json$Json$Decode$andThen,
				$rluiten$elm_text_search$Index$Load$createIndex,
				A2(
					$elm$json$Json$Decode$andThen,
					$rluiten$elm_text_search$Index$Load$mapIndexConfig(supportedIndexConfigs),
					$rluiten$elm_text_search$ElmTextSearch$Json$Decoder$decoder)),
			inputValue);
	});
var $rluiten$elm_text_search$Index$Load$loadIndexValue = F2(
	function (simpleConfig, inputValue) {
		return A2(
			$rluiten$elm_text_search$Index$Load$loadIndexValueWith,
			_List_fromArray(
				[
					$rluiten$elm_text_search$Index$Defaults$getDefaultIndexConfig(simpleConfig)
				]),
			inputValue);
	});
var $rluiten$elm_text_search$ElmTextSearch$fromValue = F2(
	function (simpleConfig, inputValue) {
		return A2(
			$rluiten$elm_text_search$Index$Load$loadIndexValue,
			$rluiten$elm_text_search$Index$Defaults$getIndexSimpleConfig(simpleConfig),
			inputValue);
	});
var $author$project$Search$indexConfig = {
	fields: _List_fromArray(
		[
			_Utils_Tuple2(
			function ($) {
				return $.name;
			},
			4.0),
			_Utils_Tuple2(
			function ($) {
				return $.source;
			},
			2.0),
			_Utils_Tuple2(
			function ($) {
				return $.description;
			},
			1.0)
		]),
	listFields: _List_fromArray(
		[
			_Utils_Tuple2(
			function ($) {
				return $.sets;
			},
			3.0)
		]),
	ref: function ($) {
		return $.hash;
	}
};
var $author$project$Search$loadIndex = function (value) {
	var _v0 = A2($rluiten$elm_text_search$ElmTextSearch$fromValue, $author$project$Search$indexConfig, value);
	if (_v0.$ === 'Ok') {
		var index = _v0.a;
		return $elm$core$Maybe$Just(index);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Search$decodeStoredData = A2(
	$elm$json$Json$Decode$field,
	$author$project$Const$dataVersion,
	A4(
		$elm$json$Json$Decode$map3,
		$author$project$Search$StoredData,
		A2($elm$json$Json$Decode$field, 'version', $elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$field,
			'data',
			$elm$json$Json$Decode$dict($author$project$ApiModel$decodeItem)),
		A2(
			$elm$json$Json$Decode$map,
			$author$project$Search$loadIndex,
			A2($elm$json$Json$Decode$field, 'index', $elm$json$Json$Decode$value))));
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $author$project$Shared$do = function (msg) {
	return A2(
		$elm$core$Task$perform,
		function (_v0) {
			return msg;
		},
		$elm$core$Task$succeed(_Utils_Tuple0));
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$ApiModel$encodeItem = function (item) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'hash',
				$elm$json$Json$Encode$string(item.hash)),
				_Utils_Tuple2(
				'name',
				$elm$json$Json$Encode$string(item.name)),
				_Utils_Tuple2(
				'icon',
				$elm$json$Json$Encode$string(item.icon)),
				_Utils_Tuple2(
				'screenshot',
				$elm$json$Json$Encode$string(item.screenshot)),
				_Utils_Tuple2(
				'description',
				$elm$json$Json$Encode$string(item.description)),
				_Utils_Tuple2(
				'classType',
				$elm$json$Json$Encode$int(item.classType)),
				_Utils_Tuple2(
				'source',
				$elm$json$Json$Encode$string(item.source)),
				_Utils_Tuple2(
				'sets',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, item.sets))
			]));
};
var $author$project$Shared$encodeInPortData = function (d) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		$elm$json$Json$Encode$object(
			function () {
				switch (d.$) {
					case 'PortError':
						var s = d.a;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'PortError',
								$elm$json$Json$Encode$string(s))
							]);
					case 'Status':
						var message = d.a;
						var ready = d.b;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'Status',
								$elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'message',
											$elm$json$Json$Encode$string(message)),
											_Utils_Tuple2(
											'ready',
											$elm$json$Json$Encode$bool(ready))
										])))
							]);
					default:
						var b = d.a;
						var items = d.b;
						var sets = d.c;
						return _List_fromArray(
							[
								_Utils_Tuple2(
								'Results',
								$elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'validSearch',
											$elm$json$Json$Encode$bool(b)),
											_Utils_Tuple2(
											'items',
											A2($elm$json$Json$Encode$list, $author$project$ApiModel$encodeItem, items)),
											_Utils_Tuple2(
											'sets',
											A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, sets))
										])))
							]);
				}
			}()));
};
var $author$project$Search$sendPort = _Platform_outgoingPort('sendPort', $elm$json$Json$Encode$string);
var $author$project$Search$init = function (fs) {
	return _Utils_Tuple2(
		A6($author$project$Search$Model, $author$project$Search$Loading, fs.permission, '', $author$project$Shared$None, _List_Nil, _List_Nil),
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					$author$project$Search$sendPort(
					$author$project$Shared$encodeInPortData(
						A2($author$project$Shared$Status, 'Checking Local Data', false))),
					$author$project$Shared$do(
					$author$project$Search$GetManifest(
						function () {
							var _v0 = fs.data;
							if (_v0.$ === 'Just') {
								var str = _v0.a;
								var _v1 = A2($elm$json$Json$Decode$decodeString, $author$project$Search$decodeStoredData, str);
								if (_v1.$ === 'Ok') {
									var d = _v1.a;
									return $elm$core$Maybe$Just(d);
								} else {
									return $elm$core$Maybe$Nothing;
								}
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}()))
				])));
};
var $author$project$Search$GotPortMessage = function (a) {
	return {$: 'GotPortMessage', a: a};
};
var $author$project$Search$recvPort = _Platform_incomingPort('recvPort', $elm$json$Json$Decode$string);
var $author$project$Search$subscriptions = function (_v0) {
	return $author$project$Search$recvPort($author$project$Search$GotPortMessage);
};
var $author$project$Search$DoFilter = {$: 'DoFilter'};
var $author$project$Search$DoSearch = {$: 'DoSearch'};
var $author$project$Search$Error = {$: 'Error'};
var $author$project$Search$FinishedLoading = F3(
	function (a, b, c) {
		return {$: 'FinishedLoading', a: a, b: b, c: c};
	});
var $author$project$Search$GotCollectibleData = F2(
	function (a, b) {
		return {$: 'GotCollectibleData', a: a, b: b};
	});
var $author$project$Search$GotError = function (a) {
	return {$: 'GotError', a: a};
};
var $author$project$Search$GotItemData = F2(
	function (a, b) {
		return {$: 'GotItemData', a: a, b: b};
	});
var $author$project$Search$GotManifest = F2(
	function (a, b) {
		return {$: 'GotManifest', a: a, b: b};
	});
var $author$project$Search$GotPresNodeData = F2(
	function (a, b) {
		return {$: 'GotPresNodeData', a: a, b: b};
	});
var $author$project$Search$IndexData = F2(
	function (a, b) {
		return {$: 'IndexData', a: a, b: b};
	});
var $author$project$Shared$PortError = function (a) {
	return {$: 'PortError', a: a};
};
var $author$project$Search$Ready = F3(
	function (a, b, c) {
		return {$: 'Ready', a: a, b: b, c: c};
	});
var $author$project$Shared$Results = F3(
	function (a, b, c) {
		return {$: 'Results', a: a, b: b, c: c};
	});
var $author$project$Search$SaveData = {$: 'SaveData'};
var $author$project$Search$SendResults = function (a) {
	return {$: 'SendResults', a: a};
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $rluiten$trie$TrieModel$addByStr = F3(
	function (_v0, key, trie) {
		var ref = _v0.a;
		var value = _v0.b;
		if (!key.b) {
			switch (trie.$) {
				case 'EmptyTrie':
					return $rluiten$trie$TrieModel$ValNode(
						A2($elm$core$Dict$singleton, ref, value));
				case 'ValNode':
					var refValues = trie.a;
					return $rluiten$trie$TrieModel$ValNode(
						A3($elm$core$Dict$insert, ref, value, refValues));
				case 'TrieNode':
					var trieDict = trie.a;
					return $rluiten$trie$TrieModel$ValTrieNode(
						_Utils_Tuple2(
							A2($elm$core$Dict$singleton, ref, value),
							trieDict));
				default:
					var _v3 = trie.a;
					var refValues = _v3.a;
					var trieDict = _v3.b;
					return $rluiten$trie$TrieModel$ValTrieNode(
						_Utils_Tuple2(
							A3($elm$core$Dict$insert, ref, value, refValues),
							trieDict));
			}
		} else {
			var keyHead = key.a;
			var keyTail = key.b;
			var updateTrieDict = function (trieDict) {
				var updatedSubTrie = A3(
					$rluiten$trie$TrieModel$addByStr,
					_Utils_Tuple2(ref, value),
					keyTail,
					A2(
						$elm$core$Maybe$withDefault,
						$rluiten$trie$TrieModel$EmptyTrie,
						A2($elm$core$Dict$get, keyHead, trieDict)));
				return A3($elm$core$Dict$insert, keyHead, updatedSubTrie, trieDict);
			};
			var lazyNewTrieDict = function (_v6) {
				return A2(
					$elm$core$Dict$singleton,
					keyHead,
					A3(
						$rluiten$trie$TrieModel$addByStr,
						_Utils_Tuple2(ref, value),
						keyTail,
						$rluiten$trie$TrieModel$EmptyTrie));
			};
			switch (trie.$) {
				case 'EmptyTrie':
					return $rluiten$trie$TrieModel$TrieNode(
						lazyNewTrieDict(_Utils_Tuple0));
				case 'ValNode':
					var refValues = trie.a;
					return $rluiten$trie$TrieModel$ValTrieNode(
						_Utils_Tuple2(
							refValues,
							lazyNewTrieDict(_Utils_Tuple0)));
				case 'TrieNode':
					var trieDict = trie.a;
					return $rluiten$trie$TrieModel$TrieNode(
						updateTrieDict(trieDict));
				default:
					var _v5 = trie.a;
					var refValues = _v5.a;
					var trieDict = _v5.b;
					return $rluiten$trie$TrieModel$ValTrieNode(
						_Utils_Tuple2(
							refValues,
							updateTrieDict(trieDict)));
			}
		}
	});
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $rluiten$trie$TrieModel$toListString = function (str) {
	return A2(
		$elm$core$List$map,
		function (c) {
			return $elm$core$String$fromChar(c);
		},
		$elm$core$String$toList(str));
};
var $rluiten$trie$TrieModel$add = F3(
	function (refValues, key, trie) {
		return A3(
			$rluiten$trie$TrieModel$addByStr,
			refValues,
			$rluiten$trie$TrieModel$toListString(key),
			trie);
	});
var $rluiten$trie$Trie$add = $rluiten$trie$TrieModel$add;
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Set$isEmpty = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$isEmpty(dict);
};
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $elm$core$Set$size = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$size(dict);
};
var $rluiten$elm_text_search$Index$scoreToken = F2(
	function (fieldTokensAndBoost, token) {
		var score = F2(
			function (_v0, scoreSum) {
				var tokenSet = _v0.a;
				var fieldBoost = _v0.b;
				if ($elm$core$Set$isEmpty(tokenSet)) {
					return scoreSum;
				} else {
					var tokenBoost = A2($elm$core$Set$member, token, tokenSet) ? (fieldBoost / $elm$core$Set$size(tokenSet)) : 0;
					return scoreSum + tokenBoost;
				}
			});
		return _Utils_Tuple2(
			token,
			A3($elm$core$List$foldr, score, 0, fieldTokensAndBoost));
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$core$Set$union = F2(
	function (_v0, _v1) {
		var dict1 = _v0.a;
		var dict2 = _v1.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$union, dict1, dict2));
	});
var $rluiten$elm_text_search$Index$addDoc = F4(
	function (docRef, fieldsTokens, docTokens, index) {
		var irec = index.a;
		var updatedDocumentStore = A3($elm$core$Dict$insert, docRef, docTokens, irec.documentStore);
		var updatedCorpusTokens = A2($elm$core$Set$union, irec.corpusTokens, docTokens);
		var updatedCorpusTokensIndex = $rluiten$elm_text_search$Index$Utils$buildOrderIndex(updatedCorpusTokens);
		var allBoosts = A2(
			$elm$core$List$append,
			A2($elm$core$List$map, $elm$core$Tuple$second, irec.listFields),
			A2($elm$core$List$map, $elm$core$Tuple$second, irec.fields));
		var fieldTokensAndBoosts = A3($elm$core$List$map2, $elm$core$Tuple$pair, fieldsTokens, allBoosts);
		var tokenAndScores = A2(
			$elm$core$List$map,
			$rluiten$elm_text_search$Index$scoreToken(fieldTokensAndBoosts),
			$elm$core$Set$toList(docTokens));
		var addTokenScore = F2(
			function (_v0, trie) {
				var token = _v0.a;
				var score = _v0.b;
				return A3(
					$rluiten$trie$Trie$add,
					_Utils_Tuple2(docRef, score),
					token,
					trie);
			});
		var updatedTokenStore = A3($elm$core$List$foldr, addTokenScore, irec.tokenStore, tokenAndScores);
		return $rluiten$elm_text_search$Index$Model$Index(
			_Utils_update(
				irec,
				{corpusTokens: updatedCorpusTokens, corpusTokensIndex: updatedCorpusTokensIndex, documentStore: updatedDocumentStore, idfCache: $elm$core$Dict$empty, tokenStore: updatedTokenStore}));
	});
var $rluiten$elm_text_search$Index$Utils$applyFilterList = F2(
	function (filters, token) {
		applyFilterList:
		while (true) {
			if (!filters.b) {
				return true;
			} else {
				var filterFunc = filters.a;
				var restFilters = filters.b;
				if (token === '') {
					return false;
				} else {
					var _v2 = filterFunc(token);
					if (!_v2) {
						return false;
					} else {
						var $temp$filters = restFilters,
							$temp$token = token;
						filters = $temp$filters;
						token = $temp$token;
						continue applyFilterList;
					}
				}
			}
		}
	});
var $rluiten$elm_text_search$Index$Utils$runFactories = F2(
	function (factoryList, index) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (factory, _v0) {
					var u1index = _v0.a;
					var funcList = _v0.b;
					var _v1 = factory(u1index);
					var u2index = _v1.a;
					var newFunc = _v1.b;
					return _Utils_Tuple2(
						u2index,
						A2($elm$core$List$cons, newFunc, funcList));
				}),
			_Utils_Tuple2(index, _List_Nil),
			factoryList);
	});
var $rluiten$elm_text_search$Index$Utils$getOrSetIndexFuncList = F4(
	function (getFuncs, getFactoryFuncs, setFuncs, index) {
		var _v0 = getFuncs(index);
		if (_v0.$ === 'Just') {
			var funcList = _v0.a;
			return _Utils_Tuple2(index, funcList);
		} else {
			var _v1 = A2(
				$rluiten$elm_text_search$Index$Utils$runFactories,
				getFactoryFuncs(index),
				index);
			var u1index = _v1.a;
			var newFuncList = _v1.b;
			var u2index = A2(setFuncs, u1index, newFuncList);
			return _Utils_Tuple2(u2index, newFuncList);
		}
	});
var $rluiten$elm_text_search$Index$Utils$setIndexFilters = F2(
	function (_v0, listFuncs) {
		var irec = _v0.a;
		return $rluiten$elm_text_search$Index$Model$Index(
			_Utils_update(
				irec,
				{
					filters: $elm$core$Maybe$Just(listFuncs)
				}));
	});
var $rluiten$elm_text_search$Index$Utils$getOrSetFilterList = function (index) {
	return A4(
		$rluiten$elm_text_search$Index$Utils$getOrSetIndexFuncList,
		function (_v0) {
			var irec = _v0.a;
			return irec.filters;
		},
		function (_v1) {
			var irec = _v1.a;
			return irec.filterFactories;
		},
		$rluiten$elm_text_search$Index$Utils$setIndexFilters,
		index);
};
var $rluiten$elm_text_search$Index$Utils$applyFilter = F2(
	function (index, strings) {
		var _v0 = $rluiten$elm_text_search$Index$Utils$getOrSetFilterList(index);
		var u1index = _v0.a;
		var filterList = _v0.b;
		return _Utils_Tuple2(
			u1index,
			A2(
				$elm$core$List$filter,
				$rluiten$elm_text_search$Index$Utils$applyFilterList(filterList),
				strings));
	});
var $rluiten$elm_text_search$Index$Utils$applyTransformList = F2(
	function (transforms, token) {
		applyTransformList:
		while (true) {
			if (!transforms.b) {
				return token;
			} else {
				var transform = transforms.a;
				var restTransforms = transforms.b;
				var newToken = transform(token);
				if (newToken === '') {
					return '';
				} else {
					var $temp$transforms = restTransforms,
						$temp$token = newToken;
					transforms = $temp$transforms;
					token = $temp$token;
					continue applyTransformList;
				}
			}
		}
	});
var $rluiten$elm_text_search$Index$Utils$setIndexInitialTransforms = F2(
	function (_v0, listFuncs) {
		var irec = _v0.a;
		return $rluiten$elm_text_search$Index$Model$Index(
			_Utils_update(
				irec,
				{
					initialTransforms: $elm$core$Maybe$Just(listFuncs)
				}));
	});
var $rluiten$elm_text_search$Index$Utils$getOrSetInitialTransformList = function (index) {
	return A4(
		$rluiten$elm_text_search$Index$Utils$getOrSetIndexFuncList,
		function (_v0) {
			var irec = _v0.a;
			return irec.initialTransforms;
		},
		function (_v1) {
			var irec = _v1.a;
			return irec.initialTransformFactories;
		},
		$rluiten$elm_text_search$Index$Utils$setIndexInitialTransforms,
		index);
};
var $rluiten$elm_text_search$Index$Utils$applyInitialTransform = F2(
	function (index, strings) {
		var _v0 = $rluiten$elm_text_search$Index$Utils$getOrSetInitialTransformList(index);
		var u1index = _v0.a;
		var intitialTransformList = _v0.b;
		return _Utils_Tuple2(
			u1index,
			A2(
				$elm$core$List$filter,
				function (val) {
					return val !== '';
				},
				A2(
					$elm$core$List$map,
					$rluiten$elm_text_search$Index$Utils$applyTransformList(intitialTransformList),
					strings)));
	});
var $rluiten$elm_text_search$Index$Utils$setIndexTransforms = F2(
	function (_v0, listFuncs) {
		var irec = _v0.a;
		return $rluiten$elm_text_search$Index$Model$Index(
			_Utils_update(
				irec,
				{
					transforms: $elm$core$Maybe$Just(listFuncs)
				}));
	});
var $rluiten$elm_text_search$Index$Utils$getOrSetTransformList = function (index) {
	return A4(
		$rluiten$elm_text_search$Index$Utils$getOrSetIndexFuncList,
		function (_v0) {
			var irec = _v0.a;
			return irec.transforms;
		},
		function (_v1) {
			var irec = _v1.a;
			return irec.transformFactories;
		},
		$rluiten$elm_text_search$Index$Utils$setIndexTransforms,
		index);
};
var $rluiten$elm_text_search$Index$Utils$applyTransform = F2(
	function (index, strings) {
		var _v0 = $rluiten$elm_text_search$Index$Utils$getOrSetTransformList(index);
		var u1index = _v0.a;
		var transformList = _v0.b;
		return _Utils_Tuple2(
			u1index,
			A2(
				$elm$core$List$filter,
				function (val) {
					return val !== '';
				},
				A2(
					$elm$core$List$map,
					$rluiten$elm_text_search$Index$Utils$applyTransformList(transformList),
					strings)));
	});
var $rluiten$elm_text_search$Index$Utils$processTokens = F2(
	function (index, tokens) {
		var _v0 = A2($rluiten$elm_text_search$Index$Utils$applyInitialTransform, index, tokens);
		var u1index = _v0.a;
		var initialTransformTokens = _v0.b;
		var _v1 = A2($rluiten$elm_text_search$Index$Utils$applyFilter, u1index, initialTransformTokens);
		var u2index = _v1.a;
		var filterTokens = _v1.b;
		return A2($rluiten$elm_text_search$Index$Utils$applyTransform, u2index, filterTokens);
	});
var $rluiten$elm_text_search$TokenProcessors$defaultSeparator = $rluiten$elm_text_search$TokenProcessors$forceRegex('[\\s\\-]+');
var $elm$regex$Regex$split = _Regex_splitAtMost(_Regex_infinity);
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$trim = _String_trim;
var $rluiten$elm_text_search$TokenProcessors$tokenizerWithRegex = F2(
	function (seperatorRegex, data) {
		var splitter = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$elm$regex$Regex$split(seperatorRegex),
				$elm$core$String$toLower),
			$elm$core$String$trim);
		return A2(
			$elm$core$List$filter,
			function (token) {
				return $elm$core$String$length(token) > 0;
			},
			splitter(data));
	});
var $rluiten$elm_text_search$TokenProcessors$tokenizer = $rluiten$elm_text_search$TokenProcessors$tokenizerWithRegex($rluiten$elm_text_search$TokenProcessors$defaultSeparator);
var $rluiten$elm_text_search$Index$Utils$getTokens = F2(
	function (index, string) {
		return A2(
			$rluiten$elm_text_search$Index$Utils$processTokens,
			index,
			$rluiten$elm_text_search$TokenProcessors$tokenizer(string));
	});
var $rluiten$elm_text_search$Index$getWordsForField = F3(
	function (doc, getField, _v0) {
		var index = _v0.a;
		var fieldsLists = _v0.b;
		var _v1 = A2(
			$rluiten$elm_text_search$Index$Utils$getTokens,
			index,
			getField(doc));
		var u1index = _v1.a;
		var tokens = _v1.b;
		return _Utils_Tuple2(
			u1index,
			A2($elm$core$List$cons, tokens, fieldsLists));
	});
var $rluiten$elm_text_search$TokenProcessors$tokenizerWithRegexList = F2(
	function (seperatorRegex, listData) {
		var splitter = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$elm$regex$Regex$split(seperatorRegex),
				$elm$core$String$toLower),
			$elm$core$String$trim);
		var tokens = A3(
			$elm$core$List$foldr,
			F2(
				function (str, agg) {
					return A2(
						$elm$core$List$append,
						agg,
						splitter(str));
				}),
			_List_Nil,
			listData);
		return A2(
			$elm$core$List$filter,
			function (token) {
				return $elm$core$String$length(token) > 0;
			},
			tokens);
	});
var $rluiten$elm_text_search$TokenProcessors$tokenizerList = $rluiten$elm_text_search$TokenProcessors$tokenizerWithRegexList($rluiten$elm_text_search$TokenProcessors$defaultSeparator);
var $rluiten$elm_text_search$Index$Utils$getTokensList = F2(
	function (index, listString) {
		return A2(
			$rluiten$elm_text_search$Index$Utils$processTokens,
			index,
			$rluiten$elm_text_search$TokenProcessors$tokenizerList(listString));
	});
var $rluiten$elm_text_search$Index$getWordsForFieldList = F3(
	function (doc, getFieldList, _v0) {
		var index = _v0.a;
		var fieldsLists = _v0.b;
		var _v1 = A2(
			$rluiten$elm_text_search$Index$Utils$getTokensList,
			index,
			getFieldList(doc));
		var u1index = _v1.a;
		var tokens = _v1.b;
		return _Utils_Tuple2(
			u1index,
			A2($elm$core$List$cons, tokens, fieldsLists));
	});
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $rluiten$elm_text_search$Index$Utils$refExists = F2(
	function (docRef, _v0) {
		var irec = _v0.a;
		return A2($elm$core$Dict$member, docRef, irec.documentStore);
	});
var $rluiten$elm_text_search$Index$add = F2(
	function (doc, index) {
		var irec = index.a;
		var docRef = irec.ref(doc);
		if ($elm$core$String$isEmpty(docRef)) {
			return $elm$core$Result$Err('Error document has an empty unique id (ref).');
		} else {
			if (A2($rluiten$elm_text_search$Index$Utils$refExists, docRef, index)) {
				return $elm$core$Result$Err('Error adding document that allready exists.');
			} else {
				var _v0 = A3(
					$elm$core$List$foldr,
					$rluiten$elm_text_search$Index$getWordsForField(doc),
					_Utils_Tuple2(index, _List_Nil),
					A2($elm$core$List$map, $elm$core$Tuple$first, irec.fields));
				var u1index = _v0.a;
				var fieldsWordList = _v0.b;
				var _v1 = A3(
					$elm$core$List$foldr,
					$rluiten$elm_text_search$Index$getWordsForFieldList(doc),
					_Utils_Tuple2(u1index, fieldsWordList),
					A2($elm$core$List$map, $elm$core$Tuple$first, irec.listFields));
				var u2index = _v1.a;
				var u2fieldsWordList = _v1.b;
				var fieldsTokens = A2($elm$core$List$map, $elm$core$Set$fromList, u2fieldsWordList);
				var docTokens = A3($elm$core$List$foldr, $elm$core$Set$union, $elm$core$Set$empty, fieldsTokens);
				return $elm$core$Set$isEmpty(docTokens) ? $elm$core$Result$Err('Error after tokenisation there are no terms to index.') : $elm$core$Result$Ok(
					A4($rluiten$elm_text_search$Index$addDoc, docRef, fieldsTokens, docTokens, u2index));
			}
		}
	});
var $rluiten$elm_text_search$ElmTextSearch$add = $rluiten$elm_text_search$Index$add;
var $author$project$Search$foldData = F3(
	function (_v0, item, index) {
		var r = A2($rluiten$elm_text_search$ElmTextSearch$add, item, index);
		if (r.$ === 'Ok') {
			var i = r.a;
			return i;
		} else {
			return index;
		}
	});
var $rluiten$trie$TrieModel$empty = $rluiten$trie$TrieModel$EmptyTrie;
var $rluiten$trie$Trie$empty = $rluiten$trie$TrieModel$empty;
var $rluiten$elm_text_search$Index$newWith = function (_v0) {
	var indexType = _v0.indexType;
	var ref = _v0.ref;
	var fields = _v0.fields;
	var listFields = _v0.listFields;
	var initialTransformFactories = _v0.initialTransformFactories;
	var transformFactories = _v0.transformFactories;
	var filterFactories = _v0.filterFactories;
	return $rluiten$elm_text_search$Index$Model$Index(
		{corpusTokens: $elm$core$Set$empty, corpusTokensIndex: $elm$core$Dict$empty, documentStore: $elm$core$Dict$empty, fields: fields, filterFactories: filterFactories, filters: $elm$core$Maybe$Nothing, idfCache: $elm$core$Dict$empty, indexType: indexType, indexVersion: $rluiten$elm_text_search$Index$Defaults$indexVersion, initialTransformFactories: initialTransformFactories, initialTransforms: $elm$core$Maybe$Nothing, listFields: listFields, ref: ref, tokenStore: $rluiten$trie$Trie$empty, transformFactories: transformFactories, transforms: $elm$core$Maybe$Nothing});
};
var $rluiten$elm_text_search$Index$new = function (simpleConfig) {
	return $rluiten$elm_text_search$Index$newWith(
		$rluiten$elm_text_search$Index$Defaults$getDefaultIndexConfig(simpleConfig));
};
var $rluiten$elm_text_search$ElmTextSearch$new = function (simpleConfig) {
	return $rluiten$elm_text_search$Index$new(
		$rluiten$elm_text_search$Index$Defaults$getIndexSimpleConfig(simpleConfig));
};
var $author$project$Search$createIndex = function (data) {
	return A3(
		$elm$core$Dict$foldl,
		$author$project$Search$foldData,
		$rluiten$elm_text_search$ElmTextSearch$new($author$project$Search$indexConfig),
		data);
};
var $author$project$ApiModel$RawCollectible = F2(
	function (parentHashes, source) {
		return {parentHashes: parentHashes, source: source};
	});
var $author$project$ApiModel$decodeRawCollectible = A3(
	$elm$json$Json$Decode$map2,
	$author$project$ApiModel$RawCollectible,
	A2(
		$elm$json$Json$Decode$field,
		'parentNodeHashes',
		$elm$json$Json$Decode$list(
			A2($elm$json$Json$Decode$map, $elm$core$String$fromInt, $elm$json$Json$Decode$int))),
	A2($elm$json$Json$Decode$field, 'sourceString', $elm$json$Json$Decode$string));
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $author$project$ApiModel$foldPresNodes = F3(
	function (pdict, hash, l) {
		var _v0 = A2($elm$core$Dict$get, hash, pdict);
		if (_v0.$ === 'Just') {
			var pnode = _v0.a;
			return A2($elm$core$List$cons, pnode, l);
		} else {
			return l;
		}
	});
var $author$project$ApiModel$resolveCollectible = F4(
	function (pdict, hash, mrc, accumulator) {
		if (mrc.$ === 'Just') {
			var rc = mrc.a;
			return A3(
				$elm$core$Dict$insert,
				hash,
				{
					parents: A3(
						$elm$core$List$foldl,
						$author$project$ApiModel$foldPresNodes(pdict),
						_List_Nil,
						rc.parentHashes),
					source: rc.source
				},
				accumulator);
		} else {
			return accumulator;
		}
	});
var $author$project$ApiModel$resolveCollectibles = F2(
	function (pdict, rcdict) {
		return A3(
			$elm$core$Dict$foldl,
			$author$project$ApiModel$resolveCollectible(pdict),
			$elm$core$Dict$empty,
			rcdict);
	});
var $author$project$ApiModel$decodeCollectibles = function (pdict) {
	return A2(
		$elm$json$Json$Decode$map,
		$author$project$ApiModel$resolveCollectibles(pdict),
		$elm$json$Json$Decode$dict(
			$elm$json$Json$Decode$maybe($author$project$ApiModel$decodeRawCollectible)));
};
var $author$project$ApiModel$RawItem = F6(
	function (name, icon, screenshot, description, classType, collectibleHash) {
		return {classType: classType, collectibleHash: collectibleHash, description: description, icon: icon, name: name, screenshot: screenshot};
	});
var $elm$json$Json$Decode$map6 = _Json_map6;
var $author$project$ApiModel$decodeRawItem = A7(
	$elm$json$Json$Decode$map6,
	$author$project$ApiModel$RawItem,
	A2(
		$elm$json$Json$Decode$field,
		'displayProperties',
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'displayProperties',
		$elm$json$Json$Decode$maybe(
			A2($elm$json$Json$Decode$field, 'icon', $elm$json$Json$Decode$string))),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'screenshot', $elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'displayProperties',
		$elm$json$Json$Decode$maybe(
			A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string))),
	A2($elm$json$Json$Decode$field, 'classType', $elm$json$Json$Decode$int),
	$elm$json$Json$Decode$maybe(
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$String$fromInt,
			A2($elm$json$Json$Decode$field, 'collectibleHash', $elm$json$Json$Decode$int))));
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$ApiModel$getCollectible = F2(
	function (cdict, ms) {
		return A2(
			$elm$core$Maybe$andThen,
			function (s) {
				return A2($elm$core$Dict$get, s, cdict);
			},
			ms);
	});
var $author$project$ApiModel$resolveItem = F4(
	function (cdict, hash, item, accumulator) {
		var _v0 = _Utils_Tuple3(item.icon, item.screenshot, item.description);
		if (((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) && (_v0.c.$ === 'Just')) {
			var icon = _v0.a.a;
			var screenshot = _v0.b.a;
			var description = _v0.c.a;
			var _v1 = A2($author$project$ApiModel$getCollectible, cdict, item.collectibleHash);
			if (_v1.$ === 'Just') {
				var collectible = _v1.a;
				return A3(
					$elm$core$Dict$insert,
					hash,
					{classType: item.classType, description: description, hash: hash, icon: icon, name: item.name, screenshot: screenshot, sets: collectible.parents, source: collectible.source},
					accumulator);
			} else {
				return accumulator;
			}
		} else {
			return accumulator;
		}
	});
var $author$project$ApiModel$resolveItems = F2(
	function (cdict, ridict) {
		return A3(
			$elm$core$Dict$foldl,
			$author$project$ApiModel$resolveItem(cdict),
			$elm$core$Dict$empty,
			ridict);
	});
var $author$project$ApiModel$decodeItems = function (cdict) {
	return A2(
		$elm$json$Json$Decode$map,
		$author$project$ApiModel$resolveItems(cdict),
		$elm$json$Json$Decode$dict($author$project$ApiModel$decodeRawItem));
};
var $author$project$ApiModel$Manifest = F4(
	function (version, presNodeUrl, collectibleUrl, itemDefUrl) {
		return {collectibleUrl: collectibleUrl, itemDefUrl: itemDefUrl, presNodeUrl: presNodeUrl, version: version};
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$map4 = _Json_map4;
var $author$project$ApiModel$decodeManifest = A2(
	$elm$json$Json$Decode$field,
	'Response',
	A5(
		$elm$json$Json$Decode$map4,
		$author$project$ApiModel$Manifest,
		A2($elm$json$Json$Decode$field, 'version', $elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['jsonWorldComponentContentPaths', 'en', 'DestinyPresentationNodeDefinition']),
			$elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['jsonWorldComponentContentPaths', 'en', 'DestinyCollectibleDefinition']),
			$elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['jsonWorldComponentContentPaths', 'en', 'DestinyInventoryItemDefinition']),
			$elm$json$Json$Decode$string)));
var $author$project$Shared$AllowStorage = function (a) {
	return {$: 'AllowStorage', a: a};
};
var $author$project$Shared$Filter = function (a) {
	return {$: 'Filter', a: a};
};
var $author$project$Shared$Query = function (a) {
	return {$: 'Query', a: a};
};
var $author$project$Shared$Hunter = {$: 'Hunter'};
var $author$project$Shared$Titan = {$: 'Titan'};
var $author$project$Shared$Warlock = {$: 'Warlock'};
var $author$project$Shared$ifilterStr = function (s) {
	switch (s) {
		case 'Hunter':
			return $author$project$Shared$Hunter;
		case 'Warlock':
			return $author$project$Shared$Warlock;
		case 'Titan':
			return $author$project$Shared$Titan;
		default:
			return $author$project$Shared$None;
	}
};
var $author$project$Shared$decodeOutPortData = function (s) {
	return A2(
		$elm$json$Json$Decode$decodeString,
		$elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$field,
					'Query',
					A2(
						$elm$json$Json$Decode$map,
						$author$project$Shared$Query,
						A2($elm$json$Json$Decode$field, 'string', $elm$json$Json$Decode$string))),
					A2(
					$elm$json$Json$Decode$field,
					'Filter',
					A2(
						$elm$json$Json$Decode$map,
						$author$project$Shared$Filter,
						A2($elm$json$Json$Decode$map, $author$project$Shared$ifilterStr, $elm$json$Json$Decode$string))),
					A2(
					$elm$json$Json$Decode$field,
					'AllowStorage',
					A2($elm$json$Json$Decode$map, $author$project$Shared$AllowStorage, $elm$json$Json$Decode$bool))
				])),
		s);
};
var $author$project$ApiModel$decodeRawPresNode = A2(
	$elm$json$Json$Decode$field,
	'displayProperties',
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string)));
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$ApiModel$setBlackList = _List_fromArray(
	['Hunter', 'Warlock', 'Titan']);
var $author$project$ApiModel$resolvePresNode = F3(
	function (hash, rp, accumulator) {
		if (rp.$ === 'Just') {
			var p = rp.a;
			return (!A2($elm$core$List$member, p, $author$project$ApiModel$setBlackList)) ? A3($elm$core$Dict$insert, hash, p, accumulator) : accumulator;
		} else {
			return accumulator;
		}
	});
var $author$project$ApiModel$resolvePresNodes = function (rpdict) {
	return A3($elm$core$Dict$foldl, $author$project$ApiModel$resolvePresNode, $elm$core$Dict$empty, rpdict);
};
var $author$project$ApiModel$decodePresNodes = A2(
	$elm$json$Json$Decode$map,
	$author$project$ApiModel$resolvePresNodes,
	$elm$json$Json$Decode$dict($author$project$ApiModel$decodeRawPresNode));
var $elm$json$Json$Encode$dict = F3(
	function (toKey, toValue, dictionary) {
		return _Json_wrap(
			A3(
				$elm$core$Dict$foldl,
				F3(
					function (key, value, obj) {
						return A3(
							_Json_addField,
							toKey(key),
							toValue(value),
							obj);
					}),
				_Json_emptyObject(_Utils_Tuple0),
				dictionary));
	});
var $rluiten$elm_text_search$ElmTextSearch$Json$Encoder$corpusTokensEncoder = function (setVal) {
	return A2(
		$elm$json$Json$Encode$list,
		$elm$json$Json$Encode$string,
		$elm$core$Set$toList(setVal));
};
var $rluiten$elm_text_search$ElmTextSearch$Json$Encoder$documentStoreEncoder = function (dict) {
	return $elm$json$Json$Encode$object(
		A2(
			$elm$core$List$map,
			function (_v0) {
				var key = _v0.a;
				var val = _v0.b;
				return _Utils_Tuple2(
					key,
					A2(
						$elm$json$Json$Encode$list,
						$elm$json$Json$Encode$string,
						$elm$core$Set$toList(val)));
			},
			$elm$core$Dict$toList(dict)));
};
var $rluiten$trie$Trie$Json$Encoder$encoderValDict = F2(
	function (valEnc, refValues) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var key = _v0.a;
					var val = _v0.b;
					return _Utils_Tuple2(
						key,
						valEnc(val));
				},
				$elm$core$Dict$toList(refValues)));
	});
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $rluiten$trie$Trie$Json$Encoder$encoder = F2(
	function (valEnc, trie) {
		switch (trie.$) {
			case 'EmptyTrie':
				return $elm$json$Json$Encode$null;
			case 'ValNode':
				var refValues = trie.a;
				return A2($rluiten$trie$Trie$Json$Encoder$encoderValDict, valEnc, refValues);
			case 'TrieNode':
				var trieDict = trie.a;
				return A2($rluiten$trie$Trie$Json$Encoder$encoderTrieDict, valEnc, trieDict);
			default:
				var _v2 = trie.a;
				var refValues = _v2.a;
				var trieDict = _v2.b;
				var encodedValues = A2($rluiten$trie$Trie$Json$Encoder$encoderValDict, valEnc, refValues);
				var encodedDict = A2($rluiten$trie$Trie$Json$Encoder$encoderTrieDict, valEnc, trieDict);
				return A2(
					$elm$json$Json$Encode$list,
					$elm$core$Basics$identity,
					_List_fromArray(
						[encodedValues, encodedDict]));
		}
	});
var $rluiten$trie$Trie$Json$Encoder$encoderTrieDict = F2(
	function (valEnc, trieDict) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var key = _v0.a;
					var val = _v0.b;
					return _Utils_Tuple2(
						key,
						A2($rluiten$trie$Trie$Json$Encoder$encoder, valEnc, val));
				},
				$elm$core$Dict$toList(trieDict)));
	});
var $elm$json$Json$Encode$float = _Json_wrap;
var $rluiten$elm_text_search$ElmTextSearch$Json$Encoder$tokenStore = $rluiten$trie$Trie$Json$Encoder$encoder($elm$json$Json$Encode$float);
var $rluiten$elm_text_search$ElmTextSearch$Json$Encoder$codecIndexRecordEncoder = function (rec) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'indexVersion',
				$elm$json$Json$Encode$string(rec.indexVersion)),
				_Utils_Tuple2(
				'indexType',
				$elm$json$Json$Encode$string(rec.indexType)),
				_Utils_Tuple2(
				'documentStore',
				$rluiten$elm_text_search$ElmTextSearch$Json$Encoder$documentStoreEncoder(rec.documentStore)),
				_Utils_Tuple2(
				'corpusTokens',
				$rluiten$elm_text_search$ElmTextSearch$Json$Encoder$corpusTokensEncoder(rec.corpusTokens)),
				_Utils_Tuple2(
				'tokenStore',
				$rluiten$elm_text_search$ElmTextSearch$Json$Encoder$tokenStore(rec.tokenStore))
			]));
};
var $rluiten$elm_text_search$ElmTextSearch$Json$Encoder$encoder = function (_v0) {
	var irec = _v0.a;
	return $rluiten$elm_text_search$ElmTextSearch$Json$Encoder$codecIndexRecordEncoder(
		{corpusTokens: irec.corpusTokens, documentStore: irec.documentStore, indexType: irec.indexType, indexVersion: irec.indexVersion, tokenStore: irec.tokenStore});
};
var $author$project$Search$encodeStoredData = function (sd) {
	return A2(
		$elm$json$Json$Encode$encode,
		0,
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					$author$project$Const$dataVersion,
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'version',
								$elm$json$Json$Encode$string(sd.version)),
								_Utils_Tuple2(
								'data',
								A3($elm$json$Json$Encode$dict, $elm$core$Basics$identity, $author$project$ApiModel$encodeItem, sd.data)),
								_Utils_Tuple2(
								'index',
								function () {
									var _v0 = sd.index;
									if (_v0.$ === 'Just') {
										var index = _v0.a;
										return $rluiten$elm_text_search$ElmTextSearch$Json$Encoder$encoder(index);
									} else {
										return $elm$json$Json$Encode$null;
									}
								}())
							])))
				])));
};
var $author$project$Shared$errStr = function (e) {
	switch (e.$) {
		case 'BadUrl':
			var s = e.a;
			return 'BAD URL: ' + s;
		case 'Timeout':
			return 'TIMEOUT';
		case 'NetworkError':
			return 'NETWORK ERROR';
		case 'BadStatus':
			var i = e.a;
			return 'BAD STATUS: ' + $elm$core$String$fromInt(i);
		default:
			var s = e.a;
			return 'BAD BODY: ' + s;
	}
};
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $author$project$Shared$filterPred = function (ft) {
	switch (ft.$) {
		case 'None':
			return function (_v1) {
				return true;
			};
		case 'Hunter':
			return function (i) {
				return i.classType === 1;
			};
		case 'Warlock':
			return function (i) {
				return i.classType === 2;
			};
		default:
			return function (i) {
				return !i.classType;
			};
	}
};
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $elm$http$Http$get = function (r) {
	return $elm$http$Http$request(
		{body: $elm$http$Http$emptyBody, expect: r.expect, headers: _List_Nil, method: 'GET', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Const$root = 'https://www.bungie.net';
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Search$sortFold = F3(
	function (idict, t, l) {
		var _v0 = A2($elm$core$Dict$get, t.a, idict);
		if (_v0.$ === 'Just') {
			var i = _v0.a;
			return A2($elm$core$List$cons, i, l);
		} else {
			return l;
		}
	});
var $author$project$Search$resultToSortedItems = F2(
	function (idict, l) {
		return A3(
			$elm$core$List$foldl,
			$author$project$Search$sortFold(idict),
			_List_Nil,
			A2($elm$core$List$sortBy, $elm$core$Tuple$second, l));
	});
var $rluiten$trie$TrieModel$getNodeCore = F2(
	function (key, trie) {
		if (!key.b) {
			return $elm$core$Maybe$Just(trie);
		} else {
			var keyHead = key.a;
			var keyTail = key.b;
			var getTrie = function (trieDict) {
				return A2(
					$elm$core$Maybe$andThen,
					$rluiten$trie$TrieModel$getNodeCore(keyTail),
					A2($elm$core$Dict$get, keyHead, trieDict));
			};
			switch (trie.$) {
				case 'EmptyTrie':
					return $elm$core$Maybe$Nothing;
				case 'ValNode':
					return $elm$core$Maybe$Nothing;
				case 'TrieNode':
					var trieDict = trie.a;
					return getTrie(trieDict);
				default:
					var _v2 = trie.a;
					var trieDict = _v2.b;
					return getTrie(trieDict);
			}
		}
	});
var $rluiten$trie$TrieModel$getNodeByStr = F2(
	function (key, trie) {
		return $elm$core$List$isEmpty(key) ? $elm$core$Maybe$Nothing : A2($rluiten$trie$TrieModel$getNodeCore, key, trie);
	});
var $rluiten$trie$TrieModel$getNode = F2(
	function (key, trie) {
		return A2(
			$rluiten$trie$TrieModel$getNodeByStr,
			$rluiten$trie$TrieModel$toListString(key),
			trie);
	});
var $rluiten$trie$Trie$getNode = $rluiten$trie$TrieModel$getNode;
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $rluiten$trie$TrieModel$expandCore = F3(
	function (key, trie, keyList) {
		var expandSub = F3(
			function (_char, trie1, foldList) {
				return A3(
					$rluiten$trie$TrieModel$expandCore,
					_Utils_ap(
						key,
						_List_fromArray(
							[_char])),
					trie1,
					foldList);
			});
		var addRefKey = function (refValues) {
			return (!$elm$core$Dict$isEmpty(refValues)) ? A2(
				$elm$core$List$cons,
				$elm$core$String$concat(key),
				keyList) : keyList;
		};
		switch (trie.$) {
			case 'EmptyTrie':
				return keyList;
			case 'ValNode':
				var refValues = trie.a;
				return addRefKey(refValues);
			case 'TrieNode':
				var trieDict = trie.a;
				return A3($elm$core$Dict$foldr, expandSub, keyList, trieDict);
			default:
				var _v1 = trie.a;
				var refValues = _v1.a;
				var trieDict = _v1.b;
				var dirtyList = addRefKey(refValues);
				return A3($elm$core$Dict$foldr, expandSub, dirtyList, trieDict);
		}
	});
var $rluiten$trie$TrieModel$expandByStr = F2(
	function (key, trie) {
		var _v0 = A2($rluiten$trie$TrieModel$getNodeByStr, key, trie);
		if (_v0.$ === 'Nothing') {
			return _List_Nil;
		} else {
			var keyTrie = _v0.a;
			return A3($rluiten$trie$TrieModel$expandCore, key, keyTrie, _List_Nil);
		}
	});
var $rluiten$trie$TrieModel$expand = F2(
	function (key, trie) {
		return A2(
			$rluiten$trie$TrieModel$expandByStr,
			$rluiten$trie$TrieModel$toListString(key),
			trie);
	});
var $rluiten$trie$Trie$expand = $rluiten$trie$TrieModel$expand;
var $rluiten$trie$TrieModel$getValues = function (trie) {
	switch (trie.$) {
		case 'EmptyTrie':
			return $elm$core$Maybe$Nothing;
		case 'ValNode':
			var refValues = trie.a;
			return $elm$core$Maybe$Just(refValues);
		case 'TrieNode':
			return $elm$core$Maybe$Nothing;
		default:
			var _v1 = trie.a;
			var refValues = _v1.a;
			return $elm$core$Maybe$Just(refValues);
	}
};
var $rluiten$trie$TrieModel$getByStr = F2(
	function (key, trie) {
		return A2(
			$elm$core$Maybe$andThen,
			$rluiten$trie$TrieModel$getValues,
			A2($rluiten$trie$TrieModel$getNodeByStr, key, trie));
	});
var $rluiten$trie$TrieModel$get = F2(
	function (key, trie) {
		return A2(
			$rluiten$trie$TrieModel$getByStr,
			$rluiten$trie$TrieModel$toListString(key),
			trie);
	});
var $rluiten$trie$Trie$get = $rluiten$trie$TrieModel$get;
var $rluiten$trie$TrieModel$valueCount = F2(
	function (key, trie) {
		return $elm$core$Dict$size(
			A2(
				$elm$core$Maybe$withDefault,
				$elm$core$Dict$empty,
				A2($rluiten$trie$TrieModel$get, key, trie)));
	});
var $rluiten$trie$Trie$valueCount = $rluiten$trie$TrieModel$valueCount;
var $rluiten$elm_text_search$Index$Utils$calcIdf = F2(
	function (_v0, token) {
		var irec = _v0.a;
		var docFrequency = A2($rluiten$trie$Trie$valueCount, token, irec.tokenStore);
		var idfLocal = (docFrequency > 0) ? (1 + A2(
			$elm$core$Basics$logBase,
			10,
			$elm$core$Dict$size(irec.documentStore) / docFrequency)) : 1;
		var updatedIdfCache = A3($elm$core$Dict$insert, token, idfLocal, irec.idfCache);
		var u1index = $rluiten$elm_text_search$Index$Model$Index(
			_Utils_update(
				irec,
				{idfCache: updatedIdfCache}));
		return _Utils_Tuple2(u1index, idfLocal);
	});
var $rluiten$elm_text_search$Index$Utils$idf = F2(
	function (index, token) {
		var irec = index.a;
		var _v0 = A2($elm$core$Dict$get, token, irec.idfCache);
		if (_v0.$ === 'Nothing') {
			return A2($rluiten$elm_text_search$Index$Utils$calcIdf, index, token);
		} else {
			var idfValue = _v0.a;
			return _Utils_Tuple2(index, idfValue);
		}
	});
var $rluiten$sparsevector$SparseVector$insert = F3(
	function (index, value, svector) {
		return A3($elm$core$Dict$insert, index, value, svector);
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $rluiten$elm_text_search$Index$Vector$similarityBoost = F2(
	function (token, expandedToken) {
		return _Utils_eq(expandedToken, token) ? 1 : (1 / A2(
			$elm$core$Basics$logBase,
			10,
			A2(
				$elm$core$Basics$max,
				3,
				$elm$core$String$length(expandedToken) - $elm$core$String$length(token))));
	});
var $rluiten$elm_text_search$Index$Vector$updateSetAndVec = F4(
	function (tf, token, expandedToken, _v0) {
		var docSets = _v0.a;
		var vec = _v0.b;
		var index = _v0.c;
		var irec = index.a;
		var _v1 = A2($rluiten$elm_text_search$Index$Utils$idf, index, expandedToken);
		var u1index = _v1.a;
		var u1irec = u1index.a;
		var keyIdf = _v1.b;
		var tfidf = (tf * keyIdf) * A2($rluiten$elm_text_search$Index$Vector$similarityBoost, token, expandedToken);
		var u1vec = A2(
			$elm$core$Maybe$withDefault,
			vec,
			A2(
				$elm$core$Maybe$map,
				function (pos) {
					return A3($rluiten$sparsevector$SparseVector$insert, pos, tfidf, vec);
				},
				A2($elm$core$Dict$get, expandedToken, irec.corpusTokensIndex)));
		var expandedTokenDocSet = A2(
			$elm$core$Maybe$withDefault,
			$elm$core$Set$empty,
			A2(
				$elm$core$Maybe$map,
				function (dict) {
					return $elm$core$Set$fromList(
						$elm$core$Dict$keys(dict));
				},
				A2($rluiten$trie$Trie$get, expandedToken, u1irec.tokenStore)));
		var u1docSets = A2($elm$core$Set$union, expandedTokenDocSet, docSets);
		return _Utils_Tuple3(u1docSets, u1vec, u1index);
	});
var $rluiten$elm_text_search$Index$Vector$buildDocVector = F4(
	function (tokensLength, fieldBoosts, baseToken, _v0) {
		var docSets = _v0.a;
		var vec = _v0.b;
		var index = _v0.c;
		var irec = index.a;
		var termFrequency = ((1 / tokensLength) * $elm$core$List$length(irec.fields)) * fieldBoosts;
		var expandedTokens = A2($rluiten$trie$Trie$expand, baseToken, irec.tokenStore);
		var _v1 = A3(
			$elm$core$List$foldr,
			A2($rluiten$elm_text_search$Index$Vector$updateSetAndVec, termFrequency, baseToken),
			_Utils_Tuple3($elm$core$Set$empty, vec, index),
			expandedTokens);
		var docs = _v1.a;
		var vecU1 = _v1.b;
		var indexU1 = _v1.c;
		return _Utils_Tuple3(
			A2($elm$core$List$cons, docs, docSets),
			vecU1,
			indexU1);
	});
var $rluiten$sparsevector$SparseVector$empty = $elm$core$Dict$empty;
var $rluiten$elm_text_search$Index$Vector$getQueryVector = F3(
	function (fieldBoosts, tokens, index) {
		return A3(
			$elm$core$List$foldr,
			A2(
				$rluiten$elm_text_search$Index$Vector$buildDocVector,
				$elm$core$List$length(tokens),
				fieldBoosts),
			_Utils_Tuple3(_List_Nil, $rluiten$sparsevector$SparseVector$empty, index),
			tokens);
	});
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $elm$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			$elm$core$Dict$filter,
			F2(
				function (k, _v0) {
					return A2($elm$core$Dict$member, k, t2);
				}),
			t1);
	});
var $elm$core$Set$intersect = F2(
	function (_v0, _v1) {
		var dict1 = _v0.a;
		var dict2 = _v1.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$intersect, dict1, dict2));
	});
var $rluiten$elm_text_search$Utils$intersectSets = function (sets) {
	if (!sets.b) {
		return $elm$core$Set$empty;
	} else {
		var h = sets.a;
		var tail = sets.b;
		return A3(
			$elm$core$List$foldr,
			F2(
				function (set, agg) {
					return A2($elm$core$Set$intersect, set, agg);
				}),
			h,
			tail);
	}
};
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $rluiten$sparsevector$SparseVector$dot = F2(
	function (vec1, vec2) {
		var common = A2(
			$elm$core$Set$intersect,
			$elm$core$Set$fromList(
				$elm$core$Dict$keys(vec1)),
			$elm$core$Set$fromList(
				$elm$core$Dict$keys(vec2)));
		var d1 = A2(
			$elm$core$Dict$filter,
			F2(
				function (k, v) {
					return A2($elm$core$Set$member, k, common);
				}),
			vec1);
		var d2 = A2(
			$elm$core$Dict$filter,
			F2(
				function (k, v) {
					return A2($elm$core$Set$member, k, common);
				}),
			vec2);
		return $elm$core$List$sum(
			A3(
				$elm$core$List$map2,
				F2(
					function (v1, v2) {
						return v1 * v2;
					}),
				$elm$core$Dict$values(d1),
				$elm$core$Dict$values(d2)));
	});
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $rluiten$sparsevector$SparseVector$magnitude = function (svector) {
	return $elm$core$Basics$sqrt(
		$elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function (x) {
					return x * x;
				},
				$elm$core$Dict$values(svector))));
};
var $rluiten$sparsevector$SparseVector$cosineSimilarity = F2(
	function (vec1, vec2) {
		return A2($rluiten$sparsevector$SparseVector$dot, vec1, vec2) / ($rluiten$sparsevector$SparseVector$magnitude(vec1) * $rluiten$sparsevector$SparseVector$magnitude(vec2));
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $rluiten$elm_text_search$Index$Vector$updateDocVector = F3(
	function (docRef, token, inputTuple) {
		var index = inputTuple.a;
		var irec = index.a;
		var docVector = inputTuple.b;
		return A2(
			$elm$core$Maybe$withDefault,
			inputTuple,
			A3(
				$elm$core$Maybe$map2,
				F2(
					function (position, termFrequency) {
						var _v0 = A2($rluiten$elm_text_search$Index$Utils$idf, index, token);
						var u1index = _v0.a;
						var idfScore = _v0.b;
						return _Utils_Tuple2(
							u1index,
							A3($rluiten$sparsevector$SparseVector$insert, position, termFrequency * idfScore, docVector));
					}),
				A2($elm$core$Dict$get, token, irec.corpusTokensIndex),
				A2(
					$elm$core$Maybe$andThen,
					$elm$core$Dict$get(docRef),
					A2($rluiten$trie$Trie$get, token, irec.tokenStore))));
	});
var $rluiten$elm_text_search$Index$Vector$getDocVector = F2(
	function (index, docRef) {
		var irec = index.a;
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(index, $rluiten$sparsevector$SparseVector$empty),
			A2(
				$elm$core$Maybe$map,
				function (tokenSet) {
					return A3(
						$elm$core$List$foldr,
						$rluiten$elm_text_search$Index$Vector$updateDocVector(docRef),
						_Utils_Tuple2(index, $rluiten$sparsevector$SparseVector$empty),
						$elm$core$Set$toList(tokenSet));
				},
				A2($elm$core$Dict$get, docRef, irec.documentStore)));
	});
var $rluiten$elm_text_search$Index$Vector$scoreAndCompare = F3(
	function (queryVector, ref, _v0) {
		var index = _v0.a;
		var docs = _v0.b;
		var _v1 = A2($rluiten$elm_text_search$Index$Vector$getDocVector, index, ref);
		var u1index = _v1.a;
		var docVector = _v1.b;
		return _Utils_Tuple2(
			u1index,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					ref,
					A2($rluiten$sparsevector$SparseVector$cosineSimilarity, queryVector, docVector)),
				docs));
	});
var $rluiten$elm_text_search$Index$searchTokens = F2(
	function (tokens, index) {
		var irec = index.a;
		var fieldBoosts = $elm$core$List$sum(
			A2($elm$core$List$map, $elm$core$Tuple$second, irec.fields));
		var _v0 = A3($rluiten$elm_text_search$Index$Vector$getQueryVector, fieldBoosts, tokens, index);
		var tokenDocSets = _v0.a;
		var queryVector = _v0.b;
		var u1index = _v0.c;
		var _v1 = A3(
			$elm$core$List$foldr,
			$rluiten$elm_text_search$Index$Vector$scoreAndCompare(queryVector),
			_Utils_Tuple2(u1index, _List_Nil),
			$elm$core$Set$toList(
				$rluiten$elm_text_search$Utils$intersectSets(tokenDocSets)));
		var u2index = _v1.a;
		var matchedDocs = _v1.b;
		return _Utils_Tuple2(
			u2index,
			$elm$core$List$reverse(
				A2($elm$core$List$sortBy, $elm$core$Tuple$second, matchedDocs)));
	});
var $rluiten$elm_text_search$Index$search = F2(
	function (query, index) {
		var _v0 = A2($rluiten$elm_text_search$Index$Utils$getTokens, index, query);
		var i1index = _v0.a;
		var i1irec = i1index.a;
		var tokens = _v0.b;
		var tokenInStore = function (token) {
			return !_Utils_eq(
				A2($rluiten$trie$Trie$getNode, token, i1irec.tokenStore),
				$elm$core$Maybe$Nothing);
		};
		return $elm$core$Dict$isEmpty(i1irec.documentStore) ? $elm$core$Result$Err('Error there are no documents in index to search.') : ($elm$core$String$isEmpty(
			$elm$core$String$trim(query)) ? $elm$core$Result$Err('Error query is empty.') : ($elm$core$List$isEmpty(tokens) ? $elm$core$Result$Err('Error after tokenisation there are no terms to search for.') : (($elm$core$List$isEmpty(tokens) || (!A2($elm$core$List$any, tokenInStore, tokens))) ? $elm$core$Result$Ok(
			_Utils_Tuple2(i1index, _List_Nil)) : $elm$core$Result$Ok(
			A2($rluiten$elm_text_search$Index$searchTokens, tokens, i1index)))));
	});
var $rluiten$elm_text_search$ElmTextSearch$search = $rluiten$elm_text_search$Index$search;
var $author$project$Search$search = F3(
	function (idict, index, string) {
		return A2(
			$elm$core$Result$map,
			function (t) {
				return A2($author$project$Search$resultToSortedItems, idict, t.b);
			},
			A2($rluiten$elm_text_search$ElmTextSearch$search, string, index));
	});
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $author$project$Search$storeData = _Platform_outgoingPort('storeData', $elm$json$Json$Encode$string);
var $author$project$Shared$unpack = F3(
	function (errF, okF, result) {
		if (result.$ === 'Ok') {
			var ok = result.a;
			return okF(ok);
		} else {
			var err = result.a;
			return errF(err);
		}
	});
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Search$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'GotError':
				var e = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{state: $author$project$Search$Error}),
					$author$project$Search$sendPort(
						$author$project$Shared$encodeInPortData(
							$author$project$Shared$PortError(
								$author$project$Shared$errStr(e)))));
			case 'GetManifest':
				var data = msg.a;
				return _Utils_Tuple2(
					model,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								$elm$http$Http$get(
								{
									expect: A2(
										$elm$http$Http$expectJson,
										A2(
											$author$project$Shared$unpack,
											$author$project$Search$GotError,
											$author$project$Search$GotManifest(data)),
										$author$project$ApiModel$decodeManifest),
									url: $author$project$Const$root + '/Platform/Destiny2/Manifest'
								}),
								$author$project$Search$sendPort(
								$author$project$Shared$encodeInPortData(
									A2($author$project$Shared$Status, 'Checking for Manifest updates', false)))
							])));
			case 'GotManifest':
				var mdata = msg.a;
				var manifest = msg.b;
				var readyData = function () {
					if (mdata.$ === 'Just') {
						var data = mdata.a;
						if (_Utils_eq(data.version, manifest.version)) {
							var _v4 = data.index;
							if (_v4.$ === 'Just') {
								var i = _v4.a;
								return $elm$core$Maybe$Just(
									_Utils_Tuple2(i, data.data));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						} else {
							return $elm$core$Maybe$Nothing;
						}
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				if (readyData.$ === 'Just') {
					var _v2 = readyData.a;
					var index = _v2.a;
					var data = _v2.b;
					return _Utils_Tuple2(
						model,
						$author$project$Shared$do(
							A3($author$project$Search$FinishedLoading, manifest, data, index)));
				} else {
					return _Utils_Tuple2(
						model,
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$elm$http$Http$get(
									{
										expect: A2(
											$elm$http$Http$expectJson,
											A2(
												$author$project$Shared$unpack,
												$author$project$Search$GotError,
												$author$project$Search$GotPresNodeData(manifest)),
											$author$project$ApiModel$decodePresNodes),
										url: _Utils_ap($author$project$Const$root, manifest.presNodeUrl)
									}),
									$author$project$Search$sendPort(
									$author$project$Shared$encodeInPortData(
										A2($author$project$Shared$Status, 'Loading Item Sets', false)))
								])));
				}
			case 'GotPresNodeData':
				var manifest = msg.a;
				var pdict = msg.b;
				return _Utils_Tuple2(
					model,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								$elm$http$Http$get(
								{
									expect: A2(
										$elm$http$Http$expectJson,
										A2(
											$author$project$Shared$unpack,
											$author$project$Search$GotError,
											$author$project$Search$GotCollectibleData(manifest)),
										$author$project$ApiModel$decodeCollectibles(pdict)),
									url: _Utils_ap($author$project$Const$root, manifest.collectibleUrl)
								}),
								$author$project$Search$sendPort(
								$author$project$Shared$encodeInPortData(
									A2($author$project$Shared$Status, 'Loading Item Sources', false)))
							])));
			case 'GotCollectibleData':
				var manifest = msg.a;
				var cdict = msg.b;
				return _Utils_Tuple2(
					model,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								$elm$http$Http$get(
								{
									expect: A2(
										$elm$http$Http$expectJson,
										A2(
											$author$project$Shared$unpack,
											$author$project$Search$GotError,
											$author$project$Search$GotItemData(manifest)),
										$author$project$ApiModel$decodeItems(cdict)),
									url: _Utils_ap($author$project$Const$root, manifest.itemDefUrl)
								}),
								$author$project$Search$sendPort(
								$author$project$Shared$encodeInPortData(
									A2($author$project$Shared$Status, 'Loading Items', false)))
							])));
			case 'GotItemData':
				var manifest = msg.a;
				var data = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							allItems: $elm$core$Dict$values(data)
						}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								$author$project$Shared$do(
								A2($author$project$Search$IndexData, manifest, data)),
								$author$project$Search$sendPort(
								$author$project$Shared$encodeInPortData(
									A2($author$project$Shared$Status, 'Indexing Data, this may take some time', false)))
							])));
			case 'IndexData':
				var manifest = msg.a;
				var data = msg.b;
				var index = $author$project$Search$createIndex(data);
				return _Utils_Tuple2(
					model,
					$author$project$Shared$do(
						A3($author$project$Search$FinishedLoading, manifest, data, index)));
			case 'FinishedLoading':
				var manifest = msg.a;
				var data = msg.b;
				var index = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							allItems: $elm$core$Dict$values(data),
							state: A3($author$project$Search$Ready, manifest.version, index, data)
						}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								$author$project$Search$sendPort(
								$author$project$Shared$encodeInPortData(
									A2($author$project$Shared$Status, 'Done', true))),
								$author$project$Shared$do($author$project$Search$SaveData),
								$author$project$Shared$do($author$project$Search$DoFilter)
							])));
			case 'SaveData':
				var _v5 = model.state;
				if (_v5.$ === 'Ready') {
					var version = _v5.a;
					var index = _v5.b;
					var data = _v5.c;
					return model.storagePermission ? _Utils_Tuple2(
						model,
						$author$project$Search$storeData(
							$author$project$Search$encodeStoredData(
								A3(
									$author$project$Search$StoredData,
									version,
									data,
									$elm$core$Maybe$Just(index))))) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'GotPortMessage':
				var message = msg.a;
				var _v6 = $author$project$Shared$decodeOutPortData(message);
				if (_v6.$ === 'Err') {
					var e = _v6.a;
					return _Utils_Tuple2(
						model,
						$author$project$Search$sendPort(
							$author$project$Shared$encodeInPortData(
								$author$project$Shared$PortError(
									$elm$json$Json$Decode$errorToString(e)))));
				} else {
					switch (_v6.a.$) {
						case 'Query':
							var s = _v6.a.a;
							return ($elm$core$String$length(s) <= 2) ? _Utils_Tuple2(
								_Utils_update(
									model,
									{fullResults: _List_Nil, string: s}),
								$author$project$Shared$do($author$project$Search$DoFilter)) : _Utils_Tuple2(
								_Utils_update(
									model,
									{string: s}),
								$author$project$Shared$do($author$project$Search$DoSearch));
						case 'Filter':
							var f = _v6.a.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{filter: f}),
								$author$project$Shared$do($author$project$Search$DoFilter));
						default:
							var b = _v6.a.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{storagePermission: b}),
								$author$project$Shared$do($author$project$Search$SaveData));
					}
				}
			case 'DoSearch':
				var _v7 = model.state;
				if (_v7.$ === 'Ready') {
					var index = _v7.b;
					var data = _v7.c;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								fullResults: A2(
									$elm$core$Result$withDefault,
									_List_Nil,
									A3($author$project$Search$search, data, index, model.string))
							}),
						$author$project$Shared$do($author$project$Search$DoFilter));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'DoFilter':
				var fres = $elm$core$List$isEmpty(model.fullResults) ? model.allItems : model.fullResults;
				var res = A2(
					$elm$core$List$filter,
					$author$project$Shared$filterPred(model.filter),
					fres);
				return _Utils_Tuple2(
					model,
					$author$project$Shared$do(
						$author$project$Search$SendResults(res)));
			default:
				var res = msg.a;
				var validSearch = ($elm$core$String$length(model.string) > 2) || (!_Utils_eq(model.filter, $author$project$Shared$None));
				var sets = $elm$core$List$sort(
					$elm$core$Set$toList(
						$elm$core$Set$fromList(
							A2(
								$elm$core$List$concatMap,
								function (i) {
									return i.sets;
								},
								res))));
				return _Utils_Tuple2(
					model,
					$author$project$Search$sendPort(
						$author$project$Shared$encodeInPortData(
							A3($author$project$Shared$Results, validSearch, res, sets))));
		}
	});
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$Search$main = $elm$core$Platform$worker(
	{init: $author$project$Search$init, subscriptions: $author$project$Search$subscriptions, update: $author$project$Search$update});
_Platform_export({'Search':{'init':$author$project$Search$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (permission) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (data) {
					return $elm$json$Json$Decode$succeed(
						{data: data, permission: permission});
				},
				A2(
					$elm$json$Json$Decode$field,
					'data',
					$elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
								A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
							]))));
		},
		A2($elm$json$Json$Decode$field, 'permission', $elm$json$Json$Decode$bool)))(0)}});}(this));