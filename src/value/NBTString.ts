import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";

export class NBTString extends NBTTag {

    private value: string;
    
    constructor(value: string) {
        super();

        this.value = value;
    }
    
    public getValue() {
        return this.value;
    }
    
    public setValue(value: string) {
        this.value = value;
    }
    
    public getType() {
        return NBTType.STRING;
    }
    
    public toMSONString() {
        return NBTString.toMSONString(this.value);
    }
    
    public clone() {
        return new NBTString(this.value);
    }
    
    public static toMSONString(str: String) {
        return `"${str}"`;
    }
}
