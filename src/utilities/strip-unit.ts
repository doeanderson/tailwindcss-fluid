export function stripUnit(value: string) {
  return Number((value).toString().replace(/[^\d\.-]/gi, ''));
}
