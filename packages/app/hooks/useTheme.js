//@flow
import { useCmsContext } from '@cmsContext';
import { type Theme } from '../types/theme';

export default function useTheme(): Theme {
  const context = useCmsContext();
  return context?.theme;
}
