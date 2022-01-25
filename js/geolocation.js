async function render() {
	let response = await fetch(
		"https://restcountries.com/v3.1/region/europe?fields=name,cca2",
	);
	const countries = await response.json();
	let options = "";
	let option;
	let select = document.querySelector("#country");

	countries.forEach((country) => {
		if (country.cca2 == "FR") {
			options += `<option value="${country.cca2}"selected>${country.name.official}</option>`;
		} else {
			options += `<option value="${country.cca2}">${country.name.official}</option>`;
		}
	});
	select.innerHTML = options;

	let map = function (lat, lng) {
		document.querySelector(
			"#map",
		).innerHTML = `<iframe src="https://www.google.com/maps/embed/v1/view?key=AIzaSyAfyzygjxgk5ANOSoQXbfhWXdsPQXi4BAk
        &center=${lat},${lng}&zoom=10" 
        allowfullscreen></iframe>`;
	};

	response = await fetch(
		`https://restcountries.com/v3.1/alpha/fr?fields=capitalInfo`,
	);
	const FRANCE = await response.json();
	map(FRANCE.capitalInfo.latlng[0], FRANCE.capitalInfo.latlng[1]);

	select.onchange = async function () {
		response = await fetch(
			`https://restcountries.com/v3.1/alpha/${select.value}?fields=capitalInfo`,
		);
		option = await response.json();
		map(option.capitalInfo.latlng[0], option.capitalInfo.latlng[1]);
	};
}
window.addEventListener("load", render());
