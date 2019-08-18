
<!--#echo json="package.json" key="name" underline="=" -->
sortedjson
==========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
JSON.stringify with keys sorted. Supports custom ordering, replacer and space.
<!--/#echo -->


Some features are inspired by [JSON.sortify][json-sortify]:

  * Hoping that the platform's native `JSON.stringify` will write the keys
    in the order they were added to the object, instead of re-implementing
    our own stringify.
  * Using a backup of the original `JSON.stringify` so it can be overwritten
    with this function.


Despite taking these ideas, this library was written anew from scratch
because I hope my version will be faster for default sort order with no
checks for circular reference.


API
---

### sortedJson(data[, replacer][, space])

Behaves like [native JSON.stringify][mdn-stfy], just with they keys sorted
in default `Array.prototype.sort()` order.

  * Non-standard `space`: Negative numbers mean to use `n=-space` space
    characters for indentation but removing the 2nd and 3rd character of
    the result if they happen to be a newline followed by a space character.
    In cases where `data` is an array or an object, removing that newline
    and space will put the first item or key on the same line as the opening
    bracket.
    Default: `-2`


### sortedJson(data, [replacer,] space[, sortOpts])

Like above, except if¹ you provide a number or a string as `space`,
you may optionally provide your own `sortOpts`, too, which can be
either a function or an options object.
A shallow copy of `sortOpts` will be passed as the `how` argument to
[`sortObj()`][deepsortobj], possibly with `keyPrefix` and `keySuffix`
modified so don't rely on them.
Some additional options in `sortOpts` are supported by `sortedJson`:

  * `stfy`: a function to use instead of the original (probably native)
    `JSON.stringify` in order to encode the sorted object.
    If a `replacer` is given as well, the `replacer` will always be applied
    using the original `JSON.stringify`.

(¹ Requires `space` because a function that has no `space` argument before
it could be confused with a `replacer` function.)


### sortedJson.preset([replacer,] space[, sortOpts])

Return a function that accepts one argument `data`,
remembers all the other arguments listed above,
calls `sortedJson with `data` and the above arguments,
and returns the result.


### sortedJson.sortObj(data[, sortOpts])

If `data` is an array or not an object, return it verbatim.
If it is a non-array object, return a copy that has its keys sorted
and all its non-array object values `.sortObj()`ed as well.




Usage
-----

From [test/usage.js](test/usage.js):

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="8" -->
```javascript
var sortedJson = require('sortedjson'), pets = {
  dog: { sounds: [ 'woof' ],            colors: [ 'grey', 'white' ] },
  cat: { colors: [ 'white', 'orange' ], sounds: [ 'meow', 'purr' ]  },
  ant: { colors: [ 'red', 'black' ] },
};
console.log(sortedJson(pets));
```
<!--/include-->

Output: [test/usage.json](test/usage.json)



<!--#toc stop="scan" -->


Known issues
------------

* Needs more/better tests and docs.
* Versions 0.1.x did not work around the array index priority problem
  described in [deepsortobj][deepsortobj].



Related projects
----------------

* [deepsortobj][deepsortobj], and the ones listed there
* [JSON.sortify][json-sortify]
* [sorted-json](https://github.com/pastgift/sorted-json-js)


  [json-sortify]: https://github.com/ThomasR/JSON.sortify
  [deepsortobj]: https://github.com/mk-pmb/deepsortobj-js
  [mdn-stfy]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify



License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
