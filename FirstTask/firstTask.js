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
    let selectedOption = document.createElement('option');
    selectedOption.disabled = true;
    selectedOption.hidden = true;
    selectedOption.selected = true;
    selectedOption.text = `Choose ${currentSelect}`;
    return selectedOption; 
}

function createOptions(data, field=null){
    let options;
    if(field){
        options = data[field].map(element => {
            let option = document.createElement('option');
            option.value = element;
            option.text = element;
            return option;
        });
    } else {
        options = data.map(element => {
            let option = document.createElement('option');
            option.value = element.name;
            option.text = element.name;
            return option;
        });
    }
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
        let {alpha2Code, capital, population, nativeName, flag} = item;
        let element = document.createElement('p');

        element.innerText = 
            `Country code: ${alpha2Code}\nCapital: ${capital}
            Population: ${population}\nNative name: ${nativeName}`;
        countryInfo.appendChild(element);

        let flagImage = document.createElement('img');
        flagImage.display="block";
        flagImage.style.width="40%";
        flagImage.src = flag;

        countryInfo.appendChild(flagImage);
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
    let valueOfCurrentSelector = this.value;
    let indexOfCurrentSelector = selectsNames.indexOf(this.name);
    let indexOfNextSelector = indexOfCurrentSelector + 1;
    let nameOfCurrentSelector = selectsNames[selectsNames.indexOf(this.name)];
    let nameOfNextSelector = selectsNames[selectsNames.indexOf(this.name)+1];
    let url;

    hideNextSelects(indexOfCurrentSelector);
    showLoadingIcon();
    
    url = getUrl(nameOfCurrentSelector, valueOfCurrentSelector);
   
    setTimeout(function(){
        fetch(url)
            .then(res => res.json())
            .then(data => {
                hideLoadingIcon();
                if(valueOfCurrentSelector!== 'polar' && nameOfNextSelector){
                    addOptions(selects[indexOfNextSelector], 
                        createDefaultOption(nameOfNextSelector));
                    
                    showNextSelect(indexOfNextSelector);
                    let field;
                    if(nameOfCurrentSelector==='region'){
                        field = valueOfCurrentSelector;
                    } else {
                        field = null;
                    }
                    let options = createOptions(data, field);
                    addOptions(selects[selectsNames.indexOf(nameOfNextSelector)], ...options);
                
                } else { 
                    showCountryInfo(data);
                }    
            })
            .catch(error => {
                console.log(error);
            })
    }, 1500); 
}

function main(){
    selects.forEach(select => select.addEventListener('change', selectListener));
}

main();



