const countryInfo = document.querySelector('#task1 #country-info');
const loadingIcon = document.querySelector('#wrapper');
const urls = {
    'region': './subregions.json',
    'subregion' : 'https://restcountries.eu/rest/v2/subregion/',
    'country' : 'https://restcountries.eu/rest/v2/name/'
}

const selects = document.querySelectorAll('#task1 select');
    const selectsNames = Array.from(document.querySelectorAll('#task1 select'))
                            .map((element)=>element.name);

function hideSelects(currentSelect, selects, selectsNames){
    let index = selectsNames.indexOf(currentSelect);
    for(let i = index+1; i < selects.length; i++){
        selects[i].innerHTML = "";
        // selects[i].className = "hidden";
        // selects[i].classList.add('hidden');
        selects[i].style.display = 'none';
    }
    countryInfo.innerHTML = "";
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
    console.log(selector);
    options.forEach(option => {
        console.log(option);
        selector.appendChild(option);
    })
}

function selectListener(){

    loadingIcon.style.display = "block";

    let valueOfCurrentSelector = this.value;
    let indexOfCurrentSelector = selectsNames.indexOf(this.name);
    let nameOfCurrentSelector = selectsNames[selectsNames.indexOf(this.name)];
    let nameOfNextSelector = selectsNames[selectsNames.indexOf(this.name)+1];
    let url;
    if(nameOfCurrentSelector==='region'){
        url = urls[nameOfCurrentSelector];
    } else {
        url = `${urls[nameOfCurrentSelector]}${valueOfCurrentSelector}`;
    }
    hideSelects(this.name, selects, selectsNames);
    setTimeout(function(){
        fetch(url)
            .then(res => res.json())
            .then(data => {
                loadingIcon.style.display = "none";
                if(nameOfCurrentSelector==='country'){
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
                } else{
                    selects[indexOfCurrentSelector+1]
                    .appendChild(createDefaultOption(nameOfNextSelector));
            
                // if(!data[valueOfCurrentSelector][0]) {
                //     subregions.style.display = "none";
                //     countries.style.display = "inline-block";
                //     subregions.dispatchEvent(new Event('change'));
                // } else {
                //     selects[indexOfCurrentSelector+1].style.display = "inline-block";
                //     //countries.style.display = "none";
                // }
                selects[indexOfCurrentSelector+1].style.display = "inline-block";
                let field;
                if(nameOfCurrentSelector==='region'){
                    field = valueOfCurrentSelector;
                } else {
                    field = null;
                }
                let options = createOptions(data, field);
                addOptions(selects[selectsNames.indexOf(nameOfNextSelector)], ...options);
                }
                      
            })
            .catch(e => {
                console.log(e);
            })
    }, 1500); 
}

function main(){
    selects.forEach(select => select.addEventListener('change', selectListener));
}

main();



