# stream-transformers

[![Node.js CI](https://github.com/ksm2/stream-transformers/actions/workflows/node.js.yml/badge.svg)](https://github.com/ksm2/stream-transformers/actions/workflows/node.js.yml)
[![NPM version](https://img.shields.io/npm/v/stream-transformers)](https://www.npmjs.com/package/stream-transformers)
[![license](https://img.shields.io/github/license/ksm2/stream-transformers)](https://opensource.org/licenses/MIT)
![TypeScript types](https://img.shields.io/npm/types/stream-transformers)

> Reusable stream transformers for [WHATWG Streams] similar to ReactiveX Operators

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Operators](#operators)
- [Contributing](#contributing)
- [See Also](#see-also)
- [License](#license)

## Install

Use either

    yarn add stream-transformers

or

    npm install stream-transformers

## Usage

This module allows you to test [WHATWG Streams] with [Marble Syntax] in Jest.

```js
import { ReadableStream } from "isomorphic-streams";
import { filter, map } from "stream-transformers";

const SECOND = 1000;

const stream = new ReadableStream({
  start(controller) {
    let index = 0;
    setInterval(() => {
      controller.enqueue(index);
      index += 1;
    }, SECOND);
  },
});

const output = stream.pipeThrough(map((it) => it * 2)).pipeThrough(filter((it) => it < 10));

for await (const value of output) {
  console.dir(value);
}
```

## Operators

<!-- OPERATORS -->

## Contributing

This project is open to feedback and contributions, [please open an issue](https://github.com/ksm2/stream-transformers/issues).

`stream-transformers` follows the [Contributor Covenant] Code of Conduct.

## See Also

Also have a look at the following NPM Packages:

- [isomorphic-streams](https://github.com/ksm2/isomorphic-streams) - Isomorphic package for WHATWG Streams in Node.js and the browser.
- [jest-stream-marbles](https://github.com/ksm2/jest-stream-marbles) - Jest extension to test WHATWG Streams with marble syntax.

## License

MIT © 2021 Konstantin Möllers, see [LICENSE].

[whatwg streams]: https://streams.spec.whatwg.org/
[license]: https://github.com/ksm2/stream-transformers/blob/main/LICENSE
[contributor covenant]: https://github.com/ksm2/stream-transformers/blob/main/CODE_OF_CONDUCT.md
