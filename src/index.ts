import plugin from 'tailwindcss/plugin';
import { fluid } from './utilities/fluid';
import { stripUnit } from './utilities/strip-unit';

type TailwindCSSFluidOptions = {
  maxWidth?: string,
  minWidth?: string,
  prefix?: string;
  root?: string,
};

export default plugin.withOptions((options: TailwindCSSFluidOptions = {}) => ({
  addUtilities,
  matchUtilities,
  theme,
}) => {
    const units: {
      [key: string]: string | {
        min: string,
        max: string,
      },
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

    for (const unit in units) {
      const selectors: {
        [key: string]: () => void,
      } = {
        gap: () => {
          const properties: {
            [key: string]: string | string[],
          } = {
            gap: 'gap',
            'gap-x': 'column-gap',
            'gap-y': 'row-gap',
          };

          for (const property in properties) {
            matchUtilities(
              (() => {
                // TODO: Add negative variants of each utility
                return {
                  [`${prefix}-${property}`]: (value: string | {
                    min: string,
                    max: string,
                  }) => {
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
                };
              })(),
              { values: theme('fluid.gap') },
            );
          }
        },
        margin: () => {
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
              (() => {
                // TODO: Add negative variants of each utility
                return {
                  [`${prefix}-${property}`]: (value: string | {
                    min: string,
                    max: string,
                  }) => {
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
                };
              })(),
              { values: theme('fluid.margin') },
            );
          }
        },
        padding: () => {
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
              (() => {
                // TODO: Add negative variants of each utility
                return {
                  [`${prefix}-${property}`]: (value: string | {
                    min: string,
                    max: string,
                  }) => {
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
                };
              })(),
              { values: theme('fluid.padding') },
            );
          }
        },
        space: () => {
          matchUtilities(
            (() => {
              // TODO: Add negative variants of each utility
              return {
                [`${prefix}-space-x`]: (value: string | {
                  min: string,
                  max: string,
                }) => {
                  if (typeof value === 'string') {
                    return {
                      [unit]: value,
                    }
                  }

                  return {
                    '& > :not([hidden]) ~ :not([hidden])': {
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
              };
            })(),
            { values: theme('fluid.space') },
          );

          matchUtilities(
            (() => {
              // TODO: Add negative variants of each utility
              return {
                [`${prefix}-space-y`]: (value: string | {
                  min: string,
                  max: string,
                }) => {
                  if (typeof value === 'string') {
                    return {
                      [unit]: value,
                    }
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
              };
            })(),
            { values: theme('fluid.space') },
          );

          addUtilities({
            [`.${prefix}-space-x-reverse > :not([hidden]) ~ :not([hidden])`]: { [`--${prefix}-space-x-reverse`]: '1' },
            [`.${prefix}-space-y-reverse > :not([hidden]) ~ :not([hidden])`]: { [`--${prefix}-space-y-reverse`]: '1' },
          });
        },
        text: () => {
          matchUtilities(
            (() => {
              // TODO: Add negative variants of each utility
              return {
                [`${prefix}-text`]: (value: string | {
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
                },
              };
            })(),
            { values: theme('fluid.text') },
          );
        },
      }

      if (Object.keys(selectors).includes(unit)) {
        selectors[unit]();
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
          { values: units[unit] as any },
        );
      }
    }
  }
);
