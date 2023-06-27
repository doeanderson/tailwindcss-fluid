import { stripUnit } from "./strip-unit";

export function rem(
  value: string,
  root: string,
) {
  return `${stripUnit(value) / stripUnit(root)}rem`;
}
