/**
 * @info: This is a console script that can be run in the browser to create a
 * "categories" JSON used to construct brand schemas. Just make sure to modify the
 * "templateSchema" and the "anchorSelector"
 */

// document.querySelectorAll('[data-panel-id="0,1,3"] [data-path]');

/* eslint-disable no-undef */
function getLinks() {
  // :::::::::::::::::::::::::::::::::
  const brand = 'Dorothy Perkins';
  const domain = 'https://www.tkmaxx.com/uk/en/';
  const anchorSelector = '[style="display: block;"] > ul > li a[href]';
  const templateSchema = {
    section: 'womens',
    label: 'clothing',
    multipleUrls: null,
  };

  // :::::::::::::::::::::::::::::::::

  const urlResults = [];
  const linkNodes =
    $ && $.fn ? $(anchorSelector).toArray() : document.querySelectorAll(anchorSelector);

  linkNodes.forEach((node) => {
    const url = node.getAttribute('href');
    if (!url) return;
    urlResults.push({
      urls: [url],
      // We will need to manually fill in categories after the script has done
      category: '_____',
      ...templateSchema,
    });
  });

  console.log(
    JSON.stringify(
      {
        meta: {
          brand,
          domain,
        },
        categories: urlResults,
      },
      null,
      2
    )
  );
  return urlResults;
}

getLinks();
