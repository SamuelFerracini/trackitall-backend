export function invertTrackingCodes(trackingCodes: any[]): any[] {
  function invertObjectList(codes: any[]): any[] {
    let result: any[] = [];

    for (const code of codes) {
      if (code.children && code.children.length > 0) {
        result = [...invertObjectList(code.children), code, ...result];
      } else {
        result.unshift(code);
      }
    }

    return result;
  }

  return invertObjectList(trackingCodes);
}
