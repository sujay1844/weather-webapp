document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("city").addEventListener("keypress", (event) => {
		if (event.key == "Enter") {
			document.getElementById("submit").click();
		}
	});
});
