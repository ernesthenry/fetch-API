// create a reusable function
function fetchData(url){
    return fetch(url)
    .then(checkStatus)
    .then(res => res.json)
    .catch(error => console.log('Looks like there was a problem', error))
}


function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    }
    else {
        return Promise.reject(new Error(response.statusText));
    }
}
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




function generateImage(data){
    html = `
    <img src='${data}' alt>
    <p>Click to view images of ${select.value}s</p>`
    ;
    card.innerHTML = html;

}

function fetchBreedImage(){
    const breed = select.value;
    const img = card.querySelector('img');
    const p =  card.querySelector('p');

    fetchData(`https://dog.ceo/api/${breed}/hound/images`)
    .then(data => {
        img.src = data.message;
        img.alt = breed;
        p.textContent = `Click to view more ${breed}s`
    } )
}

// event listening

select.addEventListener('change', fetchBreedImage)
select.addEventListener('click', fetchBreedImage)