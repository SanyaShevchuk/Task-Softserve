const countryInfo = document.querySelector('#country-info');
const urls = {
    'region': './subregions.json',
    'subregion' : 'https://restcountries.eu/rest/v2/subregion/',
    'country' : 'https://restcountries.eu/rest/v2/name/'
}
const selects = document.querySelectorAll('#task1 select');
const selectsNames = Array.from(selects).map((element)=>element.name);

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
    options.forEach(option => {
        selector.appendChild(option);
    })
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
    const nameOfNextSelector = selectsNames[indexOfNextSelector];
    hideLoadingIcon();
    
    //if user chose polar-region or it is last selector
    if(currentSelect.value!== 'polar' && nameOfNextSelector){
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

function getUrl(nameOfSelector, valueOfSelector){
    if(valueOfSelector === 'polar'){
        return urls['country'] + 'Antarctica';
    } else if(urls[nameOfSelector].includes('.json')){
        return urls[nameOfSelector];
    } else {
        return urls[nameOfSelector] + valueOfSelector;
    }
}

function selectListener(){
    const currentSelect = this;
    const indexOfCurrentSelector = Array.from(selects).indexOf(this);
    let url;

    hideNextSelects(indexOfCurrentSelector);
    showLoadingIcon();
    
    url = getUrl(currentSelect.name, currentSelect.value);
    setTimeout(()=>{
        getData(url, currentSelect);
    }, 1500);
}

function main(){
    selects.forEach(select => select.addEventListener('change', selectListener));
}

main();



