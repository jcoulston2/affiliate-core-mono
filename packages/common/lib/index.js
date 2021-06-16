//@flow
import * as zip from 'zipson';

export function zipParse(zipped: string): CommonJson {
  return zip.parse(zipped);
}

export function zipParseIncrements(zipped: Array<string>): CommonJson {
  zipped.forEach((chunk) => {
    zip.parseIncremental(chunk);
  });
  return zip.parseIncremental(null);
}
