const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUi = (data) => {
    const { cityDets, weather} = data;

    //update UI
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc)

    //remove the display none for the card
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};


const updateCity = async (city) => {

        const cityDets = await getCity(city);
        const weather = await getWeather(cityDets.Key);

        return {cityDets, weather};
};

cityForm.addEventListener('submit', e => {

    //prevent default action
    e.preventDefault();

    //get city value from form
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update ui with new city
    updateCity(city)
        .then(data => updateUi(data))
        .catch(err => console.log(err))
});