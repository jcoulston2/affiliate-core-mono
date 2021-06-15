/* eslint-disable no-use-before-define */
//@flow
import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { Flex, Actionable } from '@styles/CommonStyledComponents';
import ClearIcon from '@material-ui/icons/Clear';
import clientRequests from '../../../apiUtil/requests/clientRequests';
import { getPredictiveTermsList, getTermString } from './helper';
import { SEARCH_PATH } from '@constants';
import kebabCase from 'lodash/kebabCase';
import debounce from 'lodash/debounce';
import Drawer from '@units/Drawer';
import { useRouter } from 'next/router';
import { urlCase, delayedCallback, betterThrottle, createEvent } from '@helpers/common';
import { useTheme, useCms } from '@hooks';
import { type PredictiveSearch } from '@types/search';
import Loader from '@units/Loader';
import SearchInputWrapper from './SearchInputWrapper';
import {
  ClearIconContainer,
  ToogledSearchContainer,
  SearchContainer,
  SearchInput,
  SearchAutoCompleteBoxStyle,
  SuggestedText,
  DekstopSearchAction,
  LoaderContainer,
} from './style';

type SearchProps = {
  isToggleSearch?: boolean,
  onSubmitCallback?: Function,
};

export default function Search({ isToggleSearch, onSubmitCallback }: SearchProps) {
  const { textTheme } = useTheme();
  const [searchToggled, setSearchToggled] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [predictiveLoading, setPredictiveLoading] = useState(false);
  const inputRef = React.useRef();
  const router = useRouter();
  const { search: searchCms } = useCms('header');
  const { searchIconColor, searchBarColor } = searchCms;

  let apiThrottleTimeout;
  let smoothLoaderControler;

  const handleSetToggled = (): void => setSearchToggled(!searchToggled);

  const setPredictiveSearch = async (value: string): Promise<any> => {
    const result = await clientRequests.getPredictiveSearch(value);
    setPredictiveLoading(false);
    const predivtiveTerms = getPredictiveTermsList(result, value);
    setOptions([{ keyTerm: `"${value}"` }, ...predivtiveTerms]);
  };

  const handlePredictiveSearch = async ({ target: { value } }: Object): Promise<any> => {
    const valueCase = value.toLowerCase();
    setInputValue(valueCase);
    if (apiThrottleTimeout) clearTimeout(apiThrottleTimeout);
    apiThrottleTimeout = setTimeout(() => {
      // throttle reduces 'glitchy' loader animations caused by quick typing
      betterThrottle(() => setPredictiveLoading(!!value));
      if (value.length > 2) {
        setPredictiveSearch(valueCase);
      }
    }, 500);
  };

  const goToSearch = (page: string): void => {
    if (onSubmitCallback) onSubmitCallback();
    setSearchToggled(false);
    router.push(page);
  };

  const handleAutoCompleteClick = (option: PredictiveSearch): void => {
    const searchParams = Object.keys(option)
      .reduce(
        (acc, cur) => `${acc}${kebabCase(cur)}=${urlCase(option[cur]?.replace(/\"/g, ''))}&`,
        `/${SEARCH_PATH}?`
      )
      .slice(0, -1);

    handleSetToggled();
    goToSearch(searchParams);
  };

  const initLooseSearch = (): void => {
    if (inputValue && inputValue.length > 2) {
      goToSearch(`/${SEARCH_PATH}?key-term=${urlCase(inputValue)}`);
      handleSetToggled();
    }
  };

  const handleKeyDownSearch = () => ({ keyCode }: Object): void => {
    if (keyCode === 13) initLooseSearch();
  };

  const renderNoToggleSearch = (
    <SearchInputWrapper
      {...{
        searchToggled,
        initLooseSearch,
        searchIconColor,
        searchBarColor,
      }}>
      <SearchInput
        freeSolo
        ignoreCase
        disableClearable
        getOptionLabel={(option) => getTermString(option)}
        renderOption={(option) => (
          <SuggestedText onClick={() => handleAutoCompleteClick(option)}>
            {getTermString(option)}
          </SuggestedText>
        )}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handlePredictiveSearch}
            label=""
            autoFocus={searchToggled}
            variant="outlined"
            margin="normal"
            inputRef={inputRef}
            InputProps={{ ...params.InputProps, type: 'search' }}
            onBlur={() => createEvent(inputRef.current, 'mousedown', 50)}
            onKeyDown={handleKeyDownSearch()}
          />
        )}
      />
    </SearchInputWrapper>
  );

  return (
    <>
      <Drawer
        open={searchToggled}
        anchor="left"
        width={70}
        onClose={() => setPredictiveLoading(false)}>
        <div>
          <SearchAutoCompleteBoxStyle theme={textTheme} />
          <ToogledSearchContainer>
            <ClearIconContainer>
              <Actionable aria-label="search">
                <ClearIcon fontSize="large" onClick={handleSetToggled} />
              </Actionable>
            </ClearIconContainer>
            {renderNoToggleSearch}
            <LoaderContainer>
              <Loader active={predictiveLoading} />
            </LoaderContainer>
          </ToogledSearchContainer>
        </div>
      </Drawer>
      {isToggleSearch ? (
        <SearchIcon color={searchIconColor} fontSize="large" onClick={handleSetToggled} />
      ) : (
        <SearchInputWrapper
          {...{
            searchToggled,
            handleSetToggled,
            initLooseSearch,
            searchIconColor,
            searchBarColor,
          }}>
          <DekstopSearchAction fullWidth variant="outlined" />
        </SearchInputWrapper>
      )}
    </>
  );
}
