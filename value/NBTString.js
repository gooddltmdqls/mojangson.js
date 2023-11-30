
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTString extends NBTTag_1.NBTTag {
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    getType() {
        return NBTType_1.NBTType.STRING;
    }
    toMSONString() {
        return NBTString.toMSONString(this.value);
    }
    clone() {
        return new NBTString(this.value);
    }
    static toMSONString(str) {
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
export { NBTString }