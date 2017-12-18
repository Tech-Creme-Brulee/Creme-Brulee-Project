$(document).ready(function () {

  var userSession = sessionStorage.getItem("islogged");
  $("#submit-button").on("click", function (e) {

    //prevents the page from doing javascript it would do by default  
    e.preventDefault();

    //clears the previous panels so that we can display the results
    $("#panels").empty();

    //user input
    var searchCat = $("#searchCategory").val().trim().toLowerCase();

    if (searchCat === "product" || searchCat === "products") {
      search("products");
    } else if (searchCat == "strains" || searchCat === "strain") {
      search("strains");
    } else if (searchCat == "flowers" || searchCat === "flower") {
      search("flowers");
    } else if (searchCat == "edible" || searchCat === "edibles") {
      search("edibles");
    } else {
      alert("Sorry that was invalid iniput please search again with, products, strains, flowers, edibles")
    }
  });

  //creates an ajax call depending on what the user had searched
  function search(forWhat) {

    var queryURL = "https://api.otreeba.com/v1/" + forWhat + "?count=5&sort=-createdAt";
    $.ajax({
      url: queryURL,
      method: "GET",
      header: {
        "Authorization": "key = bf33c451f08cbcb295cf6ccfbd0b5d5d3ceef706"
      }
    }).done(function (response) {
      for (var i = 0; i < response.data.length; i++) {

        console.log("ocpc " + i + " " + response.data[i].ocpc);

        //adds name
        var a = $("<p>").text(response.data[i].name);
        $("#results").append(a);

        //adds image
        var b = $("<img src='" + response.data[i].image + "' " + "width='200px' " + "height='200px' " + "/>");
        $("#results").append(b);

        //adds description
        var c = $("<p>").text(response.data[i].description);
        $("#results").append(c);

        //adds empty space for formatting
        var d = $("<p></p>");
        $("#results").append(d);

        //adds link to reviewes page
        var e = $("<a>").text("Write a Review of this Product!");
        $(e).attr("obj", JSON.stringify(response.data[i]));
        $(e).attr("href", "http://localhost:7979/reviews");
        $(e).on("click", function () {
          var obj = $(this).attr("obj");
          localStorage.setItem("obj", obj);
          obj = JSON.parse(obj);
          var ocpc = obj.ocpc;
          saveResult(ocpc);
        });

        $("#results").append(e);
      }
    });
  }

  function saveResult(searchResult) {
    $.post("/reviews", {
      ucpc: searchResult
    });
  }

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

  $(".logout").on("click", function () {
    sessionStorage.clear();
  });

  setLinkVisibility();
});