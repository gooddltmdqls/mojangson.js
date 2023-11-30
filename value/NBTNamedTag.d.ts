import { NBTTag } from "./NBTTag";
export declare class NBTNamedTag<T extends NBTTag> {
    private name;
    private tag;
    constructor(name: string, tag: T);
    getName(): string;
    getTag(): T;
    equals(other: any): any;
}
