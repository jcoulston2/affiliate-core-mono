/* eslint-disable no-use-before-define */
//@flow
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { Flex } from '@styles/CommonStyledComponents';
import { SearchContainerInner, SearchContainer } from './style';
import { Actionable } from '@styles/CommonStyledComponents';

type SearchInputWrapperProps = {
  children: any,
  searchToggled: boolean,
  handleSetToggled?: Function,
  initLooseSearch: Function,
  searchBarColor: string,
  searchIconColor: string,
};

export default function SearchInputWrapper({
  children,
  searchToggled,
  handleSetToggled,
  initLooseSearch,
  searchIconColor,
  searchBarColor,
}: SearchInputWrapperProps) {
  return (
    <SearchContainer
      key={Number(searchToggled)}
      {...(handleSetToggled ? { onClick: handleSetToggled } : {})}>
      <SearchContainerInner background={searchBarColor} alignItems="center" container>
        <Grid item>
          <Flex>
            <Actionable aria-label="search">
              <SearchIcon style={{ color: searchIconColor }} onClick={() => initLooseSearch()} />
            </Actionable>
          </Flex>
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </SearchContainerInner>
    </SearchContainer>
  );
}
