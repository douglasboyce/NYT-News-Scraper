function shownote(event) {
	event.preventDefault();
	var id = $(this).attr("value");
	$("#addnote").css("display", "flex");
	$("#add-note").attr("value", id);
	$.get("/" + id, function(data) {
		$("#article-title").text(data.title);
		$.get("/note/" + id, function(data) {
			if (data) {
				$("#note-title").val(data.title);
				$("#note-body").val(data.body);
			}
		});
	});

}

function addnote(event) {
	event.preventDefault();
	var id = $(this).attr("value");
	var obj = {
		title: $("#note-title").val().trim(),
		body: $("#note-body").val().trim()
	};
	$.post("/note/" + id, obj, function(data) {
		window.location.href = "/saved";
	});
}

// When the #clear-all button is pressed
$("#clear-all").on("click", function() {
	alert("I am here");
	// Make an AJAX GET request to delete the notes from the db
	$.ajax({
	  type: "GET",
	  dataType: "json",
	  url: "/clearall",
	  // On a successful call, clear the #results section
	  success: function(response) {
		$("#results").empty();
	  }
	});
  });
  

function changestatus() {
	var status = $(this).attr("value");
	if (status === "Saved") {
		$(this).html("Unsave");
	}
};

function changeback() {
	$(this).html($(this).attr("value"));
}

$(document).on("click", ".addnote-button", shownote);
$(document).on("click", "#add-note", addnote);
$(".status").hover(changestatus, changeback);
$("#close-note").on("click", function() {
	$("#addnote").fadeOut(300);
});