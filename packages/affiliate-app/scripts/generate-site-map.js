import productListingPaths from '../staticPaths/productListingPaths';
import cmsPaths from '../staticPaths/cmsPaths';
import fs from 'fs';
import prettier from 'prettier';
import config from '../config';

const hostname = config.host;
const getDate = new Date().toISOString();
const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const siteMapListingPaths = productListingPaths.map((path) => {
    const [sec, cat] = path.params.slug;
    return {
      url: `${hostname}product-listing/${sec}/${cat}/`,
      changefreq: 'weekly',
      priority: 0.8,
    };
  });

  const siteMapCmsPaths = cmsPaths.map((path) => {
    const [param] = path.params.cms;
    return { url: `${hostname}${param}/`, changefreq: 'monthly', priority: '0.8' };
  });

  const allPages = [
    { url: hostname, changefreq: 'monthly', priority: '1.0' },
    ...siteMapListingPaths,
    ...siteMapCmsPaths,
  ];

  const pagesSitemap = `
    ${allPages
      .map(({ url, changefreq, priority }) => {
        return `
          <url>
            <loc>${url}</loc>
            <lastmod>${getDate}</lastmod>
            <changefreq>${changefreq}</changefreq>
            <priority>${priority}</priority>
          </url>
        `;
      })
      .join('')}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pagesSitemap}
    </urlset>
  `;

  const formattedSitemap = [formatted(generatedSitemap)];
  fs.writeFileSync(`${__dirname}/../public/sitemap.xml`, formattedSitemap, 'utf8');
})();
