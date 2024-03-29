# Tailwind CSS Fluid Plugin

Tailwind CSS plugin for making fluid units.

## Install

```bash
yarn add --dev @doeanderson/tailwindcss-fluid
```

## Usage

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fluid: {
        fontSize: {
          '1xl': {
            min: '0.875rem',
            max: '1rem',
          },
          '2xl': {
            min: '1.125rem',
            max: '1.25rem',
          },
          '3xl': {
            min: '1.375rem',
            max: '2rem',
          },
          //..
        },
        spacing: {
          '1': {
            min: '1rem',
            max: '2rem',
          },
          '2': {
            min: '3',
            max: '4rem',
          },
          //..
        },
      },
      //..
    },
  },
  plugins: [
    require('@doeanderson/tailwindcss-fluid')({
      prefix: 'fluid', // optional
      maxWidth: '1536px', // optional
      minWidth: '640px', // optional
    });
    //..
  ],
}
```

## License

[MIT License](https://github.com/doeanderson/tailwindcss-fluid/blob/main/LICENSE) ©2023 [Doe-Anderson](https://github.com/doeanderson)
