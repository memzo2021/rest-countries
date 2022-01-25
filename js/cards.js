async function render() {
    let response = await fetch(
        "https://restcountries.com/v3.1/region/europe?fields=name,capital,flags,maps",
    );

    const countries = await response.json();
    let cards = "";

    countries.forEach((country) => {
        cards += `<div class="col"><div class="card h-100">
                    <a href="${country.maps.openStreetMaps
            }" title="maps" target="_blank">
                      <img src="${country.flags.png
            }" class="card-img-top" alt="flag of ${country.name.official
            }">
                    </a>
                    <div class="card-body">
                      <h4 class="card-title">${country.name.official}</h4>
                      <p class="card-text">${country.capital[0]
            }</p>
                    </div>
                  </div></div>`;
    });

    const bloc = document.querySelector("#countriescard");
    bloc.innerHTML = cards;
}
window.addEventListener("load", render());
