function attachEvents() {
    const weatherSymbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': `&#176;`
    };
    $('#submit').on('click', getCityCode);
    const locationsUrl = 'https://judgetests.firebaseio.com/locations.json';
    const todayForecastUrl = 'https://judgetests.firebaseio.com/forecast/today/';
    const upcomingForecastUrl = 'https://judgetests.firebaseio.com/forecast/upcoming/';
    function getCityCode() {
        let cityCode = '';
        let cityInput = $('#location').val();
        fetch(locationsUrl)
            .then(response => response.json())
            .then(data => {
                for (const city of data) {
                    if(cityInput === city.name) {
                        cityCode = city.code;
                        break;
                    }
                }
                if(cityCode !== '') {
                    getCityForecast(cityCode);
                }else {
                    displayError()
                }
            });
        $('#location').val('')
    }

    function getCityForecast(cityCode) {
        fetch(todayForecastUrl + cityCode + '.json')
            .then(response => response.json())
            .then(data => {
                createCurrentForecastElements(data);
            })
            .catch(error => displayError);

        fetch(upcomingForecastUrl + cityCode + '.json')
            .then(response => response.json())
            .then(data => {
                displayUpcomingForecasts(data)
            })
            .catch(error => displayError);
        
        
    }

    

    function createCurrentForecastElements(todayForecast) {
        $('#forecast').css('display', 'block');
        if($('#current .symbol')) {
            $('#current .symbol').remove();
            $('#current .condition').remove();
        }

        let condition = todayForecast.forecast.condition;
        let $current = $('#current');
        let elementsToAppend = $(`<span class="symbol">${weatherSymbols[condition]}</span>
                                 <span class="condition">
                                    <span class="forecast-data">${todayForecast.name}</span>
                                    <span class="forecast-data">${todayForecast.forecast.low}&#176;/${todayForecast.forecast.high}&#176;</span>
                                    <span class="forecast-data">${condition}</span>
                                 </span>`);
        $current.append(elementsToAppend);                        
    }
    
    function displayUpcomingForecasts(upcomingForecast) {
        let forecasts = upcomingForecast.forecast;
        let $upcoming = $('#upcoming');
        if($('#upcoming .upcoming')) {
            $('#upcoming .upcoming').remove();
        }
        let elementsToAppend = $(`<span class="upcoming">
                                    <span class="symbol">${weatherSymbols[forecasts[0].condition]}</span>
                                    <span class="forecast-data">${forecasts[0].low}&#176;/${forecasts[0].high}&#176;</span>
                                    <span class="forecast-data">${forecasts[0].condition}</span>
                                </span>
                                <span class="upcoming">
                                    <span class="symbol">${weatherSymbols[forecasts[1].condition]}</span>
                                    <span class="forecast-data">${forecasts[1].low}&#176;/${forecasts[1].high}&#176;</span>
                                    <span class="forecast-data">${forecasts[1].condition}</span>
                                </span>
                                <span class="upcoming">
                                    <span class="symbol">${weatherSymbols[forecasts[1].condition]}</span>
                                    <span class="forecast-data">${forecasts[1].low}&#176;/${forecasts[1].high}&#176;</span>
                                    <span class="forecast-data">${forecasts[1].condition}</span>
                                </span>`);
        $upcoming.append(elementsToAppend);                   
    }

    function displayError(error) {
        $('#forecast').css('display', 'block');
        $('#forecast').text('Error');
    }
}