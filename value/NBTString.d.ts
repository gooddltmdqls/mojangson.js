import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";
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
