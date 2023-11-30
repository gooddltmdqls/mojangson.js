import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";
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
