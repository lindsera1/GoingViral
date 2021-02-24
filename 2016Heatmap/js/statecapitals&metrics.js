const json = require("./jsondata/jsontoparse.json");
const statecapitals = require("./jsondata/us_state_capitals.json")


// let statecapitals = JSON.parse(json);

let infections2016 = json["2016 Infection Rates"];
let GDP2016 = json["GDP 2016"];
let PCI2016 = json["2016 PCI"];
let uninsured2016 = json["Uninsured Rate 2016"];
let populationDensity2016 = json["2016_population_density"];


let infections2016array = [];
let GDP2016array = [];
let PCI2016array = [];
let uninsured2016array = [];
let populationDensity2016array =[];

for([key,value] of Object.entries(infections2016)){
    let Obj = {};
    Obj.State = key;
    Obj.InfectionRates = value;
    infections2016array.push(Obj);
}
for([key,value] of Object.entries(GDP2016)){
    let Obj = {};
    Obj.State = key;
    Obj.GDP = value;
    GDP2016array.push(Obj);
}
for([key,value] of Object.entries(PCI2016)){
    let Obj = {};
    Obj.State = key;
    Obj.PCI = value;
    PCI2016array.push(Obj);
}
for([key,value] of Object.entries(uninsured2016)){
    let Obj = {};
    Obj.State = key;
    Obj.uninsuredRate = value;
    uninsured2016array.push(Obj);

}
for([key,value] of Object.entries(populationDensity2016)){
    let Obj = {};
    Obj.State = key;
    Obj.PopulationDensity = value;
    populationDensity2016array.push(Obj);
}



for(element of populationDensity2016array){
    element["location"] = new Array();
}
for(element of uninsured2016array){
    element["location"] = new Array();
}
for(element of PCI2016array){
    element["location"] = new Array();
}
for(element of GDP2016array){
    element["location"] = new Array();
}
for(element of infections2016array){
    element["location"] = new Array();
}

let i = 0;

for([key,value] of Object.entries(statecapitals)){
    infections2016array[i]["location"][0] = value["lat"];
    infections2016array[i]["location"][1] = value["long"];
    GDP2016array[i]["location"][0] = value["lat"];
    GDP2016array[i]["location"][1] = value["long"];
    PCI2016array[i]["location"][0] = value["lat"];
    PCI2016array[i]["location"][1] = value["long"];
    uninsured2016array[i]["location"][0] = value["lat"];
    uninsured2016array[i]["location"][1] = value["long"];
    populationDensity2016array[i]["location"][0] = value["lat"];
    populationDensity2016array[i]["location"][1] = value["long"];
    i++;
}

