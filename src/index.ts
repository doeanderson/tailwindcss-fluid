import plugin from 'tailwindcss/plugin';
import { KeyValuePair } from 'tailwindcss/types/config';
import { fluid } from './utilities/fluid';
import { stripUnit } from './utilities/strip-unit';

type TailwindCSSFluidOptions = {
  maxWidth?: string,
  minWidth?: string,
  prefix?: string;
  root?: string,
};

type TailwindCSSFuildUnitConfigValue = string | {
  letterSpacing?: string,
  lineHeight?: string,
  max: string,
  min: string,
};

type TailwindCSSFuildUnitConfig = KeyValuePair<string, TailwindCSSFuildUnitConfigValue>;

export default plugin.withOptions((options: TailwindCSSFluidOptions = {}) => ({
  addUtilities,
  matchUtilities,
  theme,
}) => {
    const units: {
      [key: string]: TailwindCSSFuildUnitConfig,
    } = theme('fluid');
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

    // TODO: Add support for remaining spacing units
    const spacingUnits: string[] = [
      'gap',
      'height',
      'margin',
      'padding',
      'space',
      'width',
    ];

    const unitUtilities: {
      [key: string]: (values: TailwindCSSFuildUnitConfig) => void,
    } = {
      gap: (values: TailwindCSSFuildUnitConfig) => {
        const properties: {
          [key: string]: string | string[],
        } = {
          gap: 'gap',
          'gap-x': 'column-gap',
          'gap-y': 'row-gap',
        };

        for (const property in properties) {
          matchUtilities(
            {
              [`${prefix}-${property}`]: (value: TailwindCSSFuildUnitConfigValue) => {
                let props = properties[property];

                if (!Array.isArray(props)) {
                  props = [props];
                }

                return props.reduce((a, v) => {
                  if (typeof value === 'string') {
                    return {
                      ...a,
                      [v]: value,
                    }
                  }

                  return {
                    ...a,
                    [v]: fluid(
                      value.min,
                      value.max,
                      minWidth,
                      maxWidth,
                      root,
                    ),
                  };
                }, {});
              },
            },
            { values: values as any },
          );
        }
      },
      height: (values: TailwindCSSFuildUnitConfig) => {
        matchUtilities(
          {
            [`${prefix}-h`]: (value: TailwindCSSFuildUnitConfigValue) => {
              if (typeof value === 'string') {
                return {
                  height: value,
                }
              }

              return {
                height: fluid(
                  value.min,
                  value.max,
                  minWidth,
                  maxWidth,
                  root,
                )
              };
            },
          },
          { values: values as any },
        );
      },
      margin: (values: TailwindCSSFuildUnitConfig) => {
        const properties: {
          [key: string]: string | string[],
        } = {
          m: 'margin',
          mb: 'margin-bottom',
          ml: 'margin-left',
          mr: 'margin-right',
          mt: 'margin-top',
          mx: ['margin-left', 'margin-right'],
          my: ['margin-bottom', 'margin-top'],
        };

        for (const property in properties) {
          matchUtilities(
            {
              [`${prefix}-${property}`]: (value: TailwindCSSFuildUnitConfigValue) => {
                let props = properties[property];

                if (!Array.isArray(props)) {
                  props = [props];
                }

                return props.reduce((a, v) => {
                  if (typeof value === 'string') {
                    return {
                      ...a,
                      [v]: value,
                    }
                  }

                  return {
                    ...a,
                    [v]: fluid(
                      value.min,
                      value.max,
                      minWidth,
                      maxWidth,
                      root,
                    ),
                  };
                }, {});
              },
            },
            { values: values as any },
          );
        }
      },
      padding: (values: TailwindCSSFuildUnitConfig) => {
        const properties: {
          [key: string]: string | string[],
        } = {
          p: 'padding',
          pb: 'padding-bottom',
          pl: 'padding-left',
          pr: 'padding-right',
          pt: 'padding-top',
          px: ['padding-left', 'padding-right'],
          py: ['padding-bottom', 'padding-top'],
        };

        for (const property in properties) {
          matchUtilities(
            {
              [`${prefix}-${property}`]: (value: TailwindCSSFuildUnitConfigValue) => {
                let props = properties[property];

                if (!Array.isArray(props)) {
                  props = [props];
                }

                return props.reduce((a, v) => {
                  if (typeof value === 'string') {
                    return {
                      ...a,
                      [v]: value,
                    }
                  }

                  return {
                    ...a,
                    [v]: fluid(
                      value.min,
                      value.max,
                      minWidth,
                      maxWidth,
                      root,
                    ),
                  };
                }, {});
              },
            },
            { values: values as any },
          );
        }
      },
      space: (values: TailwindCSSFuildUnitConfig) => {
        matchUtilities(
          {
            [`${prefix}-space-x`]: (value: string | {
              max: string,
              min: string,
            }) => {
              if (typeof value === 'string') {
                return {
                  '& > :not([hidden]) ~ :not([hidden])': {
                    [`--${prefix}-space-y-reverse`]: '0',
                    marginLeft: value,
                    marginRight: value,
                  }
                }
              }

              return {
                '& > :not([hidden]) ~ :not([hidden])': {
                  [`--${prefix}-space-y-reverse`]: '0',
                  marginLeft: fluid(
                    value.min,
                    value.max,
                    minWidth,
                    maxWidth,
                    root,
                  ),
                  marginRight: fluid(
                    value.min,
                    value.max,
                    minWidth,
                    maxWidth,
                    root,
                  ),
                },
              };
            },
          },
          { values: values as any },
        );

        matchUtilities(
          {
            [`${prefix}-space-y`]: (value: string | {
              max: string,
              min: string,
            }) => {
              if (typeof value === 'string') {
                return {
                  '& > :not([hidden]) ~ :not([hidden])': {
                    [`--${prefix}-space-y-reverse`]: '0',
                    marginLeft: value,
                    marginRight: value,
                  }
                };
              }

              return {
                '& > :not([hidden]) ~ :not([hidden])': {
                  [`--${prefix}-space-y-reverse`]: '0',
                  marginBottom: `calc(${fluid(
                    value.min,
                    value.max,
                    minWidth,
                    maxWidth,
                    root,
                  )} * var(--${prefix}-space-y-reverse))`,
                  marginTop: `calc(${fluid(
                    value.min,
                    value.max,
                    minWidth,
                    maxWidth,
                    root,
                  )} * calc(1 - var(--${prefix}-space-y-reverse)))`,
                },
              };
            },
          },
          { values: values as any },
        );

        addUtilities({
          [`.${prefix}-space-x-reverse > :not([hidden]) ~ :not([hidden])`]: { [`--${prefix}-space-x-reverse`]: '1' },
          [`.${prefix}-space-y-reverse > :not([hidden]) ~ :not([hidden])`]: { [`--${prefix}-space-y-reverse`]: '1' },
        });
      },
      text: (values: TailwindCSSFuildUnitConfig) => {
        matchUtilities(
          {
            [`${prefix}-text`]: (value: string | {
              letterSpacing?: string,
              lineHeight?: string,
              max: string,
              min: string,
            }) => {
              if (typeof value === 'string') {
                return {
                  fontSize: value,
                }
              }

              const properties: {
                fontSize: string,
                letterSpacing?: string,
                lineHeight?: string,
              } = {
                fontSize: fluid(
                  value.min,
                  value.max,
                  minWidth,
                  maxWidth,
                  root,
                )
              };

              if (value.letterSpacing) {
                properties.letterSpacing = value.letterSpacing;
              }

              if (value.lineHeight) {
                properties.lineHeight = value.lineHeight;
              }

              return properties;
            }
          },
          { values: values as any },
        );
      },
      width: (values: TailwindCSSFuildUnitConfig) => {
        matchUtilities(
          {
            [`${prefix}-w`]: (value: TailwindCSSFuildUnitConfigValue) => {
              if (typeof value === 'string') {
                return {
                  width: value,
                }
              }

              return {
                width: fluid(
                  value.min,
                  value.max,
                  minWidth,
                  maxWidth,
                  root,
                )
              };
            },
          },
          { values: values as any },
        );
      },
    };

    // TODO: Add support for generating negative utilities
    for (const unit in units) {
      if (unit === 'spacing') {
        for (const spacingUnit of spacingUnits) {
          if (Object.keys(units).includes(spacingUnit)) {
            continue;
          }

          createFluidUtilities(spacingUnit, units.spacing);
        }
        continue;
      }

      createFluidUtilities(unit, units[unit]);
    }

    function createFluidUtilities(unit: string, values: TailwindCSSFuildUnitConfig) {
      if (Object.keys(unitUtilities).includes(unit)) {
        unitUtilities[unit](values);
      } else {
        matchUtilities(
          {
            [`${prefix}-${unit}`]: (value: string | {
              min: string,
              max: string,
            }) => {
              if (typeof value === 'string') {
                return {
                  [unit]: value,
                }
              }

              return {
                [unit]: fluid(
                  value.min,
                  value.max,
                  minWidth,
                  maxWidth,
                  root,
                ),
              };
            },
          },
          { values: values as any },
        );
      }
    }
  }
);
