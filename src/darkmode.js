let darkMode = 0;
function toggleDarkMode() {
	let element = document.body;
	element.classList.toggle("dark-mode");
	setDarkMode('submit');
	setDarkMode('darkMode');
}
function setDarkMode(buttonName) {
	let btn = document.getElementById(buttonName);
	let img = document.getElementById("icon");
	let textbox = document.getElementById("city");
	let btnimg = document.getElementById("darkModeIMG");
	if (darkMode == 0) {
		btn.style.backgroundColor = "#286F11";
		btn.style.color = "white";
		img.style.backgroundColor = "#004646";
		textbox.style.backgroundColor = "#2B2A33";
		textbox.style.color = "white";
		btnimg.src = "images/light-mode.png"
		if (buttonName == 'darkMode') { darkMode = 1;}
	} else {
		btn.style.backgroundColor = "lightgreen";
		btn.style.color = "black";
		img.style.backgroundColor = "lightcyan";
		textbox.style.backgroundColor = "white";
		textbox.style.color = "black";
		btnimg.src = "images/night-mode.png"
		if (buttonName == 'darkMode') { darkMode = 0;}
	}
}
