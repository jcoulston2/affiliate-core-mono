//@flow
declare var require: any;

export function prettyJson(obj: Object): string {
  return JSON.stringify(obj, null, 2);
}

export function fastClone(json: Array<any> | Object): Array<any> | Object {
  return JSON.parse(JSON.stringify(json));
}

export const navigateToUrl = (url: string): void => {
  window.open(url, '_blank');
};

export const navigateToPageRefresh = (url: string): void => {
  window.location.href = url;
};

export function srcToHttp(url: string): string {
  if (typeof url !== 'string') return url;
  return url?.startsWith('//') ? `https:${url}` : url;
}

export function toArray(data: Array<string> | string): Array<string> {
  return Array.isArray(data) ? data : [data];
}

export function toArrayNullable(data: Array<string> | string): ?Array<string> {
  return data ? toArray(data) : null;
}

export function getSingle(prop: string | Array<string>): string {
  return Array.isArray(prop) ? prop[0] : prop;
}

export function delayedCallback(cb: Function, time: number): void {
  setTimeout(() => {
    cb();
  }, time);
}

export function isDebug(): boolean {
  return typeof window !== 'undefined' && window?.location?.search?.includes('debug');
}

export function isStringInt(str: string): boolean {
  return /^-?\d+$/.test(str);
}

export function isIos(): ?boolean {
  if (!isServer()) {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad/.test(userAgent);
  }
}

export function isChrome(): ?boolean {
  return (
    !isServer() &&
    !!navigator &&
    /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor)
  );
}

export function getIntFromPrice(str: string): number {
  const strMatch = str?.match(/\d+\.\d+|\d+/g);
  return strMatch && strMatch[0] ? parseFloat(strMatch) : NaN;
}

export function getCurrentPrice({ nowPrice, price }: { nowPrice: string, price: string }): number {
  return getIntFromPrice(getSingle(nowPrice)) || getIntFromPrice(getSingle(price)) || NaN;
}

export function getCalculatedDiscount(wasPrice: ?string, nowPrice: ?string): ?number {
  if (!wasPrice || !nowPrice) return null;
  const priceIntMatch = (int: any) => int.match(/\d+\.\d+|\d+/g)[0];
  const WasPriceInt = parseFloat(priceIntMatch(wasPrice));
  const nowPriceInt = parseFloat(priceIntMatch(nowPrice));
  return Math.floor(((WasPriceInt - nowPriceInt) / WasPriceInt) * 100);
}

export function getScrollTop(): ?number {
  return document?.scrollingElement?.scrollTop;
}

export function setScrollTop(value: number): void {
  const doc = document.scrollingElement;
  if (doc) doc.scrollTop = value;
}

export function stringifySafe(param: any): ?string {
  return param ? `${param}` : null;
}

// A little bit like Array.some but the result of the filter callback always needs to match the array item for the function to
// return true. For example take the array ['foo', 'bar'], if the callback returns (item) => item === 'foo' || 'bar', the function
// will return true and is a complate match. If (item) => item === 'foo', then the function would return false. (this differs from
// .some (in this case it would return true)
export function commonMultiMatch(arr: Array<any>, cb: Function): boolean {
  const validate = arr.filter(cb);
  return validate.length === arr.length;
}

export function getLocalStorage(key: string): any {
  try {
    const storageKey: Object = localStorage.getItem(key);
    return JSON.parse(storageKey);
  } catch (e) {
    return null;
  }
}

export function setLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    //
  }
}

export function getNode(selector: string): any {
  return document?.querySelector(selector);
}

export function getAllNodes(selector: string): Array<any> {
  return Array.from(document.querySelectorAll(selector));
}

export function simpleStartCase(str: string): string {
  return str.replace(/-/g, ' ');
}

// some categories have spaces and '&' symbos which can cuase issues for querying un URL's. This just converts these terms into a safe
// and url friendly format. Note for querying in the gql resolvers, references to the store will also need to be converted to this case
// for matching
export function urlCase(str: string): string {
  return str?.replace(/\s&\s/g, '-and-')?.replace(/\s/g, '-')?.replace(/&/g, '|and|') || str;
}

export function urlReverseCase(str: string): string {
  return typeof str === 'string'
    ? str
        ?.replace(/-and-/g, ' & ')
        ?.replace(/-/g, ' ')
        ?.replace(/\|and\|/g, '&') || str
    : str;
}

export function urlCaseMatches(strA: string, strB: string, caseSensitive: boolean = true): boolean {
  if (caseSensitive) {
    return urlCase(strA) === urlCase(strB);
  } else {
    return urlCase(strA).toLowerCase() === urlCase(strB).toLowerCase();
  }
}

export function keyWordsToString(keyWords: Array<string>): string {
  return keyWords.join(' ');
}

export function isServer(): boolean {
  return typeof window === 'undefined';
}

export function isInPwa(): boolean {
  return !isServer() && window.matchMedia('(display-mode: standalone)').matches;
}

let throttleControl = {};
export function betterThrottle(cb: function, time: number, key: string = 'default'): void {
  const timeDiff = Date.now() - throttleControl[key];
  if (!throttleControl[key] || timeDiff > (time || 1000)) {
    cb();
  }
  throttleControl[key] = Date.now();
}

export function crossIncludes(str1: string, str2: string): boolean {
  return str1.includes(str2) || str2.includes(str1);
}

export function createEvent(node: any, eventType: string, delay: number): void {
  const event = document.createEvent('MouseEvents');
  if (node && eventType) {
    setTimeout(() => {
      event.initEvent(eventType, true, true);
      node.dispatchEvent(event);
    }, delay);
  }
}

export function urlContainsQuery(query: string): boolean {
  const urlQuery = window.location.search || '';
  return urlQuery.includes(query);
}

export function deDupeArray(ar: Array<any>): Array<any> {
  return [...new Set(ar)];
}

export function lowerCase(str: string): string {
  return str.length ? str.toLowerCase() : str;
}
