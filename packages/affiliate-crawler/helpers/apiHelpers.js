export function chunkStore(zipped) {
  const chunked = zipped.match(/.{1,3000000}/g);

  return chunked;
}
