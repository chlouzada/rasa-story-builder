import { parse, stringify } from "yaml";

interface INluEntry {
  intent?: string;
  lookup?: string;
  regex?: string;
  examples: string;
}

export interface INluResponse {
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

export interface IActionsResponse {
  reponses: { name: string; texts: string[] }[]; // TODO: responses com img e text
  customActions: { name: string }[];
}

export default function parser(
  content: string | null,
  type: "nlu" | "actions"
) {
  if (!content) return;

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
      if (entry.intent) object.intents.push(aux);
      if (entry.lookup) object.lookups.push(aux);
      if (entry.regex) object.regexs.push(aux);
    });

    return object;
  }
  if (type === "actions") {
    const object: IActionsResponse = {
      reponses: [],
      customActions: [],
    };

    // TODO: push responses and customActions to object
    console.log(data.responses);
    console.log(data.actions);

    return object;
  }
}
