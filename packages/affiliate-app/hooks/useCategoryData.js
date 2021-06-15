//@flow
import { useSelector } from 'react-redux';
import { type GlobalState } from '@types/appState';
import { type NavigationData } from '@types/navigationData';

export default function useCategoryData(): NavigationData {
  const catData = useSelector((appState: GlobalState): NavigationData => {
    const { buildTimeState } = appState;
    return buildTimeState.navigationData;
  });

  return catData;
}
