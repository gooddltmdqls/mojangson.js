export class ParserError extends Error {
    
    constructor(msg: string, content: string, index: number) {
        super(msg + " at: " + ParserError.printErrorLoc(content, index));
    }
    
    private static printErrorLoc(content: string, index: number) {
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
