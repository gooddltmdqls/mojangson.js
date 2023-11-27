import { NBTString } from "./NBTString";
import { NBTTag } from "./NBTTag";

export class NBTNamedTag<T extends NBTTag> {

    private name: string;
    private tag: T;

    constructor(name: string, tag: T) {
        this.name = name;
        this.tag = tag;
    }

    public getName() {
        return this.name;
    }

    public getTag() {
        return this.tag;
    }
    
    public equals(other: any) {
        return other instanceof NBTNamedTag && other.name == this.name && other.tag.equals(this.tag);
    }
}