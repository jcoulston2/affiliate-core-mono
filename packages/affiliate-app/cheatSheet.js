/////////// good URL for DEV

'http://localhost:3000/search/params?key-term=leather&key-words=Black'

////////////////////////////// break points

import bp from '@styles/breakPoints';

`
${bp.max_xs} {

}


(Mobile is less than 600px)
`;

///////////////////////////// Centered Grid

import Grid from '@material-ui/core/Grid';
`
<Grid container justify="center" alignItems="center">
  <Grid item xs>
    <Box textAlign="center">
      <Logo>FooBar</Logo>
    </Box>
  </Grid>
</Grid>;

`;

//////////////////////////////// Common CMS Grid with padding etc

import { StyledCmsGrid } from '@styles/CommonStyledComponents';

<StyledCmsGrid container {...gridContainerProps}> </StyledCmsGrid>


///////////////////////////// Event Mappings with CMS

// A reference in the cms needs to be defined for a button, e.g: 

{
  cta: {
    reference: 'hero-main-cta',
    text: "Let's go!",
    textTransform: 'capitalize',
    // ...
  }
}

import { StyledCmsGrid } from '@styles/CommonStyledComponents';

const cmsEventMappings = {
  'hero-main-cta': {
    onClick: () => {
      console.log('I will be asigned to the button from the cms');
    },
  },
};


<CmsGrid {...props} cmsEventMappings={cmsEventMappings}> </CmsGrid>


////////////////////////////////Images

<Image src="filter-icon.svg" alt="Select productFilters" />

//////////////////////////////// Custom Vertical align

import styled from 'styled-components';
const VerticalAlign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
<VerticalAlign>copy</VerticalAlign>;

//////////////////////////////////// CMS context

import { useCms } from '@hooks';
const { benefitBar } = useCms('header');

import { useTheme } from '@hooks';
const { textTheme } = useTheme()


////////////////////////////////// defining CMS text 

example = {
    mobile: { size: 14, weight: 500, color: 'primary' },
    tablet: { size: 15, weight: 500, color: 'primary' },
    desktop: { size: 16, weight: 500, color: 'primary' },
}


/* or using the helper method..... */

import { useCmsContext } from '@cmsContext';
import { getCmsContent } from '@helpers/cms';
const { benefitBar } = getCmsContent(cmsContext, 'header');

//////////////////////////////// Passing props to an extended MUI styled component

const BannerWrapper = styled(({ XYZ, children, ...rest }) => <Grid {...rest}>{children}</Grid>)`
  padding: ${(props) => props.XYZ}px;
  position: relative;
`;


//////////////////////////////// Common styled components

import { Flex } from '@styles/CommonStyledComponents';
import { Spacer } from '@styles/CommonStyledComponents';
<Spacer h={[{ value: 2, breakPoint: 'min_xs' }]} />
// or 
<Spacer h={2} />
<Flex></Flex>



///////////////////////////// cms config for typeography
{
  someName: 'bob'
  label: {
    mobile: {size: null, weight: 500, color: null},
    tablet: {size: null, weight: 500, color: 'red'},
    desktop: {size: null, weight: 500, color: null},
  }
}
import { CmsCopy } from '@types/cms';
import Typography from '@units/Typography';
import Copy from '@units/Copy';


<Typography tag="p" typeStyles={productPrimaryCtaCopy}>
  <Copy text={productPrimaryCtaText} />
</Typography>

<Typography tag="h3" typeStyles={productName}>
  {someName}
</Typography>

<Typography tag="h3" typeStyles={{
  mobile: 
}}>
  {someName}
</Typography>


///////////////////////// Button


import Button from '@units/Button';

<Button primary fullWidth>
  Apply filters
</Button>





/////////////////////////////// All Filters

//http://localhost:3000/product-listing/womens/jeans/filter/priceSort=recommended&priceThresholdLow=1&priceThresholdHigh=1000&keyWords=green,dress&saleThreshold=70


//////////////////////////////// Common data

`
padding: {
  mobile: 12,
  tablet: 6,
  desktop: 6
}

content: {
  text: "SHOP MEN",
  to: "/",
  icon: "",
  image: ""
}

`;

//////////////////////////////// GQL

`
// sections

{
  AffiliateData {
    section
  }
}


// all data

{
  AffiliateData {
    section
    data {
      category
      data {
        topLevelData {
          name
          price
          wasPrice
          isSale
          discount
          link
          image
        }
        detailedData {
          images
          description
        }
      }
    }
  }
}

// get all products for a section
{
  CategoryData(section: "kids") {
    section
    data {
      category
      data {
        topLevelData {
          name
          price
          wasPrice
          isSale
          discount
          link
          image
        }
        detailedData {
          images
          description
          selectedColor
          delivery            
          variants {
            variantText
            data
          }
          custom {
            customText
            data {
              value
              isDescriptive            
            }          
          }
        }
        metaData {
          domain
          brand
        }
      }
    }
  }
}

// get all products for a section for a category
{
  CategoryData(section: "kids", productType: "tops", productCountStart: 0, productCountEnd: 100) {
    section
    data {
      category
      data {
        topLevelData {
          name
          price
          wasPrice
          isSale
          discount
          link
          image
        }
        detailedData {
          images
          description
          selectedColor
          delivery            
          variants {
            variantText
            data
          }
          custom {
            customText
            data {
              value
              isDescriptive            
            }          
          }
        }
        metaData {
          domain
          brand
        }
      }
    }
  }
}



`;



//////// Query selectors

// If we want to select an element outside the react flow we can assign a attr 'data-ref="XYZ"'

document.querySelector('[data-ref="XYZ"]')




////////styled component extending with other components 


export const NavLinksContainer = styled(Grid)`
  && {
    padding: 0px !important;
    height: 100%;
    &:hover ${StyledMenu} {
      ${FirstLevelNavTitle} {
        &::after {
          border-bottom: 1px solid black;
          content: ' ';
          width: 20px;
          display: flex;
        }
      }
    }

    &:hover ${LabelContent} {
      display: block;
    }
  }
`;
