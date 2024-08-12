//Change the consts below to match your local area. 

const country = 'GB'; //2 Letter Country Code
const latitude = '50.728352'; //Latitude, you can get this from https://www.latlong.net/ 
const longitude = '-1.985934'; //Longitude
const unit = 'km'; //radius measurement unit km - Kilometers, m - Miles
const radius = '5'; //distance from center point
const start = '2024-07-01'; //YYYY-MM-DD Recommened to bring this forward occasionally to reduce the amount of data loaded. 


document.addEventListener("DOMContentLoaded", fetchData)
document.getElementById('tcg').addEventListener('change', fetchData);
document.getElementById('vg').addEventListener('change', fetchData);
document.getElementById('go').addEventListener('change', fetchData);


function fetchData() {
    const baseURL = 'https://pokedata.ovh/events/api';
    let url = '';
    if (document.getElementById('tcg').checked) {
        url += '/_tcg/cups/challenges/non/pre';
    }
    if (document.getElementById('vg').checked) {
        url += '/_vg/cups/challenges/non';
    }
    if (document.getElementById('go').checked) {
        url += '/_go/cups/challenges';
    }
    url = `${baseURL}${url}/_country/${country}/_latitude/${latitude}/_longitude/${longitude}/_radius/${radius}/_unit/${unit}/_start/${start}`;
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Convert fetched data to FullCalendar events format
            const events = data.map(event => ({
                title: event.name,
                start: event.when,
                allDay: false,
                extendedProps: {
                    pokemon_url: event.pokemon_url,
                    shop: event.shop
                }
            }));
            // Initialize FullCalendar
            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                views: {
                    list: { // Custom list view
                        type: 'list',
                        duration: {
                            days: 7
                        }, // Show 7 days at a time
                        buttonText: 'List Week', // Text for the list view button
                    },
                    list2: { // Custom list view
                        type: 'list',
                        duration: {
                            month: 1
                        },
                        buttonText: 'List Month', // Text for the list view button
                    },
                    month: { // Custom year view
                        type: 'dayGridMonth',
                        buttonText: 'Month Calendar' // Text for the year view button
                    }
                },
                firstDay: 1,
                events: events,
                eventClick: function(info) {
                    if (info.event.extendedProps.pokemon_url) {
                        window.open(info.event.extendedProps.pokemon_url, '_blank');
                    }
                },
                eventClassNames: function(arg) {
                    if (arg.event.extendedProps.shop === 'store1Name') { //the store name should match exactly to the API, you check the exact name on https://pokedata.ovh/events/ 
                        return 'event-purple';
                        //precoded options are event-purple, event-yellow, event-red. event-orange, event-green, event-blue
                        // add more by modifiying the CSS in index.html
                        //if you need more than 3 just copy and paste the block
                    }
                    if (arg.event.extendedProps.shop === 'store2Name') {
                        return 'event-green';
                    }
                    if (arg.event.extendedProps.shop === 'store3Name') {
                        return 'event-blue';                        
                    }
                    return '';
                },
                headerToolbar: {
                    start: '',
                    center: 'title',
                    end: 'today prev,next month,list,list2'
                }
            });
            calendar.render();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}