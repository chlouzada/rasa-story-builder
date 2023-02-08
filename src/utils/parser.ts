import { parse, stringify } from 'yaml';
import { ActionTypeEnum, Actions } from '../stores/actions';
import { Intent } from '../stores/intents';

interface INluEntry {
  intent?: string;
  lookup?: string;
  regex?: string;
  examples: string;
}

interface INluParsed {
  intents: INluIntent[];
  lookups: INluLookup[];
  regexs: INluRegex[];
}

export enum NluTypeEnum {
  INTENT = 'INTENT',
  LOOKUP = 'LOOKUP',
  REGEX = 'REGEX',
}

interface INluIntent extends INluEntryBase {
  type: NluTypeEnum.INTENT;
}

interface INluLookup extends INluEntryBase {
  type: NluTypeEnum.LOOKUP;
}

interface INluRegex extends INluEntryBase {
  type: NluTypeEnum.REGEX;
}

interface INluEntryBase {
  name: string;
  examples: string[];
}

export const parser = (
  content: string | null,
  type: 'NLU' | 'ACTIONS'
): { nlu?: INluParsed; actions?: Actions } => {
  if (!content) throw new Error('content is null');

  const data = parse(content);

  const parsed: { nlu?: INluParsed; actions?: Actions } = {};

  if (type === 'NLU') {
    const nluObject: INluParsed = {
      intents: [],
      lookups: [],
      regexs: [],
    };

    data?.nlu.map((entry: INluEntry) => {
      let aux = {
        name: (entry.intent || entry.lookup || entry.regex) as string,
        examples: entry.examples
          .split('\n')
          .map((example) => example.slice(2, example.length))
          .filter((example) => example.length > 0),
      };

      let type: NluTypeEnum = NluTypeEnum.INTENT;
      if (entry.lookup) type = NluTypeEnum.LOOKUP;
      if (entry.regex) type = NluTypeEnum.REGEX;
      const nlu = {
        ...aux,
        type,
      };

      if (entry.intent) nluObject.intents.push(nlu as INluIntent);
      if (entry.lookup) nluObject.lookups.push(nlu as INluLookup);
      if (entry.regex) nluObject.regexs.push(nlu as INluRegex);
    });
    parsed.nlu = nluObject;
  }
  if (type === 'ACTIONS') {
    const actions: Actions = {
      responses: [],
      customActions: [],
    };

    console.log(data.responses);

    // transform data.responses oject to array
    actions.responses = Object.keys(data.responses).map((key) => ({
      name: key,
      texts: (data.responses[key] as string[] | [{ text: string }]).map(
        (text) => {
          if (typeof text === 'string') return text;
          return text.text;
        }
      ),
      type: ActionTypeEnum.RESPONSE as ActionTypeEnum.RESPONSE, // FIXME: ?????
    }));

    const customActions: string[] = data.actions;
    actions.customActions = customActions.map((action) => ({
      type: ActionTypeEnum.CUSTOM_ACTION,
      name: action,
    }));
    console.log(actions);

    // TODO: outros tipos de responses (img/button)

    parsed.actions = actions;
  }

  return parsed;
};
