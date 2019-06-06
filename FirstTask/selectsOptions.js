'use strict'
function createDefaultOption(currentSelect){
    const selectedOption = document.createElement('option');
    selectedOption.disabled = true;
    selectedOption.hidden = true;
    selectedOption.selected = true;
    selectedOption.text = `Choose ${currentSelect}`;
    return selectedOption; 
}

function createOptions(data, nameOfNextSelector){
    let optionsData;
    const options = [];
    
    switch(nameOfNextSelector){
        case 'subregion': optionsData = new Set(_.map(data, element => element.subregion)); break;
        case 'country':  optionsData = new Set(_.map(data, element => element.name)); break;
        case 'country-property': optionsData = Object.keys(data[0]); break;
    }
    
    optionsData.forEach(element => {
        const option = document.createElement('option');
        option.value = element;
        option.text = element;
        options.push(option);
    });
    return options;
}

function addOptions(selector, ...options){
    const fragment = document.createDocumentFragment();
    options.forEach(option => {
        fragment.appendChild(option);
    })
    selector.appendChild(fragment);
}

export  {createDefaultOption, createOptions, addOptions};