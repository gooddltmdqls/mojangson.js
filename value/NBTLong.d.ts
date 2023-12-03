import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export declare class NBTLong extends NBTTag {
    private value;
    constructor(value: number);
    getValue(): number;
    getLongValue(): number;
    setLongValue(value: number): void;
    getType(): NBTType;
    toMSONString(): string;
    clone(): NBTLong;
}
