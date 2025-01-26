export function extractCodes(
  data: any,
  codeKey = "code",
  childrenKey = "children"
) {
  const codes: any = [];

  function recurse(items: any) {
    for (const item of items) {
      if (item[codeKey]) {
        codes.push(item[codeKey]);
      }
      if (item[childrenKey] && Array.isArray(item[childrenKey])) {
        recurse(item[childrenKey]);
      }
    }
  }

  recurse(data);

  return codes;
}

export function generateUniqueCode() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
}
