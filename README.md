# knockout-weather-app

Simple weather application based on [Knockoutjs](https://knockoutjs.com/). 
Application uses:
  - [JQuery](https://jquery.com/)
  - [Axios](https://github.com/axios/axios)
  - [webpack](http://webpack.js.org) to bundle the app
  - https://rapidapi.com/community/api/open-weather-map as the source of weather data

## Development
1. Create `.env` with the `API_HOST` and `API_KEY` fields containing your Open Weather Map credentials
2. `npm install`
3. `npm start`

> You can generate your Open Weather Map credentials on https://rapidapi.com/

## Production
1. `npm install`
2. `npm run build`
