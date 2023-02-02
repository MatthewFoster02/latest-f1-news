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
        //Display on page
        displayData(data);
    })
    .catch(err => console.error(err));
}

function displayData(data)
{
    // Get parent div for cards
    let parent = document.getElementById("parent");
    parent.innerHTML = '';
    // Loop through each article and create card object
    data.forEach(article =>
    {
        // Create required elements
        let card = document.createElement("a");
        let logo = document.createElement("img");
        let title = document.createElement('span');

        // Set class of elements
        card.setAttribute('class', 'card');
        logo.setAttribute('class', 'source-logo');
        title.setAttribute('class', 'article-title');

        // Set article link and title
        card.setAttribute('href', article.url);
        card.setAttribute('target', '_blank');
        title.innerHTML = article.title;

        // Set correct logo
        switch(article.source)
        {
            case 'f1':
                logo.setAttribute('src', 'images/f1-logo160.png');
                break;
            case 'skyf1':
                logo.setAttribute('src', 'images/skyf1-logo.jpg');
                break;
            case 'BBCF1':
                logo.setAttribute('src', 'images/bbcf1-logo160.jpg');
                break;
            case 'WTF1':
                logo.setAttribute('src', 'images/wtf1-logo160.png');
                break;
            case 'autosport':
                logo.setAttribute('src', 'images/autosport-logo.png');
                break;
        }

        card.appendChild(logo);
        card.appendChild(title);

        parent.appendChild(card);
    });
}

setInterval(refresh_content, 1000*60);
