import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";
export declare class NBTList<T extends NBTTag> extends NBTTag {
    private type;
    private list;
    constructor(type?: NBTType, ...value: T[]);
    size(): number;
    getValue(): T[];
    getType(): NBTType;
    getElementType(): NBTType | null;
    get(index: number): T;
    isEmpty(): boolean;
    add(value: T): void;
    addTo(index: number, value: T): void;
    addAll(values: T[]): void;
    equals(obj: any): boolean;
    toMSONString(): string;
    clone(): NBTList<T>;
}
