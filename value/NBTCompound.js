import { NBTByte } from "./NBTByte.js";
import { NBTByteArray } from "./NBTByteArray.js";
import { NBTDouble } from "./NBTDouble.js";
import { NBTFloat } from "./NBTFloat.js";
import { NBTInt } from "./NBTInt.js";
import { NBTIntArray } from "./NBTIntArray.js";
import { NBTList } from "./NBTList.js";
import { NBTLong } from "./NBTLong.js";
import { NBTLongArray } from "./NBTLongArray.js";
import { NBTShort } from "./NBTShort.js";
import { NBTString } from "./NBTString.js";
import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTCompound extends NBTTag {
    static SIMPLE_STRING = /[A-Za-z0-9._+-]+/;
    value;
    constructor(value) {
        super();
        if (Array.isArray(value)) {
            this.value = new Map();
            for (let tag of value) {
                this.value.set(tag.getName(), tag.getTag());
            }
        }
        else if (value instanceof Map) {
            this.value = new Map(value);
        }
        else
            this.value = new Map();
    }
    size() {
        return this.value.keys.length;
    }
    getValue() {
        return this.value;
    }
    getType() {
        return NBTType.COMPOUND;
    }
    getTag(key) {
        if (!this.hasKey(key))
            throw new NoSuchElementError(key);
        return this.value.get(key);
    }
    getByte(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTByte))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getShort(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTShort))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getInt(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTInt))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getLong(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTLong))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getFloat(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTFloat))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getDouble(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTDouble))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getByteArray(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTByteArray))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getString(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTString))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getList(key) {
        return this.getTagList(key).getValue();
    }
    getTagList(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTList))
            throw new NoSuchElementError(key);
        return tag;
    }
    getCompound(key) {
        return this.getCompoundTag(key).getValue();
    }
    getCompoundTag(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTCompound))
            throw new NoSuchElementError(key);
        return tag;
    }
    getIntArray(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTIntArray))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getLongArray(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTLongArray))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getKeys() {
        return this.value.keys();
    }
    isEmpty() {
        return !this.value.size;
    }
    hasKey(key) {
        return this.value.has(key);
    }
    hasKeyOfType(key, type) {
        return this.hasKey(key) && this.getTag(key).getType() == type;
    }
    put(name, tag) {
        this.value.set(name, tag);
    }
    putByteArray(key, value) {
        this.put(key, new NBTByteArray(value));
    }
    putByte(key, value) {
        this.put(key, new NBTByte(value));
    }
    putDouble(key, value) {
        this.put(key, new NBTDouble(value));
    }
    putFloat(key, value) {
        this.put(key, new NBTFloat(value));
    }
    putIntArray(key, value) {
        this.put(key, new NBTIntArray(value));
    }
    putLongArray(key, value) {
        this.put(key, new NBTLongArray(value));
    }
    putInt(key, value) {
        this.put(key, new NBTInt(value));
    }
    putLong(key, value) {
        this.put(key, new NBTLong(value));
    }
    putShort(key, value) {
        this.put(key, new NBTShort(value));
    }
    putString(key, value) {
        this.put(key, new NBTString(value));
    }
    removeKey(key) {
        this.value.delete(key);
    }
    forEach(action) {
        this.value.forEach((v, k) => action(k, v));
    }
    equals(obj) {
        return obj instanceof NBTCompound && Array.from(obj.getValue().entries()).join("!") == Array.from(this.getValue().entries()).join("!");
    }
    toMSONString() {
        let string = "{";
        let keys = this.getKeys();
        for (let key of keys) {
            if (string.length > 1) {
                string += ",";
            }
            string += (!!key.match(NBTCompound.SIMPLE_STRING) && key.match(NBTCompound.SIMPLE_STRING)[0] == key.match(NBTCompound.SIMPLE_STRING).input) ? key : NBTString.toMSONString(key);
            string += ':';
            string += this.value.get(key).toMSONString();
        }
        return string += "}";
    }
}
class NoSuchElementError extends Error {
}
