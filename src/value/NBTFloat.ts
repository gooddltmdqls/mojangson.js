import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";

export class NBTFloat extends NBTTag {

    private value: number;
    
    constructor(value: number) {
        super()
        
        this.value = value;
    }
    
    public getValue() {
        return this.value;
    }

    public getFloatValue() {
        return this.value;
    }
    
    public setFloatValue(value: number) {
        this.value = value;
    }
    
    public getType() {
        return NBTType.FLOAT;
    }
    
    public toMSONString() {
        return this.value+"f";
    }
    
    public clone() {
        return new NBTFloat(this.value);
    }

}
