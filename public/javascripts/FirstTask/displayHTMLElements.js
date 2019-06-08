const selects = document.querySelectorAll('#task1 select');
const countryInfo = document.querySelector('#country-property-info');

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

function showLoadingIcon(){
    document.querySelector('#wrapper').style.display = "block";
}

function hideLoadingIcon(){
    document.querySelector('#wrapper').style.display = "none";
}

export {hideLoadingIcon, hideNextSelects, showLoadingIcon, showNextSelect, selects, countryInfo};