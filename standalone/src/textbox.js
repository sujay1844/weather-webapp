// Pressing enter in a textbox doesn't do anything by default.
// Here a button click is simulated when enter is pressed.
document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("city").addEventListener("keypress", (event) => {
		if (event.key == "Enter") {
			document.getElementById("submit").click();
		}
	});
});
