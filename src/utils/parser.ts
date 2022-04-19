import { parse, stringify } from "yaml";

interface INluEntry {
  intent?: string;
  lookup?: string;
  regex?: string;
  examples: string;
}

interface INluParsed {
  intents: {
    name: string;
    examples: string[];
  }[];
  lookups: {
    name: string;
    examples: string[];
  }[];
  regexs: {
    name: string;
    examples: string[];
  }[];
}

interface IActionsParsed {
  reponses: { name: string; texts: string[] }[]; // TODO: responses com img e text
  customActions: { name: string }[];
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
      const aux = {
        name: (entry.intent || entry.lookup || entry.regex) as string,
        examples: entry.examples
          .split("\n")
          .map((example) => example.slice(2, example.length)),
      };
      if (entry.intent) nluObject.intents!.push(aux);
      if (entry.lookup) nluObject.lookups!.push(aux);
      if (entry.regex) nluObject.regexs!.push(aux);
    });

    parsed.nlu = nluObject;
  }
  if (type === "actions") {
    const actionsObject: IActionsParsed = {
      reponses: [],
      customActions: [],
    };

    // transform data.responses oject to array
    const responses = Object.keys(data.responses).map((key) => {
      return {
        name: key,
        texts: data.responses[key],
      };
    });

    actionsObject.customActions = data.actions;

    // TODO: outros tipos de responses (img/button)
    actionsObject.reponses = responses;

    parsed.actions = actionsObject;
  }

  return parsed;
}
