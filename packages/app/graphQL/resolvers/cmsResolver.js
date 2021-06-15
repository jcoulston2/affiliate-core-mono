//@flow
import { cms } from '@affiliate-master/config';
import { CmsJsonRequired } from '../customScalars';

type CmsResolver = {
  cms: Function,
  CmsJsonRequired: Object,
};

export default function cmsResolver(): CmsResolver {
  return {
    CmsJsonRequired,
    cms: () => cms,
  };
}
