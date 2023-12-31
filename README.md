# Brainfuck Compression Format
> A file format for brainfuck that supports lossless program compression.

![Endpoint Badge](https://img.shields.io/npm/dt/braincomp)
![Static Badge](https://img.shields.io/badge/License-GPL--3.0-blue)

# CLI Installation
Pre-built binaries for BCF can be downloaded at [the releases page](https://github.com/FluxFlu/bcf/releases/).

It can also be installed using the NPM as follows.

```sh
$ npm i braincomp -g
```

# Module Installation
BCF can also be used as a Node.js module that programs can include. This can be done as normal.

```sh
$ npm i braincomp
```

# Usage
BCF is run with the syntax `bcf [file.bf] options`.

```sh
$ bcf mandelbrot.bf --compress
```

# Licensing

BCF is licensed under the [GPL-3.0](https://github.com/FluxFlu/bcf/blob/main/LICENSE). A copy is included with the compiler.