# Rixy

An alternative WebUI for Guitarix.

Built using:

* Vue
* Vuex
* Tailwindcss
* Various utils

## Screenshots

### Fx List/Rack List
![lists](https://github.com/gastrogeek/rixy/blob/master/screenshot1.png?raw=true)

### Fx Controls
![controls](https://github.com/gastrogeek/rixy/blob/master/screenshot2.png?raw=true)

## Requirements

* Guitarix (Duh)
  * Should be running the webui [proxy](https://github.com/brummer10/guitarix/tree/master/trunk/webui)
* A web browser (desktop or mobile)

## Use case

I am a guitarist and would like to be able to remotely control Guitarix from my mobile device via a simple web-based UI. I want to be able to play around with the various plugins in order to get some awesome sounds whilst I am jamming. It would be great if it could make me play just like Slash from G N' R.

## Todo

* Presets
* Some plugins are disabled (see .env file) - they _might_ work, but I didn't need them. They may need custom components to handle file inputs etc.
* All the things

## Notes

Be sure to create your .env.local file! see .env.example for details.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

# Contributors

Use [headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind) with VSCode for easier [Tailwindcss](https://tailwindcss.com/) class ordering.