import { parse, stringify } from "yaml";

interface INluEntry {
  intent?: string;
  lookup?: string;
  regex?: string;
  examples: string;
}

export interface INluResponse {
  intents?: {
    name: string;
    examples: string[];
  }[];
  lookups?: {
    name: string;
    examples: string[];
  }[];
  regexs?: {
    name: string;
    examples: string[];
  }[];
}

export interface IActionsResponse {
  reponses: { name: string; texts: string[] }[]; // TODO: responses com img e text
  customActions: { name: string }[];
}

export default function parser(
  content: string | null,
  type: "nlu" | "actions"
) {
  if (!content) throw new Error("content is null");

  const data = parse(content);

  if (type === "nlu") {
    const object: INluResponse = {
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
      if (entry.intent) object.intents!.push(aux);
      if (entry.lookup) object.lookups!.push(aux);
      if (entry.regex) object.regexs!.push(aux);
    });

    return object;
  }
  if (type === "actions") {
    const object: IActionsResponse = {
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

    object.customActions = data.actions;

    // TODO: outros tipos de responses (img/button)
    object.reponses = responses;

    return object;
  }
}
