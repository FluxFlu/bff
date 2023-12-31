# Brainfuck Compression Format
> A file format for brainfuck that supports lossless program compression.

![Endpoint Badge](https://img.shields.io/npm/dt/braincomp)
![Static Badge](https://img.shields.io/badge/License-GPL--3.0-blue)

# CLI Installation
Pre-built binaries for BFF can be downloaded at [the releases page](https://github.com/FluxFlu/bff/releases/).

It can also be installed using the NPM as follows.

```sh
$ npm i braincomp -g
```

# Module Installation
BFF can also be used as a Node.js module that programs can include. This can be done as normal.

```sh
$ npm i braincomp
```

# Usage
BFF is run with the syntax `bff [file.bf] options`.

```sh
$ bff mandelbrot.bf --compress
```

# Licensing

BFF is licensed under the [GPL-3.0](https://github.com/FluxFlu/bff/blob/main/LICENSE). A copy is included with the compiler.