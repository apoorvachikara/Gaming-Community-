$(document).ready(function(){

	$(document).on('submit', '#update', function(){

		var data = $(this).serializeArray();
		console.log(JSON.stringify(data))

	})
})