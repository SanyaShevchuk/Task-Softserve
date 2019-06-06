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
    [selectsNames[2], 'https://restcountries.eu/rest/v2/name/'],
    [selectsNames[3], 'https://restcountries.eu/rest/v2/name/']
]);

function showCountryInfo(data){
    let p = document.createElement('p');
    p.innerHTML = `${Object.values(data[0])}`;
    countryInfo.appendChild(p);
}

function showData(data, currentSelect){
    const indexOfNextSelector = _.indexOf(_.values(selects), currentSelect) + 1;
    hideLoadingIcon();
    const nameOfNextSelector = selectsNames[indexOfNextSelector] ?
        selectsNames[indexOfNextSelector].name : false;

    if(nameOfNextSelector){
        addOptions(selects[indexOfNextSelector], 
            createDefaultOption(nameOfNextSelector));
        
        showNextSelect(indexOfNextSelector);
        let options;
        
        if(nameOfNextSelector==='country-property'){
            let optionsData = Object.keys(data[0]);
            
            options = [];
            optionsData.forEach(element => {
                const option = document.createElement('option');
                option.value = element;
                option.text = element;
                options.push(option);
            });
        } else {
            options = createOptions(data);
        }   
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
    let url = urls.get(selectsNames[indexOfCurrentSelector]) + valueOfSelector;

    if(selectsNames[indexOfCurrentSelector].name === 'region'){
        url += "?fields=subregion";
    } else if(selectsNames[indexOfCurrentSelector].name === 'subregion'){
        url += "?fields=name";
    } else if(selectsNames[indexOfCurrentSelector].name === 'country-property'){
        url = urls.get(selectsNames[indexOfCurrentSelector])
            + document.querySelector('select[name="country"]').value + "?fields=" 
            + valueOfSelector;
    } 
    //if url for country just return url
    
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