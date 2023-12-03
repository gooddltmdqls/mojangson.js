import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export declare class NBTEnd extends NBTTag {
    static INSTANCE: NBTEnd;
    private NBTEnd;
    getValue(): null;
    getType(): NBTType;
    equals(obj: any): boolean;
    toMSONString(): string;
    clone(): NBTEnd;
}
