import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";
export declare class NBTLongArray extends NBTTag {
    private value;
    constructor(value: number[]);
    length(): number;
    getValue(): number[];
    getType(): NBTType;
    equals(obj: any): boolean;
    toMSONString(): string;
}
