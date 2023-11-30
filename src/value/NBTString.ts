import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";

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
        let output = '"';
        const chars = str.split("");

        for (const c of chars) {
            if ((c == '\\') || (c == '"')) {
                output += '\\';
            }
            output += c;
        }

        output += '"';

        return output;
    }
}
