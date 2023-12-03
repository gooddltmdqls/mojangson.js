import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTList extends NBTTag {
    type;
    list = [];
    constructor(type, ...value) {
        super();
        this.type = type ?? null;
        if (value)
            this.addAll(value);
    }
    size() {
        return this.list.length;
    }
    getValue() {
        return this.list;
    }
    getType() {
        return NBTType.LIST;
    }
    getElementType() {
        return this.type;
    }
    get(index) {
        return this.list[index];
    }
    isEmpty() {
        return !this.list.length;
    }
    add(value) {
        if (this.type == null)
            this.type = value.getType();
        else if (this.type != value.getType())
            throw new TypeError(value.getType() + " is not of expected type " + this.type);
        this.list.push(value);
    }
    addTo(index, value) {
        if (index < 0 || index >= this.size())
            throw new IndexOutOfBoundsException(String(index));
        if (this.type == null)
            this.type = value.getType();
        if (this.type != value.getType())
            throw new TypeError(value.getType() + " is not of expected type " + this.type);
        this.list.splice(index, 0, value);
    }
    addAll(values) {
        for (let value of values) {
            this.add(value);
        }
    }
    remove(from, count = 1) {
        this.list.splice(from, count);
    }
    equals(obj) {
        return obj instanceof NBTList && obj.toMSONString() == this.toMSONString();
    }
    toMSONString() {
        let output = "[";
        for (let i = 0; i < this.list.length; i++) {
            if (i != 0) {
                output += ',';
            }
            output += String(this.list[i]);
        }
        return output += "]";
    }
    clone() {
        return new NBTList(this.type ?? undefined, ...this.list);
    }
}
class IndexOutOfBoundsException extends Error {
}
