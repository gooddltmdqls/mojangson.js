import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";
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
