import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";
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
