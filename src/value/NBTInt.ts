import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";

export class NBTInt extends NBTTag {

    private value: number;
    
    constructor(value: number) {
        super();

        this.value = value;
    }
    
    public getValue() {
        return this.value;
    }

    public getIntValue() {
        return this.value;
    }
    
    public setIntValue(value: number) {
        this.value = value;
    }
    
    public getType() {
        return NBTType.INT;
    }
    
    public toMSONString() {
        return String(this.value);
    }
    
    public clone() {
        return new NBTInt(this.value);
    }
    
}
