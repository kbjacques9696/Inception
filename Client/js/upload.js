// Picture session

const uploadPictureBtn = document.getElementById("uploadPictureBtn");
const pictureToUpload = document.getElementById("pictureToUpload");
const price = document.getElementById("price");
const piclocation = document.getElementById("piclocation");
const bedrooms = document.getElementById("bedrooms");
const bathrooms = document.getElementById("bathrooms");
const photos = document.querySelector('input[type="file"]');
const idSubmitPicture = document.getElementById("idSubmitPicture");


const photographyData = new FormData();

// const  carousel_1 = document.getElementById("carousel_1");

// const  accordion_1 = document.getElementById("accordion_1");



//  open form if hidden
const uploadPicture = () => {
    // console.log("pix");
    if (uploadPictureContainer.style.display == "none") {
        uploadPictureContainer.style.display = "block";
    }
    else {
        uploadPictureContainer.style.display = "none";

    }
}


const pictureUploadFunction = async (e) => {
    e.preventDefault();
    let link = "http://localhost:3501/uploadPhotography";
    const photographyData = new FormData();
    photographyData.append('price', price.value);
    photographyData.append('bedrooms', bedrooms.value);
    photographyData.append('bathrooms', bathrooms.value);
    photographyData.append('location', piclocation.value);
    for (let i = 0; i < photos.files.length; i++) {
        photographyData.append('photos', pictureToUpload.files[i]);
    }

    let response = await fetch(link, {
        method: "POST",
        body: photographyData
    })
    let resp = await response.json();
    console.log(resp)
    if (resp.error.message === "error uploading images") {
        alert("Error uploading picture");
    }
    else if (resp.error.message === "File not supported") {
        alert("File not supported");
    }
    else {
        alert("Picture uploaded successfully");
    }

}


uploadPictureBtn.addEventListener('click', uploadPicture);

idSubmitPicture.addEventListener('click', pictureUploadFunction)

// idSubmitPicture.addEventListener('click', async (event) => {
//     event.preventDefault();
//     let link = "http://localhost:3501/uploadPhotography";

//     photographyData.append('price', price.value);
//     photographyData.append('bedrooms', bedrooms.value);
//     photographyData.append('bathrooms', bathrooms.value);
//     photographyData.append('location', piclocation.value);
//     for (let i = 0; i < photos.files.length; i++) {
//         photographyData.append('photos', pictureToUpload.files[i]);
//     }

//     let response = await fetch(link, {
//         method: "POST",
//         body: photographyData
//     })
//     let resp = await response.json();
//     console.log(resp)
//     if (resp.error.message === "error uploading images") {
//         alert("Error uploading picture");
//     }
//     else if (resp.error.message === "File not supported") {
//         alert("File not supported");
//     }
//     else {
//         alert("Picture uploaded successfully");
//     }
//     return false;
// });


//  video session


const uuploadVideoBtn = document.getElementById("uploadVideoBtn");
const uploadVideoContainer = document.getElementById("uploadVideoContainer");
const videoToUpload = document.getElementById("videoToUpload");
const vidPrice = document.getElementById("vidPrice");
const vidLocation = document.getElementById("vidLocation");
const vidBedrooms = document.getElementById("vidBedrooms");
const vidBathrooms = document.getElementById("vidBathrooms");
const idSubmitVideo = document.getElementById("idSubmitVideo");
const teamVideos = document.querySelector('input[type="file"]');




//  open form if hidden
const openUploadFunction = () => {
    // console.log("pix");
    if (uploadVideoContainer.style.display == "none") {
        uploadVideoContainer.style.display = "block";
    }
    else {
        uploadVideoContainer.style.display = "none";

    }
}

// Sending to AP1

const videoUploadFunction = async () => {

    let link = "http://localhost:3501/UploadVideo";
    const videoData = new FormData();
    videoData.append('price', price.value);
    videoData.append('bedrooms', bedrooms.value);
    videoData.append('bathrooms', bathrooms.value);
    videoData.append('location', piclocation.value);

    for (let i = 0; i < teamVideos.files.length; i++) {
        videoData.append('myVideos', teamVideos.files[i]);
    }

    let response = await fetch(link, {

        method: "POST",
        body: videoData
    })

    let resp = await response.json();
    // console.log(resp)
    if (resp.error.message === "error uploading video") {
        alert("Error uploading picture");
    }
    else if (resp.error.message === "File not supported") {
        alert("File not supported");
    }
    else {
        alert("video uploaded successfully");
    }
    // return false;
}

uploadVideoBtn.addEventListener('click', openUploadFunction);
idSubmitVideo.addEventListener('click', videoUploadFunction);











//  Sending a request to API to view house pictures

const showAllpictures = async () => {
    const data = await fetch("http://localhost:3501/all_photographers");
    let resp = await data.json();
    // console.log(resp);
    createTemplate(resp);
}


// const createTemplate = (jsonData) => {
//     let cnt = 0;
//     while (cnt < jsonData.length) {
//         let photograper_Name = jsonData[cnt].first_name + " " + jsonData[cnt].last_name;
//         photographers_DD.appendChild(addNameToDropdown(jsonData[cnt]._id, photograper_Name));
//         nameCard.appendChild(createNameCard(photograper_Name, jsonData[cnt].votes));
//         loadData.appendChild(createButton(photograper_Name));
//         loadData.appendChild(createAccordion(jsonData[cnt].pictures));
//         cnt++;
//     }













//  Sending a request to API to View House Videos
// const showHouseVideos = async () => { 
//     const data = await fetch("http://localhost:3501/all_videos"); 
//     let resp = await data.json();    
//     // console.log(resp);
//     createTemplate(resp);
// }


// const createTemplate = (jsonData) => {
//     let cnt = 0;
//     while (cnt < jsonData.length) {
//         let photograper_Name = jsonData[cnt].first_name + " " + jsonData[cnt].last_name;
//         photographers_DD.appendChild(addNameToDropdown(jsonData[cnt]._id, photograper_Name));
//         nameCard.appendChild(createNameCard(photograper_Name, jsonData[cnt].votes));
//         loadData.appendChild(createButton(photograper_Name));
//         loadData.appendChild(createAccordion(jsonData[cnt].pictures));
//         cnt++;
//     }








// carousel_1.addEventListener('click', showAllpictures);

// accordion_1.addEventListener('click', showHouseVideos);
