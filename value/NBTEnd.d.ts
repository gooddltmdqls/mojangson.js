import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";
export declare class NBTEnd extends NBTTag {
    static INSTANCE: NBTEnd;
    private NBTEnd;
    getValue(): null;
    getType(): NBTType;
    equals(obj: any): boolean;
    toMSONString(): string;
    clone(): NBTEnd;
}
