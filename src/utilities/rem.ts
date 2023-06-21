import { stripUnit } from "./strip-unit";

export function rem(
  value: string,
  root = '16px'
) {
  return `${stripUnit(value) / stripUnit(root)}rem`;
}
