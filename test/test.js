const {
    formatNumber,
    reportMemory,
    includesAll,
    wait,

    random,
    arrRandom,
    chanceRandom,
    equal,
    VersionBits
} = await import("../index.mjs");

;(async () => {
    console.log(`\tformatNumber(1234567890)\n\t\t${formatNumber(1234567890)}`);
    reportMemory();
    console.log(`\tincludesAll([1, 2, 3], [1, 2, 3]) includesAll([1, 2, 3], [4])\n\t\t${includesAll([1, 2, 3], [1, 2, 3])} ${includesAll([1, 2, 3], [4])}, must be: true false [correct]`);
    console.log(`\tawait wait(1000)`);
    console.log(`\t\tbefore, time: ${Date.now()}`);
    await wait(1000);
    console.log(`\t\tafter, time: ${Date.now()}`);

    console.log(`\nRANDOM: ====================`);
    console.log(`\trandom(1, 1000) x5\n\t\t${random(1, 1000)} ${random(1, 1000)} ${random(1, 1000)} ${random(1, 1000)} ${random(1, 1000)}`);
    console.log(`\tarrRandom([1, 2, 3, 4, 5]) x5\n\t\t${arrRandom([1, 2, 3, 4, 5])} ${arrRandom([1, 2, 3, 4, 5])} ${arrRandom([1, 2, 3, 4, 5])} ${arrRandom([1, 2, 3, 4, 5])} ${arrRandom([1, 2, 3, 4, 5])}`);
    console.log(`\tchanceRandom({ a: 30, b: 10, c: 20 }) x5\n\t\t${chanceRandom({ a: 30, b: 10, c: 20 })} ${chanceRandom({ a: 30, b: 10, c: 20 })} ${chanceRandom({ a: 30, b: 10, c: 20 })} ${chanceRandom({ a: 30, b: 10, c: 20 })} ${chanceRandom({ a: 30, b: 10, c: 20 })}`);
    
    console.log(`\nEQUAL: ====================`);
    console.log(`\t[primitive] equal(123, 123) equal(123, 987) equal("one", "one") equal("one", "two") equal(true, true) equal(true, false)\n\t\t${equal(123, 123)} ${equal(123, 987)} ${equal("one", "one")} ${equal("one", "two")} ${equal(true, true)} ${equal(true, false)}\n\t\ttrue false true false true false [must be]`);
    console.log(`\t[primitive] equal(123n, 123n) equal(123n, 987n) equal(Symbol('a'), Symbol('a')) equal(Symbol('a'), Symbol('b'))\n\t\t${equal(123n, 123n)} ${equal(123n, 987n)} ${equal(Symbol('a'), Symbol('a'))} ${equal(Symbol('a'), Symbol('b'))}\n\t\ttrue false false false [must be]`);
    console.log(`\t[primitive? (nullish)] equal(undefined, undefined) equal(undefined, null) equal(null, null) equal(NaN, NaN)\n\t\t${equal(undefined, undefined)} ${equal(undefined, null)} ${equal(null, null)} ${equal(NaN, NaN)}\n\t\ttrue false true false [must be]`);
    console.log(`\t[referential] equal({}, {}) equal([], []) equal([], {}) equal({a:1,b:2}, {a:1,b:2}) equal({a:1,b:2}, {a:1,c:3}) equal([1,2,3], [1,2,3]) equal([1,2,3], [9,8,7])\n\t\t${equal({}, {})} ${equal([], [])} ${equal([], {})} ${equal({a:1,b:2}, {a:1,b:2})} ${equal({a:1,b:2}, {a:1,c:3})} ${equal([1,2,3], [1,2,3])} ${equal([1,2,3], [9,8,7])}\n\t\ttrue true false true false true false [must be]`);

    const vers_1r = "1.0.2";
    const vers_1 = VersionBits.from(vers_1r);
    console.log(vers_1);
    VersionBits.increase(vers_1, "minor");
    console.log(vers_1);
})();