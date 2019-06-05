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
    //as we may have duplicates of subregions we use Set collection
    let optionsData = new Set(
        _.map(data, element => {
        //depends on subregion or region it is return what is not undefined
        let {subregion, name} = element;
        return subregion || name;
        })
    );
   
    // you can take data for options in this way, data is object of objectsn
    // which has only one property, we do array of those properties and get single element
    // optionsData = new Set(_.map(data, element=>Object.values(element)[0]));
    const options = [];
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