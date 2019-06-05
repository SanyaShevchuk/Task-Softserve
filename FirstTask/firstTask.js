import {
    createDefaultOption, 
    createOptions, 
    addOptions
} from './selectsOptions.js';

import {
    hideLoadingIcon, 
    hideNextSelects, 
    showNextSelect, 
    showLoadingIcon, 
    selects, 
    countryInfo
} from './displayHTMLElements.js'; 

// const selectsNames = Array.from(selects).map((element)=>{
//     return {'name' : element.name}
//     });
console.log(Array.from(selects));
console.log(_.values(selects));
const selectsNames = _.map(_.values(selects), element=> ({'name' : element.name}));

const urls = new WeakMap([
    [_.get(selectsNames, 0), './subregions.json'],
    [_.get(selectsNames, 1), 'https://restcountries.eu/rest/v2/subregion/'],
    [_.get(selectsNames, 2), 'https://restcountries.eu/rest/v2/name/']
]);

function showCountryInfo(data){
    data.map(item => {
        const {alpha2Code, capital, population, nativeName, flag} = item;
        const element = document.createElement('p');

        element.innerText = 
            `Country code: ${alpha2Code}\nCapital: ${capital}
            Population: ${population}\nNative name: ${nativeName}`;
        countryInfo.appendChild(element);

        const flagImage = document.createElement('img');
        flagImage.display="block";
        flagImage.style.width="40%";
        flagImage.src = flag;

        countryInfo.appendChild(flagImage);
    })
}

function showData(data, currentSelect){
    const indexOfNextSelector = Array.from(selects).indexOf(currentSelect) + 1;
    hideLoadingIcon();
    const nameOfNextSelector = selectsNames[indexOfNextSelector] ?
        selectsNames[indexOfNextSelector].name : false;
    if(currentSelect.value !== 'polar' && nameOfNextSelector){
        addOptions(selects[indexOfNextSelector], 
            createDefaultOption(nameOfNextSelector));
        
        showNextSelect(indexOfNextSelector);
        
        //get data from local json file
        if(currentSelect.name==='region'){
            data = data[currentSelect.value];
        }
    
        const options = createOptions(data);
        addOptions(selects[indexOfNextSelector], ...options);
    } else {
        showCountryInfo(data);
    }
}

function getData(url, currentSelect){
    fetch(url)
        .then(res => res.json())
        .then(data => { 
            showData(data, currentSelect);
        })
        .catch(error => {
            console.log(error);
        })
}

function getUrl(nameOfSelector, valueOfSelector, indexOfCurrentSelector){
    if(valueOfSelector === 'polar'){
        return urls.get(selectsNames[selectsNames.length-1]) + 'Antarctica';
    } else if(urls.get(selectsNames[indexOfCurrentSelector]).includes('.json')){
        return urls.get(selectsNames[indexOfCurrentSelector]);
    } else {
        return urls.get(selectsNames[indexOfCurrentSelector]) + valueOfSelector;
    }
}

function selectListener(){
    const currentSelect = this;
    const indexOfCurrentSelector = Array.from(selects).indexOf(this);
    let url;

    hideNextSelects(indexOfCurrentSelector);
    showLoadingIcon();
    
    url = getUrl(currentSelect.name, currentSelect.value, indexOfCurrentSelector);
    setTimeout(()=>{
        getData(url, currentSelect);
    }, 1500);
}

function main(){
    selects.forEach(select => select.addEventListener('change', selectListener));
}

main();



