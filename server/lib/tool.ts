export function isNull( param ) {
  if (Array.isArray( param )) {
    return param.length === 0;
  }
  else if (param !== null && typeof param === 'object') {
    for (var prop in param) {
      return false;
    }
    return true;
  }
  return param === '' || param === null || param === undefined;
}