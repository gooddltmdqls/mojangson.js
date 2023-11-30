import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";
export declare class NBTFloat extends NBTTag {
    private value;
    constructor(value: number);
    getValue(): number;
    getFloatValue(): number;
    setFloatValue(value: number): void;
    getType(): NBTType;
    toMSONString(): string;
    clone(): NBTFloat;
}
