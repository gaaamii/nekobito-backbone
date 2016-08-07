//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){
// Baseline setup
// --------------
// Establish the root object, `window` in the browser, or `exports` on the server.
var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,o=r.slice,a=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};
// Export the Underscore object for **Node.js**, with
// backwards-compatibility for the old `require()` API. If we're in
// the browser, add `_` as a global object.
"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,
// Current version.
h.VERSION="1.7.0";
// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
var v=function(n,t,r){if(void 0===t)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};
// A mostly-internal function to generate callbacks that can be applied
// to each element in a collection, returning the desired result — either
// identity, an arbitrary callback, a property matcher, or a property accessor.
h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?v(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},
// Collection Functions
// --------------------
// The cornerstone, an `each` implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
h.each=h.forEach=function(n,t,r){if(null==n)return n;t=v(t,r);var e,u=n.length;if(u===+u)for(e=0;e<u;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;e<u;e++)t(n[i[e]],i[e],n)}return n},
// Return the results of applying the iteratee to each element.
h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,o=Array(i),a=0;a<i;a++)e=u?u[a]:a,o[a]=t(n[e],e,n);return o};var g="Reduce of empty array with no initial value";
// **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.
h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=v(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),o=(i||n).length,a=0;if(arguments.length<3){if(!o)throw new TypeError(g);r=n[i?i[a++]:a++]}for(;a<o;a++)u=i?i[a]:a,r=t(r,n[u],u,n);return r},
// The right-associative version of reduce, also known as `foldr`.
h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=v(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),o=(i||n).length;if(arguments.length<3){if(!o)throw new TypeError(g);r=n[i?i[--o]:--o]}for(;o--;)u=i?i[o]:o,r=t(r,n[u],u,n);return r},
// Return the first value which passes a truth test. Aliased as `detect`.
h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){if(t(n,r,u))return e=n,!0}),e},
// Return all the elements that pass a truth test.
// Aliased as `select`.
h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},
// Return all the elements for which a truth test fails.
h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},
// Determine whether all of the elements match a truth test.
// Aliased as `all`.
h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),o=(i||n).length;for(e=0;e<o;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},
// Determine if at least one element in the object matches a truth test.
// Aliased as `any`.
h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),o=(i||n).length;for(e=0;e<o;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},
// Determine if the array or object contains a given value (using `===`).
// Aliased as `include`.
h.contains=h.include=function(n,t){return null!=n&&(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},
// Invoke a method (with arguments) on every item in a collection.
h.invoke=function(n,t){var r=o.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},
// Convenience version of a common use case of `map`: fetching a property.
h.pluck=function(n,t){return h.map(n,h.property(t))},
// Convenience version of a common use case of `filter`: selecting only objects
// containing specific `key:value` pairs.
h.where=function(n,t){return h.filter(n,h.matches(t))},
// Convenience version of a common use case of `find`: getting the first object
// containing specific `key:value` pairs.
h.findWhere=function(n,t){return h.find(n,h.matches(t))},
// Return the maximum element (or element-based computation).
h.max=function(n,t,r){var e,u,i=-(1/0),o=-(1/0);if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var a=0,l=n.length;a<l;a++)e=n[a],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-(1/0)&&i===-(1/0))&&(i=n,o=u)});return i},
// Return the minimum element (or element-based computation).
h.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var a=0,l=n.length;a<l;a++)e=n[a],e<i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u<o||u===1/0&&i===1/0)&&(i=n,o=u)});return i},
// Shuffle a collection, using the modern version of the
// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;i<e;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},
// Sample **n** random values from a collection.
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `map`.
h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},
// Sort the object's values by a criterion produced by an iteratee.
h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(r<e||void 0===e)return-1}return n.index-t.index}),"value")};
// An internal function used for aggregate "group by" operations.
var y=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};
// Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.
h.groupBy=y(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),
// Indexes the object's values by a criterion, similar to `groupBy`, but for
// when you know that your index values will be unique.
h.indexBy=y(function(n,t,r){n[r]=t}),
// Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.
h.countBy=y(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),
// Use a comparator function to figure out the smallest index at which
// an object should be inserted so as to maintain order. Uses binary search.
h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,o=n.length;i<o;){var a=i+o>>>1;r(n[a])<u?i=a+1:o=a}return i},
// Safely create a real, live array from anything iterable.
h.toArray=function(n){return n?h.isArray(n)?o.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},
// Return the number of elements in an object.
h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},
// Split a collection into two arrays: one whose elements all satisfy the given
// predicate, and one whose elements all do not satisfy the predicate.
h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},
// Array Functions
// ---------------
// Get the first element of an array. Passing **n** will return the first N
// values in the array. Aliased as `head` and `take`. The **guard** check
// allows it to work with `_.map`.
h.first=h.head=h.take=function(n,t,r){if(null!=n)return null==t||r?n[0]:t<0?[]:o.call(n,0,t)},
// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N. The **guard** check allows it to work with
// `_.map`.
h.initial=function(n,t,r){return o.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},
// Get the last element of an array. Passing **n** will return the last N
// values in the array. The **guard** check allows it to work with `_.map`.
h.last=function(n,t,r){if(null!=n)return null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},
// Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
// Especially useful on the arguments object. Passing an **n** will return
// the rest N values in the array. The **guard**
// check allows it to work with `_.map`.
h.rest=h.tail=h.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},
// Trim out all falsy values from an array.
h.compact=function(n){return h.filter(n,h.identity)};
// Internal implementation of a recursive `flatten` function.
var d=function(n,t,r,e){if(t&&h.every(n,h.isArray))return a.apply(e,n);for(var u=0,o=n.length;u<o;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):d(l,t,r,e):r||e.push(l)}return e};
// Flatten out an array, either recursively (by default), or just one level.
h.flatten=function(n,t){return d(n,t,!1,[])},
// Return a version of the array that does not contain the specified value(s).
h.without=function(n){return h.difference(n,o.call(arguments,1))},
// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// Aliased as `unique`.
h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],o=0,a=n.length;o<a;o++){var l=n[o];if(t)o&&i===l||u.push(l),i=l;else if(r){var c=r(l,o,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},
// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
h.union=function(){return h.uniq(d(arguments,!0,!0,[]))},
// Produce an array that contains every item shared between all the
// passed-in arrays.
h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;e<u;e++){var i=n[e];if(!h.contains(t,i)){for(var o=1;o<r&&h.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},
// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
h.difference=function(n){var t=d(o.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},
// Zip together multiple lists into a single array -- elements that share
// an index go together.
h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;e<t;e++)r[e]=h.pluck(arguments,e);return r},
// Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values.
h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;e<u;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},
// Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.
h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=r<0?Math.max(0,u+r):r}for(;e<u;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=r<0?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},
// Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](http://docs.python.org/library/functions.html#range).
h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;i<e;i++,n+=r)u[i]=n;return u};
// Function (ahem) Functions
// ------------------
// Reusable constructor function for prototype setting.
var m=function(){};
// Create a function bound to a given object (assigning `this`, and arguments,
// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
// available.
h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,o.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));m.prototype=n.prototype;var u=new m;m.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return h.isObject(i)?i:u}},
// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. _ acts
// as a placeholder, allowing any combination of arguments to be pre-filled.
h.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;u<i;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},
// Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
h.bindAll=function(n){var t,r,e=arguments.length;if(e<=1)throw new Error("bindAll must be passed function names");for(t=1;t<e;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},
// Memoize an expensive function by storing its results.
h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},
// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
h.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},
// Defers a function, scheduling it to run after the current call stack has
// cleared.
h.defer=function(n){return h.delay.apply(h,[n,1].concat(o.call(arguments,1)))},
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
h.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var l=function(){a=r.leading===!1?0:h.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var c=h.now();a||r.leading!==!1||(a=c);var f=t-(c-a);return e=this,u=arguments,f<=0||f>t?(clearTimeout(o),o=null,a=c,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(l,f)),i}},
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
h.debounce=function(n,t,r){var e,u,i,o,a,l=function(){var c=h.now()-o;c<t&&c>0?e=setTimeout(l,t-c):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(a=n.apply(i,u),i=u=null),a}},
// Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function.
h.wrap=function(n,t){return h.partial(t,n)},
// Returns a negated version of the passed-in predicate.
h.negate=function(n){return function(){return!n.apply(this,arguments)}},
// Returns a function that is the composition of a list of functions, each
// consuming the return value of the function that follows.
h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},
// Returns a function that will only be executed after being called N times.
h.after=function(n,t){return function(){if(--n<1)return t.apply(this,arguments)}},
// Returns a function that will only be executed before being called N times.
h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},
// Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.
h.once=h.partial(h.before,2),
// Object Functions
// ----------------
// Retrieve the names of an object's properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`
h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},
// Retrieve the values of an object's properties.
h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;u<r;u++)e[u]=n[t[u]];return e},
// Convert an object into a list of `[key, value]` pairs.
h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;u<r;u++)e[u]=[t[u],n[t[u]]];return e},
// Invert the keys and values of an object. The values must be serializable.
h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;e<u;e++)t[n[r[e]]]=r[e];return t},
// Return a sorted list of the function names available on the object.
// Aliased as `methods`
h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},
// Extend a given object with all the properties in passed-in object(s).
h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;e<u;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},
// Return a copy of the object only containing the whitelisted properties.
h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=v(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=a.apply([],o.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;c<f;c++)e=l[c],e in n&&(u[e]=n[e])}return u},
// Return a copy of the object without the blacklisted properties.
h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(a.apply([],o.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},
// Fill in a given object with default properties.
h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;t<r;t++){var e=arguments[t];for(var u in e)void 0===n[u]&&(n[u]=e[u])}return n},
// Create a (shallow-cloned) duplicate of an object.
h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},
// Invokes interceptor with the obj, and then returns obj.
// The primary purpose of this method is to "tap into" a method chain, in
// order to perform operations on intermediate results within the chain.
h.tap=function(n,t){return t(n),n};
// Internal recursive comparison function for `isEqual`.
var b=function(n,t,r,e){
// Identical objects are equal. `0 === -0`, but they aren't identical.
// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
if(n===t)return 0!==n||1/n===1/t;
// A strict comparison is necessary because `null == undefined`.
if(null==n||null==t)return n===t;
// Unwrap any wrapped objects.
n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);
// Compare `[[Class]]` names.
var u=l.call(n);if(u!==l.call(t))return!1;switch(u){
// Strings, numbers, regular expressions, dates, and booleans are compared by value.
case"[object RegExp]":
// RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
case"[object String]":
// Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
// equivalent to `new String("5")`.
return""+n==""+t;case"[object Number]":
// `NaN`s are equivalent, but non-reflexive.
// Object(NaN) is equivalent to NaN
// `NaN`s are equivalent, but non-reflexive.
// Object(NaN) is equivalent to NaN
return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":
// Coerce dates and booleans to numeric primitive values. Dates are compared by their
// millisecond representations. Note that invalid dates with millisecond representations
// of `NaN` are not equivalent.
return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(
// Assume equality for cyclic structures. The algorithm for detecting cyclic
// structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
var i=r.length;i--;)
// Linear search. Performance is inversely proportional to the number of
// unique nested structures.
if(r[i]===n)return e[i]===t;
// Objects with different constructors are not equivalent, but `Object`s
// from different frames are.
var o=n.constructor,a=t.constructor;if(o!==a&&
// Handle Object.create(x) cases
"constructor"in n&&"constructor"in t&&!(h.isFunction(o)&&o instanceof o&&h.isFunction(a)&&a instanceof a))return!1;
// Add the first object to the stack of traversed objects.
r.push(n),e.push(t);var c,f;
// Recursively compare objects and arrays.
if("[object Array]"===u){if(
// Compare array lengths to determine if a deep comparison is necessary.
c=n.length,f=c===t.length)
// Deep compare the contents, ignoring non-numeric properties.
for(;c--&&(f=b(n[c],t[c],r,e)););}else{
// Deep compare objects.
var s,p=h.keys(n);if(c=p.length,
// Ensure that both objects contain the same number of properties before comparing deep equality.
f=h.keys(t).length===c)for(;c--&&(
// Deep compare each member
s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}
// Remove the first object from the stack of traversed objects.
return r.pop(),e.pop(),f};
// Perform a deep comparison to check if two objects are equal.
h.isEqual=function(n,t){return b(n,t,[],[])},
// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},
// Is a given value a DOM element?
h.isElement=function(n){return!(!n||1!==n.nodeType)},
// Is a given value an array?
// Delegates to ECMA5's native Array.isArray
h.isArray=f||function(n){return"[object Array]"===l.call(n)},
// Is a given variable an object?
h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},
// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),
// Define a fallback version of the method in browsers (ahem, IE), where
// there isn't any inspectable "Arguments" type.
h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),
// Optimize `isFunction` if appropriate. Work around an IE 11 bug.
"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),
// Is a given object a finite number?
h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},
// Is the given value `NaN`? (NaN is the only number which does not equal itself).
h.isNaN=function(n){return h.isNumber(n)&&n!==+n},
// Is a given value a boolean?
h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},
// Is a given value equal to null?
h.isNull=function(n){return null===n},
// Is a given variable undefined?
h.isUndefined=function(n){return void 0===n},
// Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).
h.has=function(n,t){return null!=n&&c.call(n,t)},
// Utility Functions
// -----------------
// Run Underscore.js in *noConflict* mode, returning the `_` variable to its
// previous owner. Returns a reference to the Underscore object.
h.noConflict=function(){return n._=t,this},
// Keep the identity function around for default iteratees.
h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},
// Returns a predicate for checking whether an object has a given set of `key:value` pairs.
h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;e<r;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},
// Run a function **n** times.
h.times=function(n,t,r){var e=Array(Math.max(0,n));t=v(t,r,1);for(var u=0;u<n;u++)e[u]=t(u);return e},
// Return a random integer between min and max (inclusive).
h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},
// A (possibly faster) way to get the current timestamp as an integer.
h.now=Date.now||function(){return(new Date).getTime()};
// List of HTML entities for escaping.
var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),
// If the value of the named `property` is a function then invoke it with the
// `object` as context; otherwise, return it.
h.result=function(n,t){if(null!=n){var r=n[t];return h.isFunction(r)?n[t]():r}};
// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},
// By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.
h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};
// When customizing `templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};
// JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.
h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);
// Combine delimiters into one regular expression via alternation.
var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){
// Adobe VMs need the match returned to produce the correct offest.
return i+=n.slice(u,a).replace(O,F),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",
// If a variable is not specified, place data values in local scope.
t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var l=function(n){return o.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},
// Add a "chain" function. Start chaining a wrapped Underscore object.
h.chain=function(n){var t=h(n);return t._chain=!0,t};
// OOP
// ---------------
// If Underscore is called as a function, it returns a wrapped object that
// can be used OO-style. This wrapper holds altered versions of all the
// underscore functions. Wrapped objects may be chained.
// Helper function to continue chaining intermediate results.
var E=function(n){return this._chain?h(n).chain():n};
// Add your own custom functions to the Underscore object.
h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},
// Add all of the Underscore functions to the wrapper object.
h.mixin(h),
// Add all mutator Array functions to the wrapper.
h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),
// Add all accessor Array functions to the wrapper.
h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),
// Extracts the result from a wrapped and chained object.
h.prototype.value=function(){return this._wrapped},
// AMD registration happens at the end for compatibility with AMD loaders
// that may not enforce next-turn semantics on modules. Even though general
// practice for AMD registration is to be anonymous, underscore registers
// as a named module because, like jQuery, it is a base library that is
// popular enough to be bundled in a third party lib, but not be part of
// an AMD load request. Those cases could generate an error when an
// anonymous define() is called outside of a loader request.
"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);