//@flow
import React from 'react';
import { type NavigationData } from '@types/navigationData';
import { QuickLabelTabs } from './styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

type SectionTabsProps = {
  navigationData: NavigationData,
  sectionTabValue: number,
  setSectionTabValue: Function,
};

type LabelTabsProps = {
  navigationData: NavigationData,
  sectionTabValue: number,
  labelTabValue: Function,
  setLabelTabValue: Function,
};

export function SectionTabs({
  navigationData,
  sectionTabValue,
  setSectionTabValue,
}: SectionTabsProps) {
  return (
    <Tabs
      indicatorColor="primary"
      variant="fullWidth"
      value={sectionTabValue}
      onChange={(event, newValue) => setSectionTabValue(newValue)}
      aria-label="simple tabs example">
      {navigationData.map(({ title }, index) => (
        <Tab
          key={`${title}-${index}`}
          label={title}
          id={`quick-find-tab-${index}`}
          aria-labelledby={`quick-find-tab-${index}`}
        />
      ))}
    </Tabs>
  );
}

export function LabelTabs({
  navigationData,
  sectionTabValue,
  labelTabValue,
  setLabelTabValue,
}: LabelTabsProps) {
  return (
    <QuickLabelTabs container>
      {navigationData.map(
        ({ subNav }, outerIndex) =>
          outerIndex === sectionTabValue && (
            <Tabs
              variant="fullWidth"
              value={labelTabValue}
              onChange={(event, newValue) => setLabelTabValue(newValue)}
              aria-label="simple tabs example">
              {subNav.map(({ title: labelTitle }, innerIndex) => (
                <Tab
                  key={`${labelTitle}-${innerIndex}`}
                  label={labelTitle}
                  id={`quick-find-tab-${innerIndex}`}
                  aria-labelledby={`quick-find-tab-${innerIndex}`}
                />
              ))}
            </Tabs>
          )
      )}
    </QuickLabelTabs>
  );
}
