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

const selectsNames = _.map(_.values(selects), element=> ({'name' : element.name}));

const urls = new WeakMap([
    [selectsNames[0], 'https://restcountries.eu/rest/v2/region/'],
    [selectsNames[1], 'https://restcountries.eu/rest/v2/subregion/'],
    [selectsNames[2], 'https://restcountries.eu/rest/v2/name/']
]);

function showCountryInfo(data){
    _.map(data, item => {
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
    const indexOfNextSelector = _.indexOf(_.values(selects), currentSelect) + 1;
    hideLoadingIcon();
    const nameOfNextSelector = selectsNames[indexOfNextSelector] ?
        selectsNames[indexOfNextSelector].name : false;
    if(currentSelect.value !== 'polar' && nameOfNextSelector){
        addOptions(selects[indexOfNextSelector], 
            createDefaultOption(nameOfNextSelector));
        
        showNextSelect(indexOfNextSelector);
       
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

function getUrl(valueOfSelector, indexOfCurrentSelector){
    let url;
    //special case for Antarctica
    if(valueOfSelector === 'polar'){
        return urls.get(selectsNames[selectsNames.length-1]) + 'Antarctica';
    } else {
        url = urls.get(selectsNames[indexOfCurrentSelector]) + valueOfSelector;
        if(selectsNames[indexOfCurrentSelector].name === 'region'){
            url += "?fields=subregion";
        } else if(selectsNames[indexOfCurrentSelector].name === 'subregion'){
            url += "?fields=name";
        }
        //if url for country just return url
    }
    return url;
}

function selectListener(){
    const currentSelect = this;
    const indexOfCurrentSelector = _.indexOf(_.values(selects), this);
   
    hideNextSelects(indexOfCurrentSelector);
    showLoadingIcon();
    
    let url = getUrl(currentSelect.value, indexOfCurrentSelector);
    
    setTimeout(()=>{
        getData(url, currentSelect);
    }, 1500);
}

function main(){
    _.forEach(selects, select => select.addEventListener('change', selectListener));
}

main();