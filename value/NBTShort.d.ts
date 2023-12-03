import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export declare class NBTShort extends NBTTag {
    private value;
    constructor(value: number);
    getValue(): number;
    getShortValue(): number;
    setShortValue(value: number): void;
    getType(): NBTType;
    toMSONString(): string;
    clone(): NBTShort;
}
