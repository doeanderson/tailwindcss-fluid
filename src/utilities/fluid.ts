import { convertPxToRem } from './convert';
import { stripUnit } from './strip-unit';

export function fluid(
  minSize: string,
  maxSize: string,
  minWidth: string,
  maxWidth: string,
  root: string,
) {
  minWidth = convertPxToRem(minWidth, root);
  maxWidth = convertPxToRem(maxWidth, root);

  const slope = (stripUnit(maxSize) - stripUnit(minSize)) / (stripUnit(maxWidth) - stripUnit(minWidth));
  const yAxisIntersection = -stripUnit(minWidth) * slope + stripUnit(minSize);
  const preferred = `${yAxisIntersection.toFixed(4)}rem + ${Number(slope.toFixed(4)) * 100}vw`;

  return `clamp(${minSize}, ${preferred}, ${maxSize})`;
}
