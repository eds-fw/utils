//@ts-ignore
import Benchmark from "benchmark";
const suite = new Benchmark.Suite;
import {
    formatNumber,
    //reportMemory, press F to logs
    includesAll,
    wait,
    arrayFromIterator,

    random,
    arrRandom,
    chanceRandom,
    equal,
    quickTextCompare,
} from "../../dist/esm/index.js";
let test, iterable5 = (function*() { let i = 0; while (index < 5) yield i++; })(), text5 = "word ".repeat(5), text500 = "word ".repeat(500), text50000 = "word ".repeat(50000);

suite
.add("(esm) formatNumber(10num):", function() {
    test = formatNumber(1234567890);
})
.add("(esm) includesAll(5elem, 5elem):", function() {
    test = includesAll([1,2,3,4,5], [1,2,3,4,5]);
})
.add("(esm) await wait(1)", function() {
    test = wait(1);
})
.add("(esm) arrayFromIterator(5elem)", function() {
    test = arrayFromIterator(iterable5);
})
.add("(esm) random(1, 100)", function() {
    test = random(1, 100);
})
.add("(esm) arrRandom(5elem)", function() {
    test = arrRandom([1,2,3,4,5]);
})
.add("(esm) chanceRandom(5elem)", function() {
    test = chanceRandom({a:30,b:10,c:40,d:20,e:25});
})
.add("(esm) equal(str5char)", function() {
    test = equal("abcde", "zxcvb");
})
.add("(esm) equal(arr5elem)", function() {
    test = equal([1,2,3,4,5], [1,2,3,4,5]);
})
.add("(esm) equal(obj5elem)", function() {
    test = equal({a:30,b:10,c:40,d:20,e:25}, {a:30,b:10,c:40,d:20,e:25});
})
.add("(esm) quickTextCompare(5word)", function() {
    test = quickTextCompare(text5, text5);
})
.add("(esm) quickTextCompare(500word)", function() {
    test = quickTextCompare(text500, text500);
})
.add("(esm) quickTextCompare(50_000word)", function() {
    test = quickTextCompare(text50000, text50000);
})

.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });

/* RESULT:
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
*/