import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export declare class NBTInt extends NBTTag {
    private value;
    constructor(value: number);
    getValue(): number;
    getIntValue(): number;
    setIntValue(value: number): void;
    getType(): NBTType;
    toMSONString(): string;
    clone(): NBTInt;
}
