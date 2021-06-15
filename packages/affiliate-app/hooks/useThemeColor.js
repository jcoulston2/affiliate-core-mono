//@flow
import { useTheme } from '@hooks';

export default function useThemeColor(key: string): string | { [string]: string } {
  const { brandThemeColors } = useTheme();
  if (key === 'primary') {
    return brandThemeColors.primaryColor;
  } else if (key === 'secondary') {
    return brandThemeColors.secondaryColor;
  } else if (key === 'tertiary') {
    return brandThemeColors.tertiaryColor;
  } else if (key === 'all') {
    return brandThemeColors;
  } else {
    return key;
  }
}
