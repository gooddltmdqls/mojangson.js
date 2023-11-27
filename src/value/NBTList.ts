import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";

export class NBTList<T extends NBTTag> extends NBTTag {
    private type: NBTType | null;
    
    private list: Array<T>  = [];

    constructor(type?: NBTType, ...value: T[]) {
        super();

        this.type = type ?? null;
        if (value) this.list.concat(...value);
    }

    public size() {
        return this.list.length;
    }
    
    public getValue() {
        return this.list;
    }
    
    public getType() {
        return NBTType.LIST;
    }

    public getElementType() {
        return this.type;
    }

    public get(index: number) {
        return this.list[index];
    }
    
    public isEmpty() {
        return !this.list.length;
    }

    public add(value: T) {
        if (this.type == null)
            this.type = value.getType();
        else if (this.type != value.getType())
            throw new TypeError(value.getType() + " is not of expected type " + this.type);
        this.list.push(value);
    }
    
    public addTo(index: number, value: T) {
        if (index < 0 || index >= this.size())
            throw new IndexOutOfBoundsException(String(index));
        if (this.type == null)
            this.type = value.getType();
        if (this.type != value.getType())
            throw new TypeError(value.getType() + " is not of expected type " + this.type);
        this.list.splice(index, 0, value);
    }
    
    public addAll(values: T[]) {
        for (let value of values) {
            this.add(value);
        }
    }
    
    public equals(obj: any) {
        return obj instanceof NBTList && obj.toMSONString() == this.toMSONString();
    }

    public toMSONString() {
        let output = "[";
        for (let i = 0; i < this.list.length; i++) {
            if (i != 0) {
                output += ',';
            }
            output += String(this.list[i]);
        }
        return output += "]";
    }
    
    public clone() {
        return new NBTList(this.type ?? undefined, ...this.list);
    }

}

class IndexOutOfBoundsException extends Error {}