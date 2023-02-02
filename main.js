const options = {
	method: 'GET',
    mode: 'no-cors'
};

fetch('https://guarded-badlands-73293.herokuapp.com/news').then(res => res.json()).then(data => 
{
    console.log(data)
})
.catch(err => console.error(err));