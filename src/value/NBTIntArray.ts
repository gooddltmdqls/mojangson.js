import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";

export class NBTIntArray extends NBTTag {

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
        return obj instanceof NBTIntArray && obj.toMSONString() == this.toMSONString();
    }

    public toMSONString() {
        let output = "[I;";
        for (let i = 0; i < this.value.length; i++) {
            if (i != 0) {
                output += ',';
            }
            output += String(this.value[i]);
        }
        return output += "]";
    }

}
