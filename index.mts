import arr_equal from "array-equal";
import obj_equal from "fast-deep-equal";
import { readdirSync, statSync } from "fs";
import { join as path_join, sep } from "path";
import { setTimeout } from "timers/promises";

/**
 * Nicely divides a number into units, tens, hundreds, thousands, etc. Example: `1234567` -> `1 234 567`
 */
export function formatNumber(x: number): string
{
    return x.toString().split('').reverse().map(($, i) => (i + 1) % 3 > 0 ? $ : ' ' + $).reverse().join('').trim();
}

/**
 * Prints to the console information about the memory usage of the given process.
 */
export function reportMemory(): void
{
    let prUsage = formatNumber(process.memoryUsage().heapUsed);
    let prTotal = formatNumber(process.memoryUsage().heapTotal);

    let kUsage = formatNumber(Math.floor(process.memoryUsage().heapUsed / 1024));
    let kTotal = formatNumber(Math.floor(process.memoryUsage().heapTotal / 1024));

    console.log(" __________________________________________________");
    console.log(`| ${prUsage} B${" ".repeat(24 - prUsage.split('').length)}/ ${prTotal} B`);
    console.log(`| ${kUsage} KB${" ".repeat(23 - kUsage.split('').length)}/ ${kTotal} KB`);
    console.log("|__________________________________________________");
}

/**
 * Returns pseudo-random number from `min` to `max`
 */
export function random(min: number, max: number): number
{
    return Math.floor(Math.random() * (max + 1)) + min;
}

/**
 * Returns a random array element
 */
export function arrRandom<T>(arr: T[]): T
{
    return arr[random(0, arr.length - 1)];
}

/**
 * Returns a random key of the specified object with a chance equal to the value of this key
 * 
 * Algorithm: https://github.com/jotson/LootTable.js
 * @param elements object as {"key": chance}
 */
export function chanceRandom(elements: Record<string, number>): string
{
    const table = Object.entries(elements);
    let i;
    let totalWeight = 0;
    
    for (i = 0; i < table.length; i++)
        totalWeight += table[i][1];

    let choice = 0;
    const randomNumber = Math.floor(Math.random() * totalWeight + 1);

    let weight = 0;
    for (i = 0; i < table.length; i++)
    {
        weight += table[i][1];
        if (randomNumber <= weight)
        {
            choice = i;
            break;
        }
    }

    return table[choice][0];
}

/**
 * Checks for equality data of primitive and reference types
 */
export function equal(v1: any, v2: any): boolean
{
    if (v1 === v2) return true;
    else if (Array.isArray(v1) && Array.isArray(v2) && arr_equal(v1, v2)) return true;
    else if (typeof v1 == "object" && typeof v2 == "object" && obj_equal(v1, v2)) return true;
    else return false;
}

/**
 * Fluently compares texts for the presence of the same
 */
export function quickTextCompare(text1: string, text2: string): boolean
{
    let v1w = text1.split(' '), v1eq = 0;
    let v2w = text2.split(' '), v2eq = 0;
    let inaccuracy = Math.floor(v1w.length / 15) || 1;
    for (const word of v1w)
        if (v2w.includes(word))
            v1eq++;
    for (const word of v2w)
        if (v1w.includes(word))
            v2eq++;
    if (v1eq + inaccuracy >= v2eq
        && v2eq + inaccuracy >= v1eq
        && v1eq + (inaccuracy * 1.5) >= v1w.length
        && v2eq + (inaccuracy * 1.5) >= v2w.length
    ) return true;
    else return false;
}

/**
 * Checks if an array contains all specified values
 */
export function includesAll<T extends any[]>(arr: T, values: T): boolean
{
    for (const value of values)
        if (!arr.includes(value)) return false;
    return true;
}

/**
 * Stops code execution for the specified duration
 */
export async function wait(time_ms: number): Promise<void>
{
    await setTimeout(time_ms);
}

/**
 * Creates a [deep copy](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) of an object
 * 
 * Supports only serializable objects (JSON-like)
 */
export function deepCopy<T extends JSONLikeObj>(source: T): T
{
    return JSON.parse(JSON.stringify(source)) as T;
}

export namespace VersionBits
{
    export const zeroVersion = [0, 0];
    export const delimiter = '.';

    export function from(input: string): number[]
    {
        return Object.assign([], zeroVersion, input.split(delimiter).map(_ => Number(_))) as unknown as number[];
    }
    export function sum(version: number[], to_add: number[])
    {
        Object.assign(version, Object.assign(to_add.map(() => 0), version));
        console.log(version)
        to_add.forEach((x, i) => version[i] += x);
    }
    export function toString(version: number[]): string
    {
        return version.filter((x, i) => i > 1 ? x != 0 : true).join(delimiter);
    }
    /**
     * @param majority `0` is 'patch', `1` is 'minor', `2` is 'major'
     */
    export function increase(version: number[], count: number, majority: number)
    {
        const reversed_majority = version.length - majority - 1;
        version[reversed_majority] += count;
        if (reversed_majority + 1 < version.length)
            for (let i = reversed_majority + 1; i < version.length; i++)
                version[i] = 0;
    }

}

//@ts-expect-error
Symbol.dispose ??= "__dispose";

/**
 * When the number of elements reaches the limit, the `PacketBuffer` is drained
 */
export class PacketBuffer<T> implements Disposable
{
    #total_elements_count = 0;
    private stack: T[] = [];

    public constructor(
        private drain_callback: (items: T[]) => unknown,
        private limit: number,
        private auto_drain = true
    ) {}

    /**
     * Number of elements for all time
     */
    public get total_elements_count()
        { return this.#total_elements_count; }
    public put(item: T)
    {
        this.#total_elements_count++;
        this.stack.push(item);
        this._check_limit();
    }
    public async forceDrain()
    {
        for (const output_elements of splitIntoPortions(this.stack, this.limit))
            await this.drain_callback(output_elements);
        this.stack = [];
    }

    private _check_limit()
    {
        if (this.auto_drain && this.stack.length >= this.limit)
            this.forceDrain();
    }

    public [Symbol.dispose] ()
    {
        if (this.stack.length > 0)
            this.forceDrain();
    }
}


/**
 * Splits `[0,1,2,3,4,5,6,7,8,9]` to `[[0,1,2], [3,4,5], [6,7,8], [9]]` (if portionSize=3)
 */
export function splitIntoPortions<T>(arr: T[], portionSize: number): T[][]
{
    if (arr.length <= portionSize)
        return [arr];
    const output: T[][] = [];
    for (let i = 0; i < arr.length; i++)
        if (i % portionSize == 0)
            output.push([arr[i]]);
        else output.at(-1)?.push(arr[i]);
    return output;
}

/**
 * Expands the tree of the specified folder
 */
export function expandDir(dir_path: string): string[]
{
    const buffer: string[] = [];
    _expandDir(dir_path, buffer);
    if (dir_path.startsWith('./') || dir_path.startsWith('.\\'))
        return buffer.map(path => '.' + sep + path);
    return buffer;
}
function _expandDir(dir_path: string, /*ref*/ buffer: string[])
{
    const files = readdirSync(dir_path);

    files.forEach(file => {
        const filePath = path_join(dir_path, file);
        const fileStat = statSync(filePath);
        
        buffer.push(filePath);

        if (fileStat.isDirectory())
            expandDir(filePath);
    });
}

type SerializableTypes = string | number | boolean | object | null;
export type JSONSupported = SerializableTypes | SerializableTypes[];
export type JSONLikeObj = Record<string, JSONSupported>;
