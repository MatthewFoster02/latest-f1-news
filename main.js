const baseURL = 'https://f1newsapi.onrender.com'

// Filter links
const filterAll = document.getElementById('all');
const filterF1 = document.getElementById('f1');
const filterSkyf1 = document.getElementById('skyf1');
const filterBbcf1 = document.getElementById('bbcf1');
const filterWtf1 = document.getElementById('wtf1');
const filterAutosport = document.getElementById('autosport');

const publicationSource = document.getElementById('source');

filterAll.addEventListener('click', () => 
{
    source.innerHTML = "All";
    getContent(); // Load articles from all sources
});

filterF1.addEventListener('click', () => 
{
    source.innerHTML = "F1";
    getFilteredContent('f1');
});

filterSkyf1.addEventListener('click', () => 
{
    source.innerHTML = "Sky F1";
    getFilteredContent('skyf1');
});

filterBbcf1.addEventListener('click', () => 
{
    source.innerHTML = "BBC F1";
    getFilteredContent('BBCF1');
});

filterWtf1.addEventListener('click', () => 
{
    source.innerHTML = "WTF1";
    getFilteredContent('WTF1');
});

filterAutosport.addEventListener('click', () => 
{
    source.innerHTML = "Autosport";
    getFilteredContent('autosport');
});

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
    getContent();
}

function getContent()
{
    //First call to API
    fetch(baseURL + '/news').then(res => res.json()).then(data => 
    {
        //Display on page
        displayData(keepFirst10(data));
    })
    .catch(err => console.error(err));
}
getContent();

function getFilteredContent(source)
{
    fetch(baseURL + `/news/${source}`).then(res => res.json()).then(data => 
    {
        displayData(data);
    })
    .catch(err => console.error(err));
}

function keepFirst10(data)
{
    let prunedData = [];
    let f1count = 0;
    let skyf1count = 0;
    let bbcf1count = 0;
    let wtf1count = 0;
    let autosportcount = 0;
    data.forEach(article =>
    {
        switch(article.source)
        {
            case 'f1':
                if(f1count >= 10) return;
                f1count++;
                break;
            case 'skyf1':
                if(skyf1count >= 10) return;
                skyf1count++;
                break;
            case 'BBCF1':
                if(bbcf1count >= 10) return;
                bbcf1count++;
                break;
            case 'WTF1':
                if(wtf1count >= 10) return;
                wtf1count++;
                break;
            case 'autosport':
                if(autosportcount >= 10) return;
                autosportcount++;
                break;
        }
        prunedData.push(article);
    });
    return prunedData;
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

setInterval(refresh_content, 1000*60*10);
