A very, very simple transpiler that uses Ohm-JS to transpile a bit of Tiny Basic into Python.

I've purposefully left a lot of the transpiler unimplemented as "an exercise to the reader"[^1].  I hope that you find inspiration in this knock-off work. I hope to prove to you that building transpilers is ridiculously easy (10-ish minutes).

`tinybasic.js` is an identity transpiler. It inputs some BASIC code and spits it out (mangling the spacing in the process (It is possible to build a true identity transpiler, see my other essays)).

`tinybasic2python.js` transpiles BASIC and outputs runnable Python code. In this case, the output goes into the file `out.py`.

To run the python code
```
> python out.py
```

See run.bash for details on how to run all of this stuff.

See the [grasem manual](https://guitarvydas.github.io/2021/04/11/Grasem.html) for instructions on how to write grasem specs (which will point you to the _glue_ manual).

See the [Ohm-JS documentation](https://github.com/harc/ohm) for instructions on how to write PEG grammars in Ohm-JS (as easy as using REGEX). _Grasem_ uses _Ohm-JS_ and _glue_ to do its work, you don't need to use these tools separately (but, you are welcome to dig deeper, if you feel inspired).

If you are offended by my rampant Cut&Paste (aka RY, as opposed to DRY), see the M4 tool.

FYI: GOTO is not implemented, but, first-class functions and CPS syle will do the job.

[aside: The file `foreign.js` must appear in the working directory. It is meant to house interesting bits of JS that are used by the transpiler. Foreign.js is empty for this very, very simple example.]

[aside: _Glue_ sees "}}" as being special, we use "}\}" instead].

[^1]: Well, and, writing transpilers with Ohm-JS and Glue, is sooo easy that it bores me to go further with this.
