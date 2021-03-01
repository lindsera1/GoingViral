

let infections2018array = new Array();
let GDP2018array = new Array();
let PCI2018array = new Array();
let uninsured2018array = new Array();
let populationDensity2018array = new Array();


//I have to do this, module imports not working
async function parseit(){

    const json = await fetch("https://raw.githubusercontent.com/lindsera1/GoingViral/main/Heatmap/js/jsondata/jsontoparse_2018.json");
    const jsontoparse18 = await json.json();


    let infections2018 = jsontoparse18["2018 Infection Rates"];
    let GDP2018 = jsontoparse18["GDP 2018"];
    let PCI2018 = jsontoparse18["2018 PCI"];
    let uninsured2018 = jsontoparse18["Uninsured Rate 2018"];
    let populationDensity2018 = jsontoparse18["2018_population_density"];

    for([key,value] of Object.entries(infections2018)){
        let Obj = {};
        Obj.State = key;
        Obj.InfectionRates = value;
        infections2018array.push(Obj);
    }
    for([key,value] of Object.entries(GDP2018)){
        let Obj = {};
        Obj.State = key;
        Obj.GDP = value;
        GDP2018array.push(Obj);
    }
    for([key,value] of Object.entries(PCI2018)){
        let Obj = {};
        Obj.State = key;
        Obj.PCI = value;
        PCI2018array.push(Obj);
    }
    for([key,value] of Object.entries(uninsured2018)){
        let Obj = {};
        Obj.State = key;
        Obj.uninsuredRate = value;
        uninsured2018array.push(Obj);

    }
    for([key,value] of Object.entries(populationDensity2018)){
        let Obj = {};
        Obj.State = key;
        Obj.PopulationDensity = value;
        populationDensity2018array.push(Obj);
    }



    for(element of populationDensity2018array){
        element["location"] = new Array();
    }
    for(element of uninsured2018array){
        element["location"] = new Array();
    }
    for(element of PCI2018array){
        element["location"] = new Array();
    }
    for(element of GDP2018array){
        element["location"] = new Array();
    }
    for(element of infections2018array){
        element["location"] = new Array();
    }

    const response  = await fetch("https://raw.githubusercontent.com/lindsera1/GoingViral/main/Heatmap/js/jsondata/us_state_capitals.json");
    const data18 = await response.json();
    
    let i = 0;

    for([key,value] of Object.entries(data18)){
        infections2018array[i]["location"][0] = value["lat"];
        infections2018array[i]["location"][1] = value["long"];
        GDP2018array[i]["location"][0] = value["lat"];
        GDP2018array[i]["location"][1] = value["long"];
        PCI2018array[i]["location"][0] = value["lat"];
        PCI2018array[i]["location"][1] = value["long"];
        uninsured2018array[i]["location"][0] = value["lat"];
        uninsured2018array[i]["location"][1] = value["long"];
        populationDensity2018array[i]["location"][0] = value["lat"];
        populationDensity2018array[i]["location"][1] = value["long"];
        i++;
    }
    //Creating the three layers to visualize differently
    let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_key
    });

    let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_key
    });

    let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_key
    });

    //Creating the actual map
    let map = L.map('mapid', {
        center: [40.7, -94.5],
        zoom: 3,
        layers: [satelliteStreets]
    });

    // Create a base layer that holds all three maps.
    let baseMaps = {
        "Streets": streets,
        "Satellite": satelliteStreets,
        "Dark": dark
    };

    let Viral_Concetration_2018 = new L.LayerGroup();
    let GDP_2018 = new L.LayerGroup();
    let Population_density_2018 = new L.LayerGroup();
    let PCI_2018 = new L.LayerGroup();
    let Uninsured_2018 = new L.LayerGroup();
        

    // Add a reference to the viral concentration and socioeconomic metrics groups to the overlays object.
    let overlays = {
        "Viral_Concentration_2018": Viral_Concetration_2018,
        "GDP_2018": GDP_2018,
        "PCI_2018": PCI_2018,
        "Population_density_2018": Population_density_2018,
        "Uninsured_rates_2018": Uninsured_2018
    };


    // Then we add a control to the map that will allow the user to change which
    // layers are visible.
    L.control.layers(baseMaps, overlays).addTo(map);


    
    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getGDPColor(metric) {
        if (metric < 500000) {
        return "#ff9999";
        }
        if (metric < 1000000) {
        return "#ff6363";
        }
        if (metric < 1500000) {
        return "#ff2b2b";
        }
        if (metric < 2000000) {
            return "##ff0000";
        }
        if (metric < 2500000) {
            return "#b50000";
        }
        return "#98ee00";
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    function getGDPRadius(metric) {
        if (metric === 0) {
        return 1;
        }
        return metric * 4;
    }

    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getPCIColor(metric) {
        if (metric < 40000) {
        return "#fcffbf";
        }
        if (metric < 50000) {
        return "#f9ff80";
        }
        if (metric < 60000) {
        return "#f5ff30";
        }
        if (metric < 70000) {
            return "#f3ff00";
        }
        if (metric < 80000) {
            return "#c0c902";
        }
        return "#98ee00";
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    function getPCIRadius(metric) {
        if (metric === 0) {
        return 1;
        }
        return metric * 4;
    }

    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getUninsuredColor(metric) {
        if (metric < 5) {
        return "#b3ffc3";
        }
        if (metric < 10) {
        return "#54ff78";
        }
        if (metric < 15) {
        return "#00ff36";
        }
        if (metric < 20) {
            return "#009920";
        }
        return "#98ee00";
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    function getUninsuredRadius(metric) {
        if (metric === 0) {
        return 1;
        }
        return metric * 4;
    }

    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getPopDensityColor(metric) {
        if (metric < 250) {
        return "#bdfff9";
        }
        if (metric < 500) {
        return "#70fff2";
        }
        if (metric < 750) {
        return "#38ffff";
        }
        if (metric < 1000) {
            return "#00eeff";
        }
        if (metric < 1250) {
            return "#00c1cf";
        }
        return "#98ee00";
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    function getPopDensityRadius(metric) {
        if (metric === 0) {
        return 1;
        }
        return metric * 4;
    }

    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getViralConcentrationColor(metric) {
        if (metric < 0.5) {
        return "#c6b0ff";
        }
        if (metric > 1) {
        return "#aa8aff";
        }
        if (metric < 1.5) {
        return "#7e4fff";
        }
        if (metric < 2) {
            return "#6830ff";
        }
        if (metric < 2.5) {
            return "#4500ff";
        }
        if (metric < 3) {
            return "#25008a";
        }
        return "#98ee00";
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    function getViralConcentrationRadius(metric) {
        if (metric === 0) {
        return 1;
        }
        return metric * 4;
    }
    

    // Loop through the state array and create one marker for each city.
    infections2018array.forEach(state => {
        L.circleMarker(state.location, {
            radius: getViralConcentrationRadius(state.InfectionRates) * 5,
            fillcolor: getViralConcentrationColor(state.InfectionRates),
            opacity: 1,
            fillOpacity: 1,
            weight: 0.5
        })
        .bindPopup("<h1>" + state.State + "<h1><br><h2>" + state.InfectionRates + " percent of the population infected</h2>")
    .addTo(Viral_Concetration_2018);
    });

    Viral_Concetration_2018.addTo(map);

    GDP2018array.forEach(state => {
        L.circleMarker(state.location, {
            radius: getGDPRadius(state.GDP)/700000,
            fillcolor: getGDPColor(state.GDP),
            opacity: 1,
            fillOpacity: 1,
            weight: 0.5,
            color: "#000000",
            stroke: true
        })
        .bindPopup("<h1>" + state.State + "<h1><br><h2>" + state.GDP + " gross domestic product, in millions of dollars</h2>")
    .addTo(GDP_2018);
    });

    GDP_2018.addTo(map);

    PCI2018array.forEach(state => {
        L.circleMarker(state.location, {
            radius: getPCIRadius(state.PCI),
            fillcolor: getPCIColor(state.PCI),
            opacity: 1,
            fillOpacity: 1,
            weight: 0.5,
            color: "#000000",
        })
        .bindPopup("<h1>" + state.State + "<h1><br><h2>" + state.PCI + " per capita income</h2>")
    .addTo(PCI_2018);
    PCI_2018.addTo(map);
    });



    uninsured2018array.forEach(state => {
        L.circleMarker(state.location, {
            radius: getUninsuredRadius(state.uninsuredRate),
            fillcolor: getUninsuredColor(state.uninsuredRate),
            opacity: 1,
            fillOpacity: 1,
            weight: 0.5,
            color: "#000000",
            stroke: true
        })
        .bindPopup("<h1>" + state.State + "<h1><br><h2>" + state.uninsuredRate + " percent of the population uninsured</h2>")
    .addTo(Uninsured_2018);

    });
    Uninsured_2018.addTo(map);



    populationDensity2018array.forEach(state => {
        
        L.circleMarker(state.location, {
            radius: getPopDensityRadius(state.PopulationDensity),
            fillcolor: getPopDensityColor(state.PopulationDensity),
            opacity: 1,
            fillOpacity: 1,
            weight: 0.5,
            color: "#000000",
            stroke: true
        })
        .bindPopup("<h1>" + state.State + "<h1><hr><h2>" + state.PopulationDensity + " people per square mile</h2>")
    .addTo(Population_density_2018);
    });

    Population_density_2018.addTo(map);
    
}
parseit();
//End of necessary code



