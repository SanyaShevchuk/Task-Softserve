let regions = document.querySelector('#task1 select[name="region"]');
let subregions = document.querySelector('#task1 select[name="subregion"]');
let countries = document.querySelector('#task1 select[name="country"');
let countryInfo = document.querySelector('#task1 #country-info');
let loadingIcon = document.querySelector('#wrapper');

regions.addEventListener('change', function(){
    loadingIcon.style.display = "block";
    let region = this.value;
    subregions.innerHTML = "";
    subregions.style.display = "none";
    countries.style.display = "none";
    countries.innerHTML = "";
    countryInfo.innerHTML = "";
    
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

    countries.style.display = "none";
    countries.innerHTML = "";
    countryInfo.innerHTML = "";

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
    countryInfo.innerHTML = "";

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


// // function sum(a, ...args){
//     console.log(args);
//     let result = args.reduce((a, b) => a+b);
//     return result + a;
// }
// console.log(sum(5, ...array));