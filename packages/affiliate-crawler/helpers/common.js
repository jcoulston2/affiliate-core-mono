import moment from 'moment';

export function clone(json) {
  return JSON.parse(JSON.stringify(json));
}

export function getCurrentDateTime() {
  return moment().format();
}

export function srcToHttp(url) {
  if (typeof url !== 'string') return url;
  return url.startsWith('//') ? `https:${url}` : url;
}

export function getSingle(prop) {
  return Array.isArray(prop) ? prop[0] : prop;
}

export function toArray(data) {
  return Array.isArray(data) ? data : [data];
}

export function lowerCase(str) {
  return str.length ? str.toLowerCase() : str;
}

export function normalizePrice(price) {
  if (!price) return null;
  const singlePrice = getSingle(price);
  return /£/.test(singlePrice) ? singlePrice : `£${singlePrice}`;
}

export function isValidImageSrc(src) {
  if (!src) return false;
  try {
    new URL(src);
    return !/^data|image\/svg;base64|\[gif\]/.test(src);
  } catch (e) {
    return false;
  }
}

export function copyToClip(json) {
  const proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(JSON.stringify(json));
  proc.stdin.end();
}
