import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";

export class NBTLongArray extends NBTTag {

    private value: number[];
    
    constructor (value: number[]) {
        super();

        this.value = value;
    }

    public length() {
        return this.value.length;
    }
    
    public getValue() {
        return this.value;
    }
    
    public getType() {
        return NBTType.BYTE_ARRAY;
    }
    
    public equals(obj: any) {
        return obj instanceof NBTLongArray && obj.toMSONString() == this.toMSONString();
    }

    public toMSONString() {
        let output = "[L;";
        for (let i = 0; i < this.value.length; i++) {
            if (i != 0) {
                output += ',';
            }
            output += this.value[i] + "L";
        }
        return output += "]";
    }

}
