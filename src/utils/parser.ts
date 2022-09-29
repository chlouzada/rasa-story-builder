import { parse, stringify } from 'yaml';
import {
  ActionTypeEnum,
  Response,
  CustomAction,
  Actions,
} from '../stores/actions';
// import {
//   INluIntent,
//   INluLookup,
//   INluRegex,
//   NluTypeEnum,
// } from "../contexts/NluContext";

// interface INluEntry {
//   intent?: string;
//   lookup?: string;
//   regex?: string;
//   examples: string;
// }

// interface INluParsed {
//   intents: INluIntent[];
//   lookups: INluLookup[];
//   regexs: INluRegex[];
// }

export const parser = (
  content: string | null,
  type: 'nlu' | 'actions'
): { nlu?: any; actions?: Actions } => {
  if (!content) throw new Error('content is null');

  const data = parse(content);

  const parsed: { nlu?: any; actions?: Actions } = {};

  if (type === 'nlu') {
    // const nluObject: INluParsed = {
    //   intents: [],
    //   lookups: [],
    //   regexs: [],
    // };
    // data?.nlu.map((entry: INluEntry) => {
    //   let aux = {
    //     name: (entry.intent || entry.lookup || entry.regex) as string,
    //     examples: entry.examples
    //       .split('\n')
    //       .map((example) => example.slice(2, example.length)),
    //   };
    //   let type: NluTypeEnum = NluTypeEnum.INTENT;
    //   if (entry.lookup) type = NluTypeEnum.LOOKUP;
    //   if (entry.regex) type = NluTypeEnum.REGEX;
    //   const nlu = {
    //     ...aux,
    //     type,
    //   };
    //   if (entry.intent) nluObject.intents!.push(nlu as INluIntent);
    //   if (entry.lookup) nluObject.lookups!.push(nlu as INluLookup);
    //   if (entry.regex) nluObject.regexs!.push(nlu as INluRegex);
    // });
    // parsed.nlu = nluObject;
  }
  if (type === 'actions') {
    const actions: Actions = {
      responses: [],
      customActions: [],
    };

    // transform data.responses oject to array
    actions.responses = Object.keys(data.responses).map((key) => ({
      name: key,
      texts: data.responses[key] as string[],
      type: ActionTypeEnum.RESPONSE as ActionTypeEnum.RESPONSE, // FIXME: ?????
    }));

    const customActions: string[] = data.actions;
    actions.customActions = customActions.map((action) => ({
      type: ActionTypeEnum.CUSTOM_ACTION,
      name: action,
    }));

    // TODO: outros tipos de responses (img/button)

    parsed.actions = actions;
  }

  return parsed;
};
