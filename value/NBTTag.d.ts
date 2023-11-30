import { NBTType } from "./NBTType";
export declare abstract class NBTTag {
    abstract getValue(): any;
    abstract getType(): NBTType;
    abstract toMSONString(): string;
    equals(obj: any): boolean;
    toString(): String;
}
