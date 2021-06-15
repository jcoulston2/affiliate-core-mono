//@flow
import React from 'react';
import parseHtml from 'html-react-parser';

type CopyProps = {
  text: string,
  placeHolder?: string,
  replaceText?: string,
};

export default function Copy({ text = '', placeHolder, replaceText }: CopyProps) {
  const toParse = text && text.replace('{}', replaceText ? replaceText : '');
  let parsedHtml;

  try {
    parsedHtml = parseHtml(toParse || placeHolder);
  } catch (e) {
    console.warn(e);
  }

  return parsedHtml ? <>{parsedHtml}</> : null;
}
