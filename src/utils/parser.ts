import { parse, stringify } from "yaml";
import {
  ActionTypeEnum,
  IActionResponse,
  ICustomActionResponse,
} from "../contexts/ActionsContext";
import {
  INluIntent,
  INluLookup,
  INluRegex,
  NluTypeEnum,
} from "../contexts/NluContext";

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

interface IActionsParsed {
  responses: IActionResponse[]; // TODO: responses com img e text
  customActions: ICustomActionResponse[];
}

export default function parseRasaFile(
  content: string | null,
  type: "nlu" | "actions"
): { nlu?: INluParsed; actions?: IActionsParsed } {
  if (!content) throw new Error("content is null");

  const data = parse(content);

  const parsed: { nlu?: INluParsed; actions?: IActionsParsed } = {};

  if (type === "nlu") {
    const nluObject: INluParsed = {
      intents: [],
      lookups: [],
      regexs: [],
    };
    data?.nlu.map((entry: INluEntry) => {
      let aux = {
        name: (entry.intent || entry.lookup || entry.regex) as string,
        examples: entry.examples
          .split("\n")
          .map((example) => example.slice(2, example.length)),
      };

      let type: NluTypeEnum = NluTypeEnum.INTENT;
      if (entry.lookup) type = NluTypeEnum.LOOKUP;
      if (entry.regex) type = NluTypeEnum.REGEX;

      const nlu = {
        ...aux,
        type,
      };

      if (entry.intent) nluObject.intents!.push(nlu as INluIntent);
      if (entry.lookup) nluObject.lookups!.push(nlu as INluLookup);
      if (entry.regex) nluObject.regexs!.push(nlu as INluRegex);
    });

    parsed.nlu = nluObject;
  }
  if (type === "actions") {
    const actionsObject: IActionsParsed = {
      responses: [],
      customActions: [],
    };

    // transform data.responses oject to array
    const responses = Object.keys(data.responses).map((key) => ({
      name: key,
      texts: data.responses[key] as string[],
      type: ActionTypeEnum.RESPONSE as ActionTypeEnum.RESPONSE, // FIXME: ?????
    }));

    const customActions: string[] = data.actions;

    actionsObject.customActions = customActions.map((action) => ({
      type: ActionTypeEnum.CUSTOM_ACTION,
      name: action,
    }));

    // TODO: outros tipos de responses (img/button)

    actionsObject.responses = responses;

    parsed.actions = actionsObject;
  }

  return parsed;
}
