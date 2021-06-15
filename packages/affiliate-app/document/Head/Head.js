//@flow
import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPageMeta } from './helper';
import { useCms } from '@hooks';
import { ALLOW_GOOGLE_INDEXING } from '@constants';

type HeadSectionProps = {
  title: String,
  children: React.Node,
};

const HeadSection = ({ title, children }: HeadSectionProps) => {
  const router = useRouter();
  const { metaContent } = useCms('document');
  const { route, query } = router;
  const pageMeta = getPageMeta(route, query, metaContent) || {};
  const preventIndexing = ALLOW_GOOGLE_INDEXING !== 'true';

  return (
    <Head>
      <title>{pageMeta.pageTitle}</title>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="description" content={pageMeta.pageDescription} />
      {preventIndexing && <meta name="googlebot" content="noindex" />}

      {/* PWA General */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* PWA Android */}
      <meta name="theme-color" content="#fff" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* PWA iOS */}
      <meta name="apple-mobile-web-app-title" content="Fliik" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* PWA General Links */}
      <link rel="manifest" href="/manifest.json" />
      <link href="/favicon.ico" rel="icon" type="image/png" sizes="48x48" />

      {/* PWA iOS */}
      <link rel="apple-touch-icon" href="/icons/icon-96x96.jpg" />

      {/* PWA Other Links */}
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link rel="icon" href="/favicon.ico" />

      {children}
    </Head>
  );
};

export default HeadSection;
