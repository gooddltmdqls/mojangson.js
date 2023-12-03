import { NBTList } from "./NBTList.js";
import { NBTNamedTag } from "./NBTNamedTag.js";
import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export declare class NBTCompound extends NBTTag {
    private static SIMPLE_STRING;
    private value;
    constructor(value?: (Map<String, NBTTag> | NBTNamedTag<any>[]));
    size(): number;
    getValue(): Map<String, NBTTag>;
    getType(): NBTType;
    getTag(key: string): NBTTag | undefined;
    getByte(key: string): number;
    getShort(key: string): number;
    getInt(key: string): number;
    getLong(key: string): number;
    getFloat(key: string): number;
    getDouble(key: string): number;
    getByteArray(key: string): number[];
    getString(key: string): string;
    getList(key: string): any[];
    getTagList(key: string): NBTList<any>;
    getCompound(key: string): Map<String, NBTTag>;
    getCompoundTag(key: string): NBTCompound;
    getIntArray(key: string): number[];
    getLongArray(key: string): number[];
    getKeys(): IterableIterator<string>;
    isEmpty(): boolean;
    hasKey(key: string): boolean;
    hasKeyOfType(key: string, type: NBTType): boolean;
    put(name: string, tag: NBTTag): void;
    putByteArray(key: string, value: number[]): void;
    putByte(key: string, value: number): void;
    putDouble(key: string, value: number): void;
    putFloat(key: string, value: number): void;
    putIntArray(key: string, value: number[]): void;
    putLongArray(key: string, value: number[]): void;
    putInt(key: string, value: number): void;
    putLong(key: string, value: number): void;
    putShort(key: string, value: number): void;
    putString(key: string, value: string): void;
    removeKey(key: string): void;
    forEach(action: (key: String, value: NBTTag) => any): void;
    equals(obj: any): boolean;
    toMSONString(): string;
}
