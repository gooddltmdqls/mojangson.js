
import * as NBTByte_1 from "./NBTByte.js";
import * as NBTByteArray_1 from "./NBTByteArray.js";
import * as NBTDouble_1 from "./NBTDouble.js";
import * as NBTFloat_1 from "./NBTFloat.js";
import * as NBTInt_1 from "./NBTInt.js";
import * as NBTIntArray_1 from "./NBTIntArray.js";
import * as NBTList_1 from "./NBTList.js";
import * as NBTLong_1 from "./NBTLong.js";
import * as NBTLongArray_1 from "./NBTLongArray.js";
import * as NBTShort_1 from "./NBTShort.js";
import * as NBTString_1 from "./NBTString.js";
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTCompound extends NBTTag_1.NBTTag {
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
        return NBTType_1.NBTType.COMPOUND;
    }
    getTag(key) {
        if (!this.hasKey(key))
            throw new NoSuchElementError(key);
        return this.value.get(key);
    }
    getByte(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTByte_1.NBTByte))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getShort(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTShort_1.NBTShort))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getInt(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTInt_1.NBTInt))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getLong(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTLong_1.NBTLong))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getFloat(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTFloat_1.NBTFloat))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getDouble(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTDouble_1.NBTDouble))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getByteArray(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTByteArray_1.NBTByteArray))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getString(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTString_1.NBTString))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getList(key) {
        return this.getTagList(key).getValue();
    }
    getTagList(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTList_1.NBTList))
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
        if (!(tag instanceof NBTIntArray_1.NBTIntArray))
            throw new NoSuchElementError(key);
        return tag.getValue();
    }
    getLongArray(key) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTLongArray_1.NBTLongArray))
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
        this.put(key, new NBTByteArray_1.NBTByteArray(value));
    }
    putByte(key, value) {
        this.put(key, new NBTByte_1.NBTByte(value));
    }
    putDouble(key, value) {
        this.put(key, new NBTDouble_1.NBTDouble(value));
    }
    putFloat(key, value) {
        this.put(key, new NBTFloat_1.NBTFloat(value));
    }
    putIntArray(key, value) {
        this.put(key, new NBTIntArray_1.NBTIntArray(value));
    }
    putLongArray(key, value) {
        this.put(key, new NBTLongArray_1.NBTLongArray(value));
    }
    putInt(key, value) {
        this.put(key, new NBTInt_1.NBTInt(value));
    }
    putLong(key, value) {
        this.put(key, new NBTLong_1.NBTLong(value));
    }
    putShort(key, value) {
        this.put(key, new NBTShort_1.NBTShort(value));
    }
    putString(key, value) {
        this.put(key, new NBTString_1.NBTString(value));
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
            string += NBTCompound.SIMPLE_STRING.test("key") ? key : NBTString_1.NBTString.toMSONString(key);
            string += ':';
            string += this.value.get(key).toMSONString();
        }
        return string += "}";
    }
}
export {NBTCompound}
NBTCompound.SIMPLE_STRING = /[A-Za-z0-9._+-]+/;
class NoSuchElementError extends Error {
}
