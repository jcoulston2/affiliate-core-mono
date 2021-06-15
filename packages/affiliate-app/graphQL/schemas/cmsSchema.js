import { buildSchema } from 'graphql';

export default buildSchema(`

  scalar CmsJsonRequired
  
  type Query {
    cms: CmsContent
  }

  type CmsContent {
    footer: CmsJsonRequired
    header: CmsJsonRequired
    landingContent: CmsJsonRequired
    listingContent: CmsJsonRequired
    productViewContent: CmsJsonRequired
    theme: CmsJsonRequired
    userSettings: CmsJsonRequired
    wishList: CmsJsonRequired
    document: CmsJsonRequired
    other: CmsJsonRequired
    about: CmsJsonRequired
    motivation: CmsJsonRequired
    helpAndInfo: CmsJsonRequired
    refunds: CmsJsonRequired
    payments: CmsJsonRequired
    developers: CmsJsonRequired
    platform: CmsJsonRequired
    termsAndConditions: CmsJsonRequired
    contact: CmsJsonRequired
    becomeAPartner: CmsJsonRequired
    cookies: CmsJsonRequired
    marketing: CmsJsonRequired
  }
`);
