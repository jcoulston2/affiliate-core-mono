//@flow
import React, { createContext, useContext } from 'react';
import { type CmsData } from '../types/apiQueries';

type CmsProviderProps = {
  cms: CmsData,
  children: any,
};

const initialCmsState = { cmsData: {} };
export const CmsContext: { [string]: any } = createContext();
export const CmsProvider = ({ children, cms = initialCmsState }: CmsProviderProps) => {
  return <CmsContext.Provider value={cms}>{children}</CmsContext.Provider>;
};

// Makes things a little easier to hook into our state
export const useCmsContext = () => useContext(CmsContext);
