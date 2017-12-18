$(document).ready(function () {
  var obj = localStorage.getItem("obj");
  obj = JSON.parse(obj);

  var a = $("<p>").text(obj.name);
  $("#results").append(a);

  var b = $("<img src='" + obj.image + "' " + "width='200px' " + "height='200px' " + "/>");
  $("#results").append(b);

  $.ajax({
    url: "http://localhost:7979/api/reviews",
    method: "GET",
    header: {
      "Authorization": "key = bf33c451f08cbcb295cf6ccfbd0b5d5d3ceef706"
    }
  }).done(function(response){
    for(var i = 0; i < response.length; i++){
      var comment = $("<p>").text(response[i]);
      $("#comments").append(comment);
    }
  });

  var userSession = sessionStorage.getItem("islogged");
  //link this page to the forum page
  console.log(a);

  function setLinkVisibility() {
    userSession ? hideMemberAccessBtn() : hideMemberOnlyBtn();
  }

  function hideMemberAccessBtn() {
    $(".member-access").hide();
  }

  function hideMemberOnlyBtn() {
    $(".member-only").hide();
    $(".member-access").show();
  }

  setLinkVisibility();

  $(".logout").on("click", function () {
    sessionStorage.clear();
  });
});

$(document).ready(function () {
  // Getting a reference to the input field where user adds a new review
  var $newItemInput = $("input.new-item");
  // Our new reviews will go inside the reviewContainer
  var $reviewContainer = $(".review-container");
  // Adding event listeners for deleting, editing, and adding reviews
  $(document).on("click", "button.delete", deleteReview);
  $(document).on("click", ".review-item", editReview);
  $(document).on("keyup", ".review-item", finishEdit);
  $(document).on("blur", ".review-item", cancelEdit);
  $(document).on("submit", "#review-form", insertReview);

  // Our initial reviews array
  var reviews = [];

  // Getting reviews from database when page loads
  getReviews();

  // This function resets the reviews displayed with new reviews from the database
  function initializeRows() {
    $reviewContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < reviews.length; i++) {
      rowsToAdd.push(createNewRow(reviews[i]));
    }
    $reviewContainer.prepend(rowsToAdd);
  }

  // This function grabs reviews from the database and updates the view
  function getReviews() {
    $.get("/api/reviews", function (data) {
      reviews = data;
      initializeRows();
    });
  }

  // This function deletes a review when the user clicks the delete button
  function deleteReview(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/reviews/" + id
    }).done(getReviews);
  }

  // This function handles showing the input box for a user to edit a review
  function editReview() {
    var currentReview = $(this).data("review");
    $(this).children().hide();
    $(this).children("input.edit").val(currentReview.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // This function starts updating a review in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit() {
    var updatedReview = $(this).data("review");
    if (event.keyCode === 13) {
      updatedReview.text = $(this).children("input").val().trim();
      $(this).blur();
      updatedReview(updatedReview);
    }
  }

  // This function updates a review in our database
  function updatedReview(review) {
    $.ajax({
      method: "PUT",
      url: "/api/reviews",
      data: review
    }).done(getReviews);
  }

  // This function is called whenever a review item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentReview = $(this).data("review");
    if (currentReview) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentReview.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a review-item row
  function createNewRow(review) {
    var $newInputRow = $(
      [
        "<li class='list-group-item review-item'>",
        "<span>",
        review.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-default'>x</button>",
        "<button class='complete btn btn-default'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", review.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("review", review);
    if (review.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new review into our database and then updates the view
  function insertReview(event) {
    event.preventDefault();
    var review = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/reviews", review, getReviews);
    $newItemInput.val("");
  }
});