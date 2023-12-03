import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export declare class NBTString extends NBTTag {
    private value;
    constructor(value: string);
    getValue(): string;
    setValue(value: string): void;
    getType(): NBTType;
    toMSONString(): string;
    clone(): NBTString;
    static toMSONString(str: String): string;
}
