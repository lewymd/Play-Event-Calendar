
# Play! Pokemon Local Event Calendar

This project allows you to make a online Calendar from your local area that automatically pulls all details from Play! Pokemon Event Locator.

You can find a running version of this for my local area at https://lewymd.com/PooleEventCalendar

Thanks to JuHlien and their API from https://pokedata.ovh/

This is still early in production and my CSS skills are not the best, feel free to contribute to imporve it. 

# Requirements

You'll need to already have your own web hosting and domain.

Some very basic knowledge to make changes to the files for your needs.

# Setting Up

Download the repo and open script.js

In this file you'll need to configure the top 6 const values for your area.

```
const country = 'GB'; //2 Letter Country Code
const latitude = '50.728352'; //Latitude, you can get this from https://www.latlong.net/ 
const longitude = '-1.985934'; //Longitude
const unit = 'km'; //radius measurement unit km - Kilometers, m - Miles
const radius = '5'; //distance from center point
const start = '2024-07-01'; //YYYY-MM-DD Recommened to bring this forward occasionally to reduce the amount of data loaded. 
```

If you have multiple leagues on your calendar and you want to add colours per store/league you'll also need to assign these in `eventClassNames` from line 76 onwards.

```
                    if (arg.event.extendedProps.shop === store1Name') {
                        return 'event-green';  
```

If the store name was Bobs Gaming and you wanted the colour to be blue you would need to change it to this.

```
                    if (arg.event.extendedProps.shop === 'BOBS GAMING') {
                        return 'event-blue';                        
                    }
```
The store name should match exactly to the API, you check the exact name on https://pokedata.ovh/events/

The handcoded colour options are `event-purple`, `event-yellow`, `event-red`, `event-orange`, `event-green`, `event-blue`

If you want a different colour you can add it to the style in `index.html` in the following format

```
         .event-black {
         background-color: black;
         color: white;
         }
```

Finally add your area name to 'index.html'

```
      <h1 id = title>{AREA} Event Calendar</h1>
```

Change that line so that {AREA} becomes your area name

```
      <h1 id = title>Poole Event Calendar</h1>
```

Place the files in your domain root or required subfolder and you'll be away. 
