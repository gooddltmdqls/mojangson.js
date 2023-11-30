
class ParserError extends Error {
    constructor(msg, content, index) {
        super(msg + " at: " + ParserError.printErrorLoc(content, index));
    }
    static printErrorLoc(content, index) {
        let string = "";
        let i = Math.min(content.length, index);
        if (i > 35) {
            string += "...";
        }
        string += content.substring(Math.max(0, i - 35), i);
        string += "<--[HERE]";
        return string.toString();
    }
}
export { ParserError }