import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export declare class NBTIntArray extends NBTTag {
    private value;
    constructor(value: number[]);
    length(): number;
    getValue(): number[];
    getType(): NBTType;
    equals(obj: any): boolean;
    toMSONString(): string;
}
