

$("#clearResults").on("click", function() {
	$("#displayArticleHere").empty();
})

$("#add-button").on("click", function(event) {
	event.preventDefault();
	var term = $("#searchTerm").val().trim();
	var start = $("#startYear").val().trim();
	var end = $("#endYear").val().trim();
	var count = $("#dropdownMenu1").val();

	if (count == "") {
		count = 10;
	}

	if (start == "") {
		start = "2017";
	}
	if (end == "") {
		end = "2017";
	}

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

	url += '?' + $.param({
  		'api-key': "730f1496a7874861883783ab5f50f95d",
  		'fq': term,
  		'begin_date': start + "0101",
  		'end_date': end + "1231",
	});

	$.ajax({
  	url: url,
  	method: 'GET',
	}).done(function(result) {
		$("#displayArticleHere").empty();
		for (var i = 0; i < count; i++) {
			var newDiv = $("<div class=holders>")
			var title = result.response.docs[i].headline.main;
			console.log(title);
			var numberArticle = $("<p class=articleNumber>").text(i + 1);
			var headline =  $("<h1>").html(title);
			var author = $("<p>").text(result.response.docs[i].byline.original);
			// console.log(headline);
			newDiv.append(numberArticle); 
			newDiv.append(headline);
			newDiv.append(author);
			$("#displayArticleHere").append(newDiv);
	  		
		}
	  
	})
})

$(".dropdown-menu li a").click(function(){
 $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
 $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});