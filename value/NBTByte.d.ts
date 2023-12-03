import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export declare class NBTByte extends NBTTag {
    private value;
    constructor(value: number);
    getValue(): number;
    getByteValue(): number;
    setByteValue(value: number): void;
    getType(): NBTType;
    toMSONString(): string;
    clone(): NBTByte;
}
