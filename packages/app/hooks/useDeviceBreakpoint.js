//@flow
import useCurrentBreakpoint from './useCurrentBreakpoint';

type DeviceBreakpoint = 'mobile' | 'tablet' | 'desktop';

export default function useDeviceBreakpoint(): DeviceBreakpoint {
  const currentBreakpoint = useCurrentBreakpoint();
  switch (currentBreakpoint) {
    case 'xs':
      return 'mobile';

    case 'sm':
      return 'tablet';

    default:
      return 'desktop';
  }
}
