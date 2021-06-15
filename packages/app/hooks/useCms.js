//@flow
import { useCmsContext } from '@cmsContext';

/**
 * This is the primary way to access the CMS content inside React components, the helper function `getCmsContent`
 * is also identical but should be avoided when using inside components as the hook is simpler.
 */
export default function useCms(cmsContainer: string): { [string]: any } {
  const context = useCmsContext();
  return context && context[cmsContainer];
}
