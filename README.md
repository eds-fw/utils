<p align="center">
    <img src="https://avatars.githubusercontent.com/u/142582396?s=400&u=081f3176405a243f5090002723556c3e723089e3&v=4" width="200"/>
</p>

<b align="center">
    
    Tiny TypeScript utils: wait(), arrayFromIterator(), chanceRandom(), equal() and more
    
</b>
<hr>

# API
**Synchronous:**
- `formatNumber(x: number): string`
- `reportMemory(): void`
- `random(min: number, max: number): number`
- `arrRandom(arr: any[]): any`
- `chanceRandom(elements: { [key: string]: number }): string`
- `equal(v1: any, v2: any): boolean`
- `quickTextCompare(text1: string, text2: string): boolean`
- `includesAll(arr: any[], values: any[]): boolean`
- `arrayFromIterator(iterator: IterableIterator<any>): any[]`

**Promises:**
- `wait(time_ms: number): Promise<void>`
# Requirements
- [NodeJS](https://nodejs.org/en), recommended `v18` or newer
# Setup
1. Install `utils` via npm:
```bat
npm i @easy-ds-bot/utils
```

2. Use it in your project:
```js
// file.js, type: CJS
const { random, arrRandom } = require("@easy-ds-bot/utils");
let colors = ["red", "green", "blue"];
console.log(`Random int: ${random(1, 100)}, random color: ${arrRandom(colors)}`);
//> Random int: 32, random color: blue
//...it is one of 300 variants
```
...or:
```js
// file.js, type: ESM
import { random, arrRandom } from "@easy-ds-bot/utils";
let colors = ["red", "green", "blue"];
console.log(`Random int: ${random(1, 100)}, random color: ${arrRandom(colors)}`);
//> Random int: 32, random color: blue
//...it is one of 300 variants
```

# Benchmark
```
formatNumber(10num): x 2,148,840 ops/sec ±2.24% (88 runs sampled)
includesAll(5elem, 5elem): x 27,266,638 ops/sec ±1.76% (93 runs sampled)
await wait(1) x 763,328 ops/sec ±3.00% (79 runs sampled)
arrayFromIterator(5elem): 
random(1, 100) x 94,517,357 ops/sec ±0.92% (87 runs sampled)
arrRandom(5elem) x 95,086,408 ops/sec ±0.52% (94 runs sampled)
chanceRandom(5elem) x 2,063,074 ops/sec ±1.68% (93 runs sampled)
equal(str5char) x 198,447,672 ops/sec ±0.21% (93 runs sampled)
equal(arr5elem) x 202,415,487 ops/sec ±0.17% (95 runs sampled)
equal(obj5elem) x 6,218,884 ops/sec ±0.39% (97 runs sampled)
quickTextCompare(5word) x 1,142,553 ops/sec ±0.22% (97 runs sampled)
quickTextCompare(500word) x 26,003 ops/sec ±0.24% (95 runs sampled)
quickTextCompare(50_000word) x 224 ops/sec ±0.66% (82 runs sampled)
```

# [Source (git)](https://github.com/easy-ds-bot/utils)
# [Issues (git)](https://github.com/easy-ds-bot/utils/issues)
