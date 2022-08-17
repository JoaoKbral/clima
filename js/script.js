document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();
  clearInfo();
  let input = document.querySelector("#searchInput").value;

  if (input != "") {
    showWarning("Carregando...");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}
&appid=e659f06cf986d1768c5f625616604b1e&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();
  
    if(json.cod === 200){
        showInfo({
            name: json.name,
            country: json.sys.country,
            climaIcon: json.weather[0].icon,
            climaText: json.weather[0].description,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg,
            temp: json.main.temp
        });
    } else {
        showWarning('Não encontramos a localização')
    }
}
});

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').getElementsByClassName.display = 'none';
}

function showInfo(dados){
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${dados.name}, ${dados.country}`;
    document.querySelector('.tempInfo').innerHTML = `${dados.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${dados.windSpeed}<span>Km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${dados.climaIcon}@2x.png`);
    document.querySelector('.climaTitulo').innerHTML = `${dados.climaText}`;
    document.querySelector('.ventoPonto').style.transform = `$rotate(${dados.windAngle-90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}

//document.querySelector('.titulo').innerHTML = `${dados.name}`;