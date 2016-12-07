var XRegExp = require('xregexp');
import { Injectable } from '@angular/core';

@Injectable()
export class Regex {
    private RequestMethodExpr = XRegExp("(Post|Delete|Options|Get|Put|Head|Patch)$");
    private FirstPathElement = XRegExp("^[a-z]*");

    public requestMethod(str: String){
        var match = XRegExp.exec(str, this.RequestMethodExpr);
        if(match)
            return match[0];
        else
            return null;
        
    }

    public firstPathElement(str: String){
        var match = XRegExp.exec(str, this.FirstPathElement);
        console.log('match',match);
        if(match)
            return match[0];
        else
            return null;
    }
}
