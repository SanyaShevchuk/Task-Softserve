const regions = document.querySelector('#task1 select[name="regions"]');
const subregions = document.querySelector('#task1 select[name="subregions"]');
const countries = document.querySelector('#task1 select[name="countries"');
const countryInfo = document.querySelector('#task1 #country-info');
const loadingIcon = document.querySelector('#wrapper');

function displaySelects(){
    if(subregions.hasChildNodes()){
      
    }
}
function hideSelects(currentSelect, selects, selectsNames){
    let index = selectsNames.indexOf(currentSelect);
    console.log(index);
    for(let i = index+1; i < selects.length; i++){
        selects[i].innerHTML = "";
        // selects[i].className = "hidden";
        // selects[i].classList.add('hidden');
        selects[i].style.display = 'none';
    }
    countryInfo.innerHTML = "";
}

function selectListener(){

}

function main(){
    const selects = document.querySelectorAll('#task1 select');
    const selectsNames = Array.from(document.querySelectorAll('#task1 select'))
                            .map((element)=>element.name);
    
    regions.addEventListener('change', function(){
        // loadingIcon.classList.add('show');
        loadingIcon.style.display = "block";
        let region = this.value;
        hideSelects(this.name, selects, selectsNames);
        setTimeout(function(){
            fetch('./subregions.json')
                .then(res => res.json())
                .then(data => {
                    loadingIcon.style.display = "none";
                    let selectedOption = document.createElement('option');
                    selectedOption.disabled = true;
                    selectedOption.hidden = true;
                    selectedOption.selected = true;
                    selectedOption.text = "Choose subregion"; 
                    subregions.appendChild(selectedOption);
                
                    if(!data[region][0]) {
                        subregions.style.display = "none";
                        countries.style.display = "inline-block";
                        subregions.dispatchEvent(new Event('change'));
                    } else {
                        subregions.style.display = "inline-block";
                        countries.style.display = "none";
                    }
    
                    data[region].map(subregion => {
                        let option = document.createElement('option');
                        option.value = subregion;
                        option.text = subregion;
                        subregions.appendChild(option);
                    })        
                })
                .catch(e => {
                    console.log(e);
                })
        }, 1500); 
    });
    
    subregions.addEventListener('change', function(){
        loadingIcon.style.display = "block";
        if(regions.value == "polar"){
            loadingIcon.style.display = "none";
            let selectedOption = document.createElement('option');
            selectedOption.disabled = true;
            selectedOption.hidden = true;
            selectedOption.text = "Choose country"; 
            selectedOption.selected = true;
            countries.appendChild(selectedOption);
            
            let option = document.createElement('option');
            option.value = 'Antarctica'
            option.text = 'Antarctica';
            countries.appendChild(option);
            return;
        }
    
        let subregion = this.value;
        let url = `https://restcountries.eu/rest/v2/subregion/${subregion}`;
    
        // countries.style.display = "none";
        // countries.innerHTML = "";
        // countryInfo.innerHTML = "";
        hideSelects(this.name, selects, selectsNames);
    
        setTimeout(function(){
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    loadingIcon.style.display = "none";
                    countries.style.display = "inline-block";
                    let selectedOption = document.createElement('option');
    
                    selectedOption.disabled = true;
                    selectedOption.hidden = true;
                    selectedOption.text = "Choose country"; 
                    selectedOption.selected = true;
                    countries.appendChild(selectedOption);
    
                    data.map(country => {
                        let option = document.createElement('option');
                        option.value = country.name;
                        option.text = country.name;
                        countries.appendChild(option);
                    })
                })
                .catch(e => {
                    console.log(e);
                })
        }, 1500);
    })
    
    countries.addEventListener('change', function(){
        loadingIcon.style.display = "block";
        let country = this.value;
        let url = `https://restcountries.eu/rest/v2/name/${country}`;
        // countryInfo.innerHTML = "";
        hideSelects(this.name, selects, selectsNames)
    
        setTimeout(function(){
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    loadingIcon.style.display = "none";
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
                })
                .catch(e => {
                    console.log(e);
                })
        }, 1500);
    })
}
main();



