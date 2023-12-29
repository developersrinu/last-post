// Initialize IP address as an empty string
let IP = "";

// Construct the URL for the ipinfo.io API with the token for authentication
const URL = `https://ipinfo.io/${IP}?token=732c33d916ac38`;

// Asynchronous function to fetch information from the ipinfo.io API
async function getInfo() {
    try {
        // Make a GET request to the specified URL
        const response = await fetch(URL);

        // Parse the response as JSON
        const result = await response.json();

        // Log the result to the console
        console.log(result);

        // Display the IP address on the page
        document.getElementById("address").innerText = result.ip;
    } catch (err) {
        // Handle errors if the fetching fails
        console.log("Fetching failed..!", err);
    }
}

// Call the getInfo function to initiate the API request
getInfo();

// Add a click event listener to a button with the ID "start-btn"
document.getElementById('start-btn').addEventListener('click', (e) => {
    // Prevent the default behavior of the click event
    e.preventDefault();

    // Redirect the user to "./user-Page/index1.html"
    window.location.href = "./user-Page/index1.html";
});
