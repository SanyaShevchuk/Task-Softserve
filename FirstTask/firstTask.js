const countryInfo = document.querySelector('#country-info');
const selects = document.querySelectorAll('#task1 select');
const selectsNames = Array.from(selects).map((element)=>{
    return {'name' : element.name}
    });

let urls = new WeakMap();
urls.set(selectsNames[0], './subregions.json');
urls.set(selectsNames[1], 'https://restcountries.eu/rest/v2/subregion/');
urls.set(selectsNames[2], 'https://restcountries.eu/rest/v2/name/');


function hideNextSelects(indexOfCurrentSelector){
    for(let i = indexOfCurrentSelector+1; i < selects.length; i++){
        selects[i].innerHTML = "";
        selects[i].style.display = 'none';
    }
    countryInfo.innerHTML = "";
}

function showNextSelect(index){
    selects[index].style.display = "inline-block";
}

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

function showLoadingIcon(){
    document.querySelector('#wrapper').style.display = "block";
}

function hideLoadingIcon(){
    document.querySelector('#wrapper').style.display = "none";
}

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
    const nameOfNextSelector = selectsNames[indexOfNextSelector]?
        selectsNames[indexOfNextSelector].name: false;
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
        return urls.get(selectsNames[2]) + 'Antarctica';
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



