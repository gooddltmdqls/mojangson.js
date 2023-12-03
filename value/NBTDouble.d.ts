import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export declare class NBTDouble extends NBTTag {
    private value;
    constructor(value: number);
    getValue(): number;
    getDoubleValue(): number;
    setDoubleValue(value: number): void;
    getType(): NBTType;
    toMSONString(): string;
    clone(): NBTDouble;
}
