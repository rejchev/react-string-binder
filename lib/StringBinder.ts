import {ReactNode} from "react";
import * as React from "react";

type ProcessResult = {
  str: string,
  bindChain: string[]
}

type StringBinderT = {
  [key: string]: ReactNode;
}

class StringBinder {

  public static readonly SpecialSymbol : string = '$';

  public static readonly Anchor : string = "%1s";

  private static readonly TruePattern : RegExp = new RegExp(/[A-Za-z]/, 'gi');

  private static _instance?: StringBinder;

  public static Instance() : StringBinder {
    if(!this._instance)
      this._instance = new StringBinder();

    return this._instance;
  }

  public bind(str: string, binds: StringBinderT) : ReactNode | string {
    if(!str.length)
      return str;

    let bindKeys : string[];
    if(!(bindKeys = Object.keys(binds)).length)
      return str;

    const result : ProcessResult = this
      ._process(str);

    const words = result.str
      .split(StringBinder.Anchor);

    if(!words.length)
      return str;

    let idx : number = 0;
    const children : ReactNode[] = [];
    words.forEach((word, i) => {
      children.push(word);

      if((idx = bindKeys.indexOf(result.bindChain[i])) == -1)
        children.push(result.bindChain[i]);

      else
        children.push(binds[bindKeys[idx]]);
    })

    return React.createElement(React.Fragment, null, children)
  }

  private _process(str: string): ProcessResult {

    let buf = '';
    let sub = '';
    let keyIdx = -1;

    const chain : string[] = [];
    for(let i = 0, j = 0, len = str.length; i < len; i++) {

      if(keyIdx === -1 && str[i] === StringBinder.SpecialSymbol && (i + 1) !== len)
        keyIdx = i;

      if(keyIdx === -1) {
        buf += str[i];
        continue;
      }

      sub = '';
      j = keyIdx + 1;

      while(j < len && str[j].search(StringBinder.TruePattern) !== -1)
        sub += str[j++];

      keyIdx = -1;

      if (j >= len || str[j] !== StringBinder.SpecialSymbol)
        continue;

      if(!sub.length) {
        buf += str[i];
        continue;
      }

      chain.push(sub);
      buf += StringBinder.Anchor;

      i += sub.length + 1;
    }

    return {
      str: buf,
      bindChain: chain,
    }
  }
}

export default StringBinder;