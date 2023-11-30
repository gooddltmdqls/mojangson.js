import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";
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
