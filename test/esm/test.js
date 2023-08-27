import {
    formatNumber,
    reportMemory,
    includesAll,
    wait,
    arrayFromIterator,

    random,
    arrRandom,
    chanceRandom,
    equal,
    quickTextCompare,
} from "../../dist/esm/index.js";
const iterableMap = new Map([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]);

;(async () => {
    console.log(`\tformatNumber(1234567890)\n\t\t${formatNumber(1234567890)}`);
    reportMemory();
    console.log(`\tincludesAll([1, 2, 3], [1, 2, 3]) includesAll([1, 2, 3], [4])\n\t\t${includesAll([1, 2, 3], [1, 2, 3])} ${includesAll([1, 2, 3], [4])} / true false [correct]`);
    console.log(`\tawait wait(1000)`);
    console.log(`\t\tbefore, time: ${Date.now()}`);
    await wait(1000);
    console.log(`\t\tafter, time: ${Date.now()}`);
    console.log(`\tarrayFromIterator(iterableMap.values())\n\t\t${arrayFromIterator(iterableMap.values())}`);

    console.log(`\nRANDOM: ====================`);
    console.log(`\trandom(1, 1000) x5\n\t\t${random(1, 1000)} ${random(1, 1000)} ${random(1, 1000)} ${random(1, 1000)} ${random(1, 1000)}`);
    console.log(`\tarrRandom([1, 2, 3, 4, 5]) x5\n\t\t${arrRandom([1, 2, 3, 4, 5])} ${arrRandom([1, 2, 3, 4, 5])} ${arrRandom([1, 2, 3, 4, 5])} ${arrRandom([1, 2, 3, 4, 5])} ${arrRandom([1, 2, 3, 4, 5])}`);
    console.log(`\tchanceRandom({ a: 30, b: 10, c: 20 }) x5\n\t\t${chanceRandom({ a: 30, b: 10, c: 20 })} ${chanceRandom({ a: 30, b: 10, c: 20 })} ${chanceRandom({ a: 30, b: 10, c: 20 })} ${chanceRandom({ a: 30, b: 10, c: 20 })} ${chanceRandom({ a: 30, b: 10, c: 20 })}`);
    
    console.log(`\nEQUAL: ====================`);
    console.log(`\t[primitive] equal(123, 123) equal(123, 987) equal("one", "one") equal("one", "two") equal(true, true) equal(true, false)\n\t\t${equal(123, 123)} ${equal(123, 987)} ${equal("one", "one")} ${equal("one", "two")} ${equal(true, true)} ${equal(true, false)}\n\t\ttrue false true false true false [correct]`);
    console.log(`\t[primitive] equal(123n, 123n) equal(123n, 987n) equal(Symbol('a'), Symbol('a')) equal(Symbol('a'), Symbol('b'))\n\t\t${equal(123n, 123n)} ${equal(123n, 987n)} ${equal(Symbol('a'), Symbol('a'))} ${equal(Symbol('a'), Symbol('b'))}\n\t\ttrue false false false [correct]`);
    console.log(`\t[primitive? (nullish)] equal(undefined, undefined) equal(undefined, null) equal(null, null) equal(NaN, NaN)\n\t\t${equal(undefined, undefined)} ${equal(undefined, null)} ${equal(null, null)} ${equal(NaN, NaN)}\n\t\ttrue false true false [critetia]`);
    console.log(`\t[referential] equal({}, {}) equal([], []) equal([], {}) equal({a:1,b:2}, {a:1,b:2}) equal({a:1,b:2}, {a:1,c:3}) equal([1,2,3], [1,2,3]) equal([1,2,3], [9,8,7])\n\t\t${equal({}, {})} ${equal([], [])} ${equal([], {})} ${equal({a:1,b:2}, {a:1,b:2})} ${equal({a:1,b:2}, {a:1,c:3})} ${equal([1,2,3], [1,2,3])} ${equal([1,2,3], [9,8,7])}\n\t\ttrue true false true false true false`);
    
    console.log(`\nQUICK TEXT COMPARE: ====================`);
    console.log(`\tquickTextCompare("first text of 5 words", "first text of 5 words")\n\t\t${quickTextCompare("first text of 5 words", "first text of 5 words")} / true [correct]`);
    console.log(`\tquickTextCompare("first text of 5 words", "second text of 5 words")\n\t\t${quickTextCompare("first text of 5 words", "second text of 5 words")} / true [correct]`);
    console.log(`\tquickTextCompare("first text of 5 words", "my second text of 6 words")\n\t\t${quickTextCompare("first text of 5 words", "my second text of 6 words")} / false [correct]`);
})();