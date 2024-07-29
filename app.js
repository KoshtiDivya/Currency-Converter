const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const convertBtn = document.querySelector(".convert");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
  for(currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    } 
    else if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
}
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtValue = amount.value;
  if(amtValue === "" || amtValue < 1){
    amtValue = 1;
    amount.value = "1";
  }
 
const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data =  await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalVal = amtValue * rate ; 
  msg.innerText = `${amtValue} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

convertBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load",  () => {
  updateExchangeRate();
});



