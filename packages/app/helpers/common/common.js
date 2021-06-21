//@flow
export function getImg(src: string): any {
  const imgContext = require.context('@images', true);
  const imageSrc = imgContext(`./${src}`).default;

  return imageSrc;
}
