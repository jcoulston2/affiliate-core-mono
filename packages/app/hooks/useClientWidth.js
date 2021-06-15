//@flow
import { useSelector } from 'react-redux';

export default function useClientWidth(): number {
  return useSelector(({ globalAppState }) => globalAppState?.clientWidth);
}
