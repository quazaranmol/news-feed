export function generateFeed(magazines){
    //1. For each website fetch the data from the database.
    magazines.forEach(async (site,index)=>{
        const data =await getDataFromURL(site);
    //2. create an accordion for each data and update the DOM.
    document.getElementById("accordionExample").appendChild(createAccordionItem(data,index));
    //3. Create the Carousel for each accordion
    document.getElementById(`collapse${index}`).appendChild(createCarousel(data,index));
    //4. Insert the Carousel data for each item
    data.items.forEach((item,index)=>{
        document.getElementById(data.feed.link).appendChild(createCarouselImage(item,index));
    });
    })
}


//Fetches the data from the database
async function getDataFromURL(url){
const request = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
return await request.json();
}

//Creates an accordion for each data
function createAccordionItem(data,index) {
    const accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";

    if(index==0){
    accordionItem.innerHTML = `
    <h2 class="accordion-header" id="heading${index}">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
      ${data.feed.title}
    </button>
  </h2>

  <div id="collapse${index}" class="accordion-collapse collapse show" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
        
  </div>
  `
    }

    else{
        accordionItem.innerHTML = `
        <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
          ${data.feed.title}
        </button>
      </h2>
    
      <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
      
      </div>
      `
    }
    return accordionItem;
}

function createCarousel(data,index) {
    const carouselParent = document.createElement('div');
    carouselParent.setAttribute('class', 'carousel slide');
    carouselParent.setAttribute('data-bs-ride', 'carousel');
    carouselParent.setAttribute('id', `carouselExampleControls${index}`);
    carouselParent.innerHTML = `<div class="carousel-inner" id="${data.feed.link}">      
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
   </button>`
    return(carouselParent);
}

function createCarouselImage(data,index){
    const carouselItem = document.createElement('div');
    carouselItem.setAttribute('class', 'carousel-item');
    if(index ===0){
        carouselItem.setAttribute('class', 'carousel-item active');
    }

    carouselItem.innerHTML =`
    <a href="${data.link}" style="text-decoration: none; color: black">
    <div class="card" style="">
  <img src="${data.enclosure.link}" class="card-img-top" alt="${data.title}">
  <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <p class="card-creation">${data.author} ⬤ ${data.pubDate.split(" ")[0]}</p>
    <p class="card-text">${data.description}</p>
  </div>
</div>
</a>
    `
    // console.log(data);
    return carouselItem;
}