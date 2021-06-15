//@flow
import useClientWidth from './useClientWidth';
import { breakPoints } from '@styles/breakPoints';

type CurrentBreakpoint = ?'xs' | 'sm' | 'md' | 'lg' | 'xl';

export default function useCurrentBreakpoint(): CurrentBreakpoint {
  const clientWidth = useClientWidth() || 1200;
  for (const bp of breakPoints) {
    if (clientWidth >= bp.min && clientWidth <= bp.max) {
      return bp.query;
    }
  }
}
