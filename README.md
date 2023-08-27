<p align="center">
    <img src="https://avatars.githubusercontent.com/u/142582396?s=400&u=081f3176405a243f5090002723556c3e723089e3&v=4" width="200"/>
</p>

<b align="center">
    
    Tiny TypeScript utils: wait(), arrayFromIterator(), chanceRandom(), equal() and more
    
</b>
<hr>

# API
- `formatNumber(x: number): string`
- `reportMemory(): void`
- `random(min: number, max: number): number`
- `arrRandom(arr: any[]): any`
- `chanceRandom(elements: { [key: string]: number }): string`
- `equal(v1: any, v2: any): boolean`
- `quickTextCompare(text1: string, text2: string): boolean`
- `includesAll(arr: any[], values: any[]): boolean`
- `arrayFromIterator(iterator: IterableIterator<any>): any[]`
- *async* `wait(time_ms: number): Promise<void>`

# Requirements
- [NodeJS](https://nodejs.org/en), recommended `v18` or newer

# Setup
1. Install `utils` via npm:
```bat
npm i @easy-ds-bot/utils
```

2. Use `utils`:
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

# Benchmarks
```
(cjs) formatNumber(10num): x 2,252,317 ops/sec ±0.92% (87 runs sampled)
(cjs) includesAll(5elem, 5elem): x 27,021,264 ops/sec ±1.62% (92 runs sampled)
(cjs) await wait(1) x 737,596 ops/sec ±3.04% (76 runs sampled)
(cjs) arrayFromIterator(5elem):
(cjs) random(1, 100) x 91,501,458 ops/sec ±2.01% (86 runs sampled)
(cjs) arrRandom(5elem) x 92,061,808 ops/sec ±4.58% (88 runs sampled)
(cjs) chanceRandom(5elem) x 2,197,700 ops/sec ±0.36% (95 runs sampled)
(cjs) equal(str5char) x 194,625,122 ops/sec ±1.45% (91 runs sampled)
(cjs) equal(arr5elem) x 193,778,653 ops/sec ±1.28% (91 runs sampled)
(cjs) equal(obj5elem) x 5,905,956 ops/sec ±1.90% (86 runs sampled)
(cjs) quickTextCompare(5word) x 1,099,023 ops/sec ±1.48% (94 runs sampled)
(cjs) quickTextCompare(500word) x 21,729 ops/sec ±8.20% (79 runs sampled)
(cjs) quickTextCompare(50_000word) x 208 ops/sec ±1.79% (76 runs sampled)

(esm) formatNumber(10num): x 2,181,306 ops/sec ±2.01% (92 runs sampled)
(esm) includesAll(5elem, 5elem): x 22,414,885 ops/sec ±10.02% (79 runs sampled)
(esm) await wait(1) x 757,943 ops/sec ±3.41% (71 runs sampled)
(esm) arrayFromIterator(5elem):
(esm) random(1, 100) x 91,093,429 ops/sec ±1.08% (89 runs sampled)
(esm) arrRandom(5elem) x 83,803,868 ops/sec ±3.04% (88 runs sampled)
(esm) chanceRandom(5elem) x 2,029,170 ops/sec ±1.58% (87 runs sampled)
(esm) equal(str5char) x 167,883,950 ops/sec ±5.04% (81 runs sampled)
(esm) equal(arr5elem) x 150,356,521 ops/sec ±7.22% (88 runs sampled)
(esm) equal(obj5elem) x 4,846,467 ops/sec ±6.70% (74 runs sampled)
(esm) quickTextCompare(5word) x 982,934 ops/sec ±3.75% (84 runs sampled)
(esm) quickTextCompare(500word) x 23,448 ops/sec ±3.43% (84 runs sampled)
(esm) quickTextCompare(50_000word) x 213 ops/sec ±2.49% (84 runs sampled)
```

# [Source (git)](https://github.com/easy-ds-bot/utils)
# [Issues (git)](https://github.com/easy-ds-bot/utils/issues)
