
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTList extends NBTTag_1.NBTTag {
    constructor(type, ...value) {
        super();
        this.list = [];
        this.type = type ?? null;
        if (value)
            this.list = [ ...this.list, ...value ];
    }
    size() {
        return this.list.length;
    }
    getValue() {
        return this.list;
    }
    getType() {
        return NBTType_1.NBTType.LIST;
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
export { NBTList }
class IndexOutOfBoundsException extends Error {
}
