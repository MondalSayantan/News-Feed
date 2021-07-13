let arr = [];

async function fetchRssData() {
  let conv = "https://api.rss2json.com/v1/api.json?rss_url=";
  for (let i = 0; i < magazines.length; i++) {
    let url = conv + magazines[i];
    try {
      let response = await fetch(url);
      let data = await response.json();
      arr.push(data);
    } catch (error) {
      return error;
    }
  }
}

function addToDom() {
  let parent = document.getElementById("accordion");

  for (let i = 0; i < arr.length; i++) {
    let button = document.createElement("span");
    button.innerHTML = `
            <button class="btn mt-4 mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}"
            aria-expanded="false" aria-controls="collapse${i}" >
            <i class="fas fa-angle-down" id = "icon${i}"></i>
            ${arr[i].feed.title}
            </button> `;
    parent.appendChild(button);

    let collapse = document.createElement("div");
    if (i == 0) {
      collapse.className = "collapse show";
    } else {
      collapse.className = "collapse";
    }
    collapse.id = `collapse${i}`;

    collapse.innerHTML = `
        <div id="carouselExampleControls${i}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" id = "carousel-inner${i}">
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${i}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${i}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div> `;

    parent.appendChild(collapse);

    for (let j = 0; j < arr[i].items.length; j++) {
      let link = document.createElement("a");
      link.href = arr[i].items[j].link;
      link.style.color = "black";
      link.style.textDecoration = "none";

      let carouselItem = document.createElement("div");

      if (j == 0) {
        carouselItem.className = "carousel-item active";
      } else {
        carouselItem.className = "carousel-item";
      }

      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
            <img src="${
              arr[i].items[j].enclosure.link
            }" alt="" class="card-img-top">
            <div class="card-body">
                <h3 class="card-title">${arr[i].items[j].title}</h5>
                <p class="card-text cardDesc">${
                  arr[i].items[j].author
                } • ${new Date(
        arr[i].items[j].pubDate
      ).toLocaleDateString()}</p>
                <p class="card-text cardBody">${arr[i].items[j].description}</p>
            </div>`;

      link.appendChild(card);
      carouselItem.appendChild(link);
      document.getElementById(`carousel-inner${i}`).appendChild(carouselItem);
    }
  }
}
