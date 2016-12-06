import { XRegExp } from 'xregexp';
import { Injectable } from '@angular/core';

@Injectable()
export class Regex {
    RequestMethod = XRegExp('(Post|Delete|Options|Get|Put|Head|Patch)$');
}
