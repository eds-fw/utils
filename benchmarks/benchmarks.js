//@ts-ignore
const Benchmark = require("benchmark");
const suite = new Benchmark.Suite;
const {
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
} = require("../dist/cjs/index");
let test, iterable5 = (function*() { let i = 0; while (index < 5) yield i++; })(), text5 = "word ".repeat(5), text500 = "word ".repeat(500), text50000 = "word ".repeat(50000);

suite
.add("(cjs) formatNumber(10num):", function() {
    test = formatNumber(1234567890);
})
.add("(cjs) includesAll(5elem, 5elem):", function() {
    test = includesAll([1,2,3,4,5], [1,2,3,4,5]);
})
.add("(cjs) await wait(1)", function() {
    test = wait(1);
})
.add("(cjs) arrayFromIterator(5elem)", function() {
    test = arrayFromIterator(iterable5);
})
.add("(cjs) random(1, 100)", function() {
    test = random(1, 100);
})
.add("(cjs) arrRandom(5elem)", function() {
    test = arrRandom([1,2,3,4,5]);
})
.add("(cjs) chanceRandom(5elem)", function() {
    test = chanceRandom({a:30,b:10,c:40,d:20,e:25});
})
.add("(cjs) equal(str5char)", function() {
    test = equal("abcde", "zxcvb");
})
.add("(cjs) equal(arr5elem)", function() {
    test = equal([1,2,3,4,5], [1,2,3,4,5]);
})
.add("(cjs) equal(obj5elem)", function() {
    test = equal({a:30,b:10,c:40,d:20,e:25}, {a:30,b:10,c:40,d:20,e:25});
})
.add("(cjs) quickTextCompare(5word)", function() {
    test = quickTextCompare(text5, text5);
})
.add("(cjs) quickTextCompare(500word)", function() {
    test = quickTextCompare(text500, text500);
})
.add("(cjs) quickTextCompare(50_000word)", function() {
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
*/