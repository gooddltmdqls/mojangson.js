import { NBTType } from "./NBTType.js";
export declare abstract class NBTTag {
    abstract getValue(): any;
    abstract getType(): NBTType;
    abstract toMSONString(): string;
    equals(obj: any): boolean;
    toString(): String;
}
