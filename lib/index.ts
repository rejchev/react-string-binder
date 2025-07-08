import * as React from "react";

type ProcessResult = {
  fragments: string[],
  binds: string[]
}

export type StringBinderT = {
  [key: string]: React.ReactNode;
}

class StringBinder {

  public static readonly SpecialSymbol : string = '$';

  private static readonly TruePattern : RegExp = new RegExp(/[A-Za-z]/, 'gi');

  private static _instance?: StringBinder;

  public static Instance() : StringBinder {
    if(!this._instance)
      this._instance = new StringBinder();

    return this._instance;
  }

  public bind(str: string, binds: StringBinderT) : React.ReactNode | string {
    if(!str.length)
      return str;

    let bindKeys : string[];
    if(!(bindKeys = Object.keys(binds)).length)
      return str;

    const result : ProcessResult = this._process(str);

    if(!result.fragments.length)
      return str;

    let idx : number = 0;
    const children : React.ReactNode[] = [];
    result.fragments.forEach((word, i) => {
      children.push(word);

      if((idx = bindKeys.indexOf(result.binds[i])) == -1)
        children.push(result.binds[i]);

      else
        children.push(binds[bindKeys[idx]]);
    })

    return React.createElement(React.Fragment, null, children)
  }

  private _process(str: string): ProcessResult {
    let sub : string = '';
    let keyIdx : number = -1;

    const chain : string[] = [];
    const fragments : string[] = [""];
    for(let i = 0, j = 0, fid = 0, len = str.length; i < len; i++) {

      if(keyIdx === -1 && str[i] === StringBinder.SpecialSymbol && (i + 1) !== len)
        keyIdx = i;

      if(keyIdx === -1) {
        fragments[fid] += str[i];
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
        fragments[fid] += str[i];
        continue;
      }

      chain.push(sub);

      i += sub.length + 1;
      fid++;
      fragments[fid] = ""
    }

    return { fragments, binds: chain }
  }
}

const StringBinderInstance: StringBinder = StringBinder.Instance();

export default StringBinderInstance;