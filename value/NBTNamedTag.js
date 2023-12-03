export class NBTNamedTag {
    name;
    tag;
    constructor(name, tag) {
        this.name = name;
        this.tag = tag;
    }
    getName() {
        return this.name;
    }
    getTag() {
        return this.tag;
    }
    equals(other) {
        return other instanceof NBTNamedTag && other.name == this.name && other.tag.equals(this.tag);
    }
}
