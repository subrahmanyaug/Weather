const input=document.getElementById("input-city");
const button=document.getElementById("button-search");
const display=document.getElementById("weather-display");
const button_current=document.getElementById("button");
button.addEventListener("click",async ()=>{
    const val=input.value.trim();
    if(!val){
        alert("enter city name");
        return;
    }
    try{
       const weather_response=await fetch(`http://api.weatherapi.com/v1/current.json?key=a2d030a4419048238f8153001241009&q=${val}&aqi=no`);
       if(!weather_response.ok)
       {
        throw new Error(weather_response.status)
       }
       const weather_report=await weather_response.json();
       display.innerHTML=`<h1>Location - ${weather_report.location.name}</h1><hr/>
       <h2>Region - ${weather_report.location.region}</h2>
       <h2>Country - ${weather_report.location.country}</h2>
       <h2>Local time - ${weather_report.location.localtime}</h2>
       <h3>Temperature in celsius - ${weather_report.current.temp_c}*c</h3>
       <h3>Temperature in fahrenheit - ${weather_report.current.temp_f}f</h3>
       <h4>Last update - ${weather_report.current.last_updated}</h4>
       <h1>--- ${weather_report.current.condition.text} ---</h1>
       <img width="150px"height="150px"src="${weather_report.current.condition.icon}"/>`
       ;
    }
    catch(error){
        alert(error.message);
        return;
    }
})
button_current.addEventListener("click",async ()=>{
    async function getting(lat,lan){
       const position= await fetch(`http://api.weatherapi.com/v1/current.json?key=a2d030a4419048238f8153001241009&q=${lat},${lan}&aqi=no`);
       const report=await position.json();
       display.innerHTML=`<h1>Location - ${report.location.name}</h1><hr/>
       <h2>Region - ${report.location.region}</h2>
       <h2>Country - ${report.location.country}</h2>
       <h2>Local time - ${report.location.localtime}</h2>
       <h3>Temperature in celsius - ${report.current.temp_c}*c</h3>
       <h3>Temperature in fahrenheit - ${report.current.temp_f}f</h3>
       <h4>Last update - ${report.current.last_updated}</h4>
       <h1>--- ${report.current.condition.text} ---</h1>
       <img width="150px"height="150px"src="${report.current.condition.icon}"/>`
       
    }
    async function getingdata(val){
     getting(val.coords.latitude,val.coords.longitude)
    }
    async function failtofetch(){
        alert("some issue is there");
    }
navigator.geolocation.getCurrentPosition(getingdata,failtofetch);
});
