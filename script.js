
let dataMeteo1;
let dataMeteo2;
let geojson = {
    type: 'FeatureCollection',
    features: [{
      type: '',
      geometry: {
        type: '',
        coordinates: [0, 0]
      },
      properties: {
        title: '',
        description: '',
        icon:'',
        temperature:''
      }
    }]
  };

//api request
const fetchDataMeteo1 =async() => {
    dataMeteo1 = await fetch(
        `https://api.openweathermap.org/data/2.5/find?lat=-21.001111232791686&lon=55.40057963425958&cnt=50&units=metric&appid=225b127f9ce175b425c3f8eff035e73d`
    ).then(res => res.json());
};
const fetchDataMeteo2 =async() => {
    dataMeteo2 = await fetch(
        `https://api.openweathermap.org/data/2.5/find?lat=-21.225396576857158&lon=55.72431385981477&cnt=50&units=metric&appid=225b127f9ce175b425c3f8eff035e73d`
    ).then(res => res.json());
    //dataMeteo = dataMeteo.concat(dataMeteo2);
};

const showMeteo = async() =>{
    await fetchDataMeteo1();
    await fetchDataMeteo2();
    console.log(dataMeteo1);
    console.log(dataMeteo2);

    dataMeteo1.list.forEach(function(data){
        dataMeteo2.list.push(data)
    });
    
    console.log(dataMeteo2);

   dataMeteo2.list.forEach(function(data){
       
        geojson.features.push( {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [`${data.coord.lon}`,` ${data.coord.lat}`]
            },
            properties: {
              title: `${data.weather[0].description}`,
              description: `${data.name}`,
              icon: `${data.weather[0].id}`,
              temperature: `${data.main.temp}`
            }
          })
       
    })
   



   
};

const showMap = async() => {
    await showMeteo();
mapboxgl.accessToken = 'pk.eyJ1IjoiYmdoamZ1eWd5Z3lrZ2ZpdWsiLCJhIjoiY2tscnlqMjNvMWhwYTJ2cW1pZ3M3bjVxOCJ9.lpv7e-L2IISfCOUpoKpDkQ';
console.log(geojson);
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [55.532062499999995,-21.114533 ],
  zoom: 10
});
//creation marqueur


// add markers to map
geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    let el = document.createElement('div');
    el.className = `owf  owf-3x owf-${marker.properties.icon}`;
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p><p class = "temp">' + marker.properties.temperature.replace('.',',') + '</p>'))
      .addTo(map);
  });
}
 
 
    showMap();
 