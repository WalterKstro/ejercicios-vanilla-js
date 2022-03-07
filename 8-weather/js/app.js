(function(){
    document.addEventListener('DOMContentLoaded', event => {
        const form = document.querySelector('#form');
        
        form.addEventListener('submit', event => {
            event.preventDefault();
            const [codeCountry,city] = getParams(form);
            (codeCountry != '' & codeCountry != 'Seleccione un país') & (city != '') && callApiWeather(city,codeCountry);
        })
        
    });

})()


function getParams(form){
    const [fieldCity,fieldCountry] = form.elements;
    return [fieldCity.value,fieldCountry.value];
}

async function callApiWeather(city,codeCountry){
    clearHtml(document.querySelector('#temperature'));
    clearHtml(document.querySelector('#humidity'));
    clearHtml(document.querySelector('#humidity'));
    clearHtml(document.querySelector('#pressure'));
    clearHtml(document.querySelector('#feel'));
    clearHtml(document.querySelector('#title-result'));
    try{
        
        handlerSpiner();

        const APID =  'a140554b36122765a451e6b9da23be1f';
        const endPointCoordenates = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${codeCountry}&appid=${APID}`;
        const response = await fetch(endPointCoordenates);
        const data = await response.json();
        const {lat,lon} = data[0];
        const endPointWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APID}`;
        const responseWeather = await fetch(endPointWeather);
        const {main,weather} = await responseWeather.json();
        const icon = weather[0].icon;
        
        createLayoutHTMLTemp(main,icon);
        createLayoutHtmlFooterTemp(main);
    }catch(error){
        notifications();
    }finally{
        handlerSpiner();
    }
}

function notifications(){
    const target = document.querySelector('#form').parentElement;
    const [alert] = generateTagsHtml(new Map([
        ['p',['alert','alert-danger','mt-4','text-center']]
    ]));
    alert.textContent = "Error, por favor verifique los datos ingresados";
    target.appendChild(alert);

    setTimeout(() => {
        target.removeChild(alert);
    } , 3000);
}

function createLayoutHTMLTemp({temp},icon){
    const wrapperTempearture = document.querySelector('#temperature');
    const titleResult = document.querySelector('#title-result');

    const [figure,figcaption,img] = generateTagsHtml(new Map([
        ['figure',['d-flex','justify-content-center','align-items-center']],
        ['figcaption',['fs-1','text-light']],
        ['img',['img-fluid']]
    ]));
    
    img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    figcaption.textContent = `${convertKelvinToCelsius(+temp)}°C`;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    wrapperTempearture.appendChild(figure);
    titleResult.textContent = 'Temperatura';
}

function createLayoutHtmlFooterTemp({feels_like,humidity,pressure}) {
    const humedad = document.querySelector('#humidity');
    const pression = document.querySelector('#pressure');
    const sensacion = document.querySelector('#feel');
    
    const [pHumidity,pPressure,pFeelds] = generateTagsHtml(new Set([
        ['p',['text-light','text-center','lead','m-0','py-2']],
        ['p',['text-light','text-center','lead','m-0','py-2']],
        ['p',['text-light','text-center','lead','m-0','py-2']],
    ]));
    pHumidity.textContent = `Humedad: ${humidity}%`;
    pPressure.textContent = `Presión: ${pressure} hPa`;
    pFeelds.textContent = `Sensación: ${convertKelvinToCelsius(+feels_like)}°C`;

    humedad.appendChild(pHumidity);
    pression.appendChild(pPressure);
    sensacion.appendChild(pFeelds);
}
function clearHtml(node){
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
}


function convertKelvinToCelsius(temp){
    return Math.ceil(temp - 273.15);
}


function generateTagsHtml(collections){
    const arrayTags = [];

    for (const [key,value] of collections) {
        const stringClases = value.join(' ');
        const tagHTMLCreated = document.createElement(key);
        tagHTMLCreated.className = stringClases;
        arrayTags.push(tagHTMLCreated);
    }
    return arrayTags;
}


function handlerSpiner(){
    const spiner = document.querySelector('#spiner');
    spiner.classList.toggle('d-none');
}
