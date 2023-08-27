//@ts-ignore
const suite = require("benchmark").Suite;
const bench = new suite;
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

bench.add("formatNumber(10num):", function() {
    test = formatNumber(1234567890);
})
.add("includesAll(5elem, 5elem):", function() {
    test = includesAll([1,2,3,4,5], [1,2,3,4,5]);
})
.add("await wait(1)", function() {
    test = wait(1);
})
.add("arrayFromIterator(5elem)", function() {
    test = arrayFromIterator(iterable5);
})
.add("random(1, 100)", function() {
    test = random(1, 100);
})
.add("arrRandom(5elem)", function() {
    test = arrRandom([1,2,3,4,5]);
})
.add("chanceRandom(5elem)", function() {
    test = chanceRandom({a:30,b:10,c:40,d:20,e:25});
})
.add("equal(str5char)", function() {
    test = equal("abcde", "zxcvb");
})
.add("equal(arr5elem)", function() {
    test = equal([1,2,3,4,5], [1,2,3,4,5]);
})
.add("equal(obj5elem)", function() {
    test = equal({a:30,b:10,c:40,d:20,e:25}, {a:30,b:10,c:40,d:20,e:25});
})
.add("quickTextCompare(5word)", function() {
    test = quickTextCompare(text5, text5);
})
.add("quickTextCompare(500word)", function() {
    test = quickTextCompare(text500, text500);
})
.add("quickTextCompare(50_000word)", function() {
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
*/