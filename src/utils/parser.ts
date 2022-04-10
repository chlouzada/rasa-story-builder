import { parse, stringify } from "yaml";

interface INLUEntry {
  intent?: string;
  lookup?: string;
  regex?: string;
  examples: string;
}

interface INLUResponse {
  intents: IEntry[];
  lookups: IEntry[];
  regexs: IEntry[];
}

interface IEntry {
  name: string;
  examples: string[];
}

export default function parser(content: string, type: "nlu" | "responses") {
  const data = parse(content);
  if (type === "nlu") {
    const object: INLUResponse = {
      intents: [],
      lookups: [],
      regexs: [],
    };
    data.nlu.map((entry: INLUEntry) => {
      const aux = {
        name: (entry.intent || entry.lookup || entry.regex) as string,
        examples: entry.examples
          .split("\n")
          .map((example) => example.slice(2, example.length)),
      };
      if (entry.intent) object.intents.push(aux)
      if (entry.lookup) object.lookups.push(aux)
      if (entry.regex) object.regexs.push(aux)
    });

    return object;
  }
  if (type === "responses") return data.responses;
}
