


const idloginError = document.getElementById("idloginError");
const username = document.getElementById("username");
const password = document.getElementById("password");
const predict_4 = document.getElementById("predict_4");
const result4 = document.getElementById("result4");
const result8 = document.getElementById("result8");
const la4 = document.getElementById("la4");
const oq4 = document.getElementById("oq4");
const yb4 = document.getElementById("yb4");
const ga4 = document.getElementById("ga4");

const la8 = document.getElementById("la8");
const oq8 = document.getElementById("oq8");
const yb8 = document.getElementById("yb8");
const ga8 = document.getElementById("ga8");
const yr8 = document.getElementById("yr8");
const ba8 = document.getElementById("ba8");
const fp8 = document.getElementById("fp8");
const gc8 = document.getElementById("gc8");

const result_4_varaibles = document.getElementById("result_4_varaibles");
const result_8_varaibles = document.getElementById("result_8_varaibles");

const moreInfo = document.getElementById("moreInfo");
const showMoreInfo = document.getElementById("showMoreInfo");

//=========== Show Prices Section =====================
const openMoreInfoSection =()=>{
    if(showMoreInfo.style.display== "none"){
showMoreInfo.style.display = "block";

}
else{
    showMoreInfo.style.display = "none";
}
}

const predict4 = async () => {
    if (la4.value == "" || oq4.value == "" || yb4.value == "" || ga4.value == "") {
        alert("fields cannot be empty");
    }
    else {
        data =
        {
            "la4": parseFloat(la4.value),
            "oq4": parseFloat(oq4.value),
            "yb4": parseFloat(yb4.value),
            "ga4": parseFloat(ga4.value),
        }
        const response = await fetch('http://localhost:5000/predict4', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const resp = await response.json();
        if (resp) {
            result4.style.display = "block";
            console.log(parseFloat(resp));
            result_4_varaibles.textContent = `CAD$ ${parseFloat(resp).toFixed(2)}`;
        }
        else {
            alert("An error occurd");
        }
    }

}

const predict8 = async () => {
    if (la8.value == "" || oq8.value == "" || yb8.value == "" || ga8.value == "" || yr8.value == ""
        || ba8.value == "" || fp8.value == "" || gc8.value == "") {
        alert("fields cannot be empty");
    }
    else {
        let link = "http://localhost:5000/predict4";
        data =
        {
            "la8": la8.value,
            "oq8": oq8.value,
            "yb8": yb8.value,
            "ga8": ga8.value,
            "yr8": yr8.value,
            "ba8": ba8.value,
            "fp8": fp8.value,
            "gc8": gc8.value,
        }
        let response = await fetch(link, {
            methods: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        let resp = await response.json();
        if (resp) {
            result8.style.display = "block";
            result_8_varaibles.textContent = resp;
        }
        else {
            alert("An error occurd");
        }
    }

}
predict_4.addEventListener('click', predict4);
predict_8.addEventListener('click', predict8);
moreInfo.addEventListener('click', openMoreInfoSection);