'use strict'
function createDefaultOption(currentSelect){
    const selectedOption = document.createElement('option');
    selectedOption.disabled = true;
    selectedOption.hidden = true;
    selectedOption.selected = true;
    selectedOption.text = `Choose ${currentSelect}`;
    return selectedOption; 
}

function createOptions(data){
    const options = data.map(element => {
        const option = document.createElement('option');
        option.value = element.name;
        option.text = element.name;
        return option;
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