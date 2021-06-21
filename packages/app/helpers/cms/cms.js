//@flow
import { type CommonJson } from '../../types/other';
import { type CmsResponsiveMixed } from '../../types/cms';

/**
 * @info This is an alternative to using useCms hook, and can be used outside React components if needed.
 * Uing this requires passing in the cmsContext as a param e.g.
 *
 * const cmsContext = useCmsContext();
 * const cmsContent = getCmsContent(cmsContext, 'theme');
 *
 * When linking to the cms it's preferred using the hook.
 *
 */
export function getCmsContent(
  context: { [string]: any },
  cmsContainer: string,
  cmsContent: string
): CommonJson {
  const content = context && context[cmsContainer];
  if (!cmsContent) {
    return content;
  } else {
    return content && content[cmsContent];
  }
}

export function getCopy(copy: string, toReplace: string): string {
  return copy && copy.replace(/\{\}/g, toReplace || '');
}

export function setCommonCmsAttr(value: string | number): CmsResponsiveMixed {
  return ['mobile', 'tablet', 'desktop'].reduce((acc: Object, cur: string) => {
    return {
      ...acc,
      [cur]: value,
    };
  }, {});
}

export async function injectLocalCms(): CommonJson {
  const { cms }: Object = await import('@affiliate-master/config');
  return cms;
}
