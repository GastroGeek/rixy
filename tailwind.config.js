module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './src/**/*.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        secondary: '#2e2e2e',
        tertiary: '#1b1b1b',
        // accent: '#EE6C00'
        accent: '#77994F'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus'],
    borderWidth: ['responsive', 'hover', 'focus']
  },
  plugins: []
}
