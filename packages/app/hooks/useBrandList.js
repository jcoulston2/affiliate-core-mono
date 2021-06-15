//@flow
import { useSelector } from 'react-redux';
import { type GlobalState } from '@types/appState';

export default function useBrandList() {
  const brandList = useSelector((appState: GlobalState): Array<string> => {
    const { buildTimeState } = appState;
    return buildTimeState.brands;
  });

  return brandList;
}
