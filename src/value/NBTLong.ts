import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";

export class NBTLong extends NBTTag {

    private value: number;
    
    constructor(value: number) {
        super();

        this.value = value;
    }
    
    public getValue() {
        return this.value;
    }

    public getLongValue() {
        return this.value;
    }
    
    public setLongValue(value: number) {
        this.value = value;
    }
    
    public getType() {
        return NBTType.LONG;
    }
    
    public toMSONString() {
        return String(this.value) + "L";
    }
    
    public clone() {
        return new NBTLong(this.value);
    }
    
}