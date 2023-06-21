import plugin from 'tailwindcss/plugin';
import { fluid } from './utilities/fluid';
import { stripUnit } from './utilities/strip-unit';
import { convertCamelCaseToFirstLetters } from './utilities/convert';

type TailwindCSSFluidOptions = {
  maxWidth?: string,
  minWidth?: string,
  prefix?: string;
  root?: string,
};

export default plugin.withOptions((options: TailwindCSSFluidOptions = {}) => ({
  matchUtilities,
  theme,
}) => {
    const units = theme('fluid');
    const screens = theme('screens');

    const {
      maxWidth = (() => {
        if (
          !screens
          || typeof screens !== 'object'
        ) {
          // NOTE: Value is based on tailwind default
          return '1536px';
        }

        return Object.values(screens)
          // TODO: Add support for screen objects
          .filter((screen) => typeof screen === 'string')
          .sort((a, b) => stripUnit(a) - stripUnit(b)).pop();
      })(),
      minWidth = (() => {
        if (
          !screens
          || typeof screens !== 'object'
        ) {
          // NOTE: Value is based on tailwind default
          return '640px';
        }

        return Object.values(screens)
          // TODO: Add support for screen objects
          .filter((screen) => typeof screen === 'string')
          .sort((a, b) => stripUnit(a) - stripUnit(b))[0];
      })(),
      prefix = 'fluid',
      root = '16px',
    } = options;

    for (const unit in units) {
      const className = (() => {
        if ([
          'height',
          'margin',
          'padding',
          'width',
        ].some((v) => unit.includes(v))) {
          return convertCamelCaseToFirstLetters(unit);
        }

        return unit;
      })();

      matchUtilities(
        {
          // TODO: Add negative variants of each utility
          [`${prefix}-${className}`]: (value: string | {
            letterSpacing?: string,
            lineHeight?: string,
            min: string,
            max: string,
          }) => {
            if (typeof value === 'string') {
              return {
                [unit]: value,
              }
            }

            switch (unit) {
              case 'text':
                return {
                  fontSize: fluid(
                    value.min,
                    value.max,
                    minWidth,
                    maxWidth,
                    root,
                  ),
                  letterSpacing: value.letterSpacing ?? null,
                  lineHeight: value.lineHeight ?? null,
                }
              default:
                return {
                  [unit]: fluid(
                    value.min,
                    value.max,
                    minWidth,
                    maxWidth,
                    root,
                  ),
                };
            }
          },
        },
        { values: units[unit] },
      );
    }
  }
);
