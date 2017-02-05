import buildParams from './buildparams.js';

export default function buildLink(props, path) {
  const query = buildParams(props);
  const link = {
    pathname: path,
    query: query
  };
  return link;
}
