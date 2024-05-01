const BASE_URL=
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdowns=document.querySelectorAll(".dropdown select");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let btn= document.querySelector("form button");

const countryFlag=(evt)=>{
   let countryId=evt.value;
    let urlLink=`https://flagsapi.com/${countryList[countryId]}/flat/64.png`;
    let img=evt.parentElement.querySelector("img");
    img.src=urlLink;
};

for(let select of dropdowns)
{
    for(code in countryList)
    {
        let newOption= document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        select.append(newOption);
        select.addEventListener("change",(evt)=>{
            countryFlag(evt.target);
        });
    }
}

const updateExchange= async () =>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1) {
        amtVal=1;
        amount.value="1";
    }
    let url=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    console.log(url);
    let currRate= await fetch(url);
    let data=await currRate.json();
    let rate=data[toCurr.value.toLowerCase()];
    let fAmt=amtVal*rate;
    document.querySelector(".msg").innerText=`${amtVal} ${fromCurr.value} = ${fAmt} ${toCurr.value}`;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchange();
});

window.addEventListener("load",()=>{
    updateExchange();
});