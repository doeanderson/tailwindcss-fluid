import { rem } from './rem';
import { stripUnit } from './strip-unit';

export function fluid(
  minSize: string,
  maxSize: string,
  minWidth: string,
  maxWidth: string,
  root: string,
) {
  minWidth = rem(minWidth, root);
  maxWidth = rem(maxWidth, root);

  const slope = (stripUnit(maxSize) - stripUnit(minSize)) / (stripUnit(maxWidth) - stripUnit(minWidth));
  const yAxisIntersection = -stripUnit(minWidth) * slope + stripUnit(minSize);
  const preferred = `${yAxisIntersection.toFixed(4)}rem + ${Number(slope.toFixed(4)) * 100}vw`;

  return `clamp(${minSize}, ${preferred}, ${maxSize})`;
}
