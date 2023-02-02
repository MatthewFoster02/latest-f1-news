//toggle for dark mode
const body = document.body;
const toggleSwitch = document.getElementById("toggle");

toggleSwitch.addEventListener('change', (e) => 
{
    if(e.target.checked)
    {
        body.classList.remove("themeDark");
        body.classList.add("themeLight");
    }
    else
    {
        body.classList.remove("themeLight");
        body.classList.add("themeDark");
    }
});



//First a function which is to be called every minute
let refresh_content = function refreshContent()
{
    let rawData = [];
    //First call to API
    fetch('https://guarded-badlands-73293.herokuapp.com/news').then(res => res.json()).then(data => 
    {
        rawData = data;
    })
    .catch(err => console.error(err));

    //Display on page
    displayData(rawData);
}

function displayData(data)
{

}

setInterval(refresh_content, 1000*60);
