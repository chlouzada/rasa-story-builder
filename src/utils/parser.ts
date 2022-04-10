import { parse, stringify } from 'yaml'

export default function parser(content: string){
  const data = parse(content)
  console.log(data);
}