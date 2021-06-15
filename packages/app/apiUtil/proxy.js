//@flow
import axios from 'axios';

type ProxyMethods = {
  get: Function,
  post: Function,
  graphQl: Function,
};

export default function proxy(): ProxyMethods {
  const get = (endPoint: string, query: string, headers?: Object = {}): Promise<any> => {
    return axios.get(`${endPoint}${query}`, headers);
  };

  const post = (endPoint: string, body: Object, headers?: Object = {}): Promise<any> => {
    return axios.post(endPoint, body, headers);
  };

  const graphQl = async (
    endPoint: string,
    queryString: Object,
    variables?: Object
  ): Promise<any> => {
    const { data: responseQuery } = await axios.post(endPoint, { query: queryString, variables });
    return responseQuery.data;
  };

  return {
    get,
    post,
    graphQl,
  };
}
