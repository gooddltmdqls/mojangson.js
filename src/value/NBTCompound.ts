import { NBTByte } from "./NBTByte.js";
import { NBTByteArray } from "./NBTByteArray.js";
import { NBTDouble } from "./NBTDouble.js";
import { NBTFloat } from "./NBTFloat.js";
import { NBTInt } from "./NBTInt.js";
import { NBTIntArray } from "./NBTIntArray.js";
import { NBTList } from "./NBTList.js";
import { NBTLong } from "./NBTLong.js";
import { NBTLongArray } from "./NBTLongArray.js";
import { NBTNamedTag } from "./NBTNamedTag.js";
import { NBTShort } from "./NBTShort.js";
import { NBTString } from "./NBTString.js";
import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";

export class NBTCompound extends NBTTag {
    
    private static SIMPLE_STRING = /[A-Za-z0-9._+-]+/;

    private value: Map<String, NBTTag>;
    
    constructor(value?: (Map<String, NBTTag> | NBTNamedTag<any>[])) {
        super();

        if (Array.isArray(value)) {
            this.value = new Map();

            for (let tag of value) {
                this.value.set(tag.getName(), tag.getTag());
            }
        } else if (value instanceof Map) {
            this.value = new Map(value);
        } else this.value = new Map();
    }

    public size() {
        return this.value.keys.length;
    }

    public getValue() {
        return this.value;
    }

    public getType() {
        return NBTType.COMPOUND;
    }

    public getTag(key: string) {
        if (!this.hasKey(key)) throw new NoSuchElementError(key);
        return this.value.get(key);
    }

    public getByte(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTByte)) throw new NoSuchElementError(key);
        return (tag as NBTByte).getValue();
    }

    public getShort(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTShort)) throw new NoSuchElementError(key);
        return (tag as NBTShort).getValue();
    }

    public getInt(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTInt)) throw new NoSuchElementError(key);
        return (tag as NBTInt).getValue();
    }

    public getLong(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTLong)) throw new NoSuchElementError(key);
        return (tag as NBTLong).getValue();
    }

    public getFloat(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTFloat)) throw new NoSuchElementError(key);
        return (tag as NBTFloat).getValue();
    }

    public getDouble(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTDouble)) throw new NoSuchElementError(key);
        return (tag as NBTDouble).getValue();
    }

    public getByteArray(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTByteArray)) throw new NoSuchElementError(key);
        return (tag as NBTByteArray).getValue();
    }

    public getString(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTString)) throw new NoSuchElementError(key);
        return (tag as NBTString).getValue();
    }

    public getList(key: string) {
        return this.getTagList(key).getValue();
    }

    public getTagList(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTList)) throw new NoSuchElementError(key);
        return tag;
    }

    public getCompound(key: string) {
        return this.getCompoundTag(key).getValue();
    }

    public getCompoundTag(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTCompound)) throw new NoSuchElementError(key);
        return tag;
    }

    public getIntArray(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTIntArray)) throw new NoSuchElementError(key);
        return (tag as NBTIntArray).getValue();
    }
    
    public getLongArray(key: string) {
        const tag = this.value.get(key);
        if (!(tag instanceof NBTLongArray)) throw new NoSuchElementError(key);
        return (tag as NBTLongArray).getValue();
    }
    
    public getKeys() {
        return this.value.keys();
    }
    
    public isEmpty() {
        return !this.value.size;
    }
    
    public hasKey(key: string) {
        return this.value.has(key);
    }
    
    public hasKeyOfType(key: string, type: NBTType) {
        return this.hasKey(key) && this.getTag(key)!.getType() == type;
    }
    
    public put(name: string, tag: NBTTag) {
        this.value.set(name, tag);
    }
    
    public putByteArray(key: string, value: number[]) {
        this.put(key, new NBTByteArray(value));
    }
    
    public putByte(key: string, value: number) {
        this.put(key, new NBTByte(value));
    }
    
    public putDouble(key: string, value: number) {
        this.put(key, new NBTDouble(value));
    }
    
    public putFloat(key: string, value: number) {
        this.put(key, new NBTFloat(value));
    }
    
    public putIntArray(key: string, value: number[]) {
        this.put(key, new NBTIntArray(value));
    }
    
    public putLongArray(key: string, value: number[]) {
        this.put(key, new NBTLongArray(value));
    }
    
    public putInt(key: string, value: number) {
        this.put(key, new NBTInt(value));
    }
    
    public putLong(key: string, value: number) {
        this.put(key, new NBTLong(value));
    }
    
    public putShort(key: string, value: number) {
        this.put(key, new NBTShort(value));
    }
    
    public putString(key: string, value: string) {
        this.put(key, new NBTString(value));
    }

    public removeKey(key: string) {
        this.value.delete(key);
    }
    
    public forEach(action: (key: String, value: NBTTag) => any) {
        this.value.forEach((v, k) => action(k, v));
    }

    public equals(obj: any) {
        return obj instanceof NBTCompound && Array.from(obj.getValue().entries()).join("!") == Array.from(this.getValue().entries()).join("!");
    }
    
    public toMSONString() {
        let string = "{";
        let keys = this.getKeys();
    
        for (let key of keys) {
            if (string.length > 1) {
                string += ",";
            }
            string += NBTCompound.SIMPLE_STRING.test("key") ? key : NBTString.toMSONString(key)
            string += ':'
            string += this.value.get(key)!.toMSONString();
        }
        
        return string += "}";
    }

}

class NoSuchElementError extends Error {}