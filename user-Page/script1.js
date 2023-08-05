let IP = "";
async function getIp() {
  let response = await fetch("https://api.ipify.org/?format=json");
  let data = await response.json();
  // console.log(data);
  IP = data.ip;
  const URL = `https://ipinfo.io/${IP}?token=732c33d916ac38`;
  getInfo(URL);
}

async function getInfo(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    setInterval(() => {
      getDate(data);
    }, 1000);
    // Geo-Location 

    navigator.geolocation.getCurrentPosition((position)=>{
      let positionCooredinates = position.coords;
      let latitude = positionCooredinates.latitude;
      let longitude = positionCooredinates.longitude;
      
      document.getElementById("latitude").innerText = latitude;
      document.getElementById("longitude").innerText = longitude;
      document.getElementById("iframe").src = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
    })

    //Header Elements
    document.getElementById("address").innerText = data.ip;
    document.getElementById("city").innerText = data.city;
    document.getElementById("region").innerText = data.region;
    document.getElementById("org").innerText = data.org;
    document.getElementById("host-name").innerText = data.hostname;

    // More About You Elements
    document.getElementById("time-zone").innerText = data.timezone;
    document.getElementById("pincode").innerText = data.postal;

    // Pincode
    let url = `https://api.postalpincode.in/pincode/${data.postal}`;
    getpost(url);


  } catch (err) {
    console.log("Fetching failed..!", err);
  }
}

getIp();

function getDate(data) {
  let date = new Date().toLocaleString(`${data.country}`, {
    timeZone: `${data.timezone}`,
  });
  // console.log(date);
  let dateTime = date.split(",");
  let day = dateTime[0];
  let time = dateTime[1];
  document.getElementById("date").innerText = day;
  document.getElementById("time").innerText = time;
}

async function getpost(url) {
  let r = await fetch(url);
  let data = await r.json();
  document.getElementById("pin-count").innerText = data[0].Message;
  let postOffices = data[0].PostOffice;
  console.log(postOffices);
  renderPostOffices(postOffices);
}

const container = document.getElementById("cards-container");
container.className = "cards-container";
function renderPostOffices(data) {
  container.innerHTML = "";
  data.forEach((v, i) => {
    let itemData = data[i];
    let item = document.createElement("div");
    item.className = "card";
    item.innerHTML = `
    <div class="name">Name : <span id="name">${itemData.Name}</span></div>
    <div class="branch">Branch : <span id="branch">${itemData.BranchType}</span></div>
    <div class="status">Status : <span id="status">${itemData.DeliveryStatus}</span></div>
    <div class="district">District : <span id="district">${itemData.District}</span></div>
    <div class="division">Division : <span id="division">${itemData.Division}</span></div>
    `;

    container.append(item);
  });
}
//---------------

let postOfficesData; // Variable to store the original post office data

// Add an event listener on the filterInput to trigger filtering on input change
document.getElementById("filterInput").addEventListener("input", filterPostOffices);

async function getpost(url) {
  let r = await fetch(url);
  let data = await r.json();
  postOfficesData = data[0].PostOffice; // Save the data in the variable
  renderPostOffices(postOfficesData);
}

function filterPostOffices() {
  const searchTerm = document.getElementById("filterInput").value.toLowerCase();
  
  if (searchTerm === "") {
    renderPostOffices(postOfficesData); // Reset to original data when input is empty
  } else {
    const filteredPostOffices = postOfficesData.filter((item) => {
      return (
        item.Name.toLowerCase().includes(searchTerm) ||
        item.BranchType.toLowerCase().includes(searchTerm) ||
        item.DeliveryStatus.toLowerCase().includes(searchTerm) ||
        item.District.toLowerCase().includes(searchTerm) ||
        item.Division.toLowerCase().includes(searchTerm)
      );
    });

    renderPostOffices(filteredPostOffices);
  }
}

// Modify the renderPostOffices function to include an additional parameter `data`
function renderPostOffices(data) {
  container.innerHTML = "";
  data.forEach((v, i) => {
    let itemData = data[i];
    let item = document.createElement("div");
    item.className = "card";
    item.innerHTML = `
    <div class="name">Name : <span id="name">${itemData.Name}</span></div>
    <div class="branch">Branch : <span id="branch">${itemData.BranchType}</span></div>
    <div class="status">Status : <span id="status">${itemData.DeliveryStatus}</span></div>
    <div class="district">District : <span id="district">${itemData.District}</span></div>
    <div class="division">Division : <span id="division">${itemData.Division}</span></div>
    `;

    container.append(item);
  });
}
