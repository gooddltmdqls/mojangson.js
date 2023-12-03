export class NBTTag {
    equals(obj) {
        if (obj instanceof NBTTag) {
            return this.getType() == obj.getType()
                && this.getValue() == obj.getValue();
        }
        return false;
    }
    toString() {
        return this.toMSONString();
    }
}
