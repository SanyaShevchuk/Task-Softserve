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

function nestedObjectToArray(obj) {
    if (typeof(obj) !== "object"){
        return [obj];
    }
    var result = [];
    if (obj.constructor === Array){
        obj.map(function(item) {
            result = result.concat(nestedObjectToArray(item));
        });
    } else {
        Object.keys(obj).map(function(key) {
            if(obj[key]) {
                var chunk = nestedObjectToArray(obj[key]);
                chunk.map(function(item) {
                    result.push(item+"  ");
                });
            } else {
                result.push(key + "  ");
            }
        });
    }
    return result;
}

function showCountryInfo(data){
    let p = document.createElement('p');
    let info = nestedObjectToArray(data);
    info.forEach(element => {
        p.innerText+=element +"\n";
    })
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

        let options = createOptions(data, nameOfNextSelector);   

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
        const countryValue = document.querySelector('select[name="country"]').value;
        url = urls.get(selectsNames[indexOfCurrentSelector])
            + countryValue + "?fields=" + valueOfSelector;
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