// create a reusable function
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json)
        .catch(error => console.log('Looks like there was a problem', error))
}

// function to check status of response
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    }
    else {
        return Promise.reject(new Error(response.statusText));
    }
}
//  Manage multiple promise requests 
Promise.all(
    [
        fetchData('https://dog.ceo/api/breeds/image/random'),
        fetchData('https://dog.ceo/api/breeds/list/all')
    ]
).then(data => {
    const breedList = data[0].message;
    const randomImage = data[1].message;

    generateOptions(breedList);
    generateImage(randomImage);
});

// store urls to fetch in an array
const urls = [
    'https://dog.ceo/api/breeds/list',
    'https://dog.ceo/api/breeds/image/random'
];

// use map() to perform a fetch and handle the response for each url
Promise.all(urls.map(url =>
    fetch(url)
        .then(checkStatus)
        .then(parseJSON)
        .catch(logError)
))
    .then(data => {
        // do something with the data
    })





function generateOptions(data) {
    const options = data.map(item => `
    <option value='${item}'>${item}</option>
    `).join('')
}



function generateImage(data) {
    html = `
    <img src='${data}' alt>
    <p>Click to view images of ${select.value}s</p>`
        ;
    card.innerHTML = html;

}

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/${breed}/hound/images`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s`
        })
}

// event listening

select.addEventListener('change', fetchBreedImage)
select.addEventListener('click', fetchBreedImage)
form.addEventListener('submit', postData)

// POST DATA

function postData(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ name, comment })
    }


    fetch('https://jsonplaceholder.typicode.com/comments', config )
        .then(checkStatus)
        .then(res => res.json)
        .then(data = console.log(data))

}