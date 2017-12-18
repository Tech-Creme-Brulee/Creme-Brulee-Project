module.exports = $(document).ready(function () {
  var userSession = sessionStorage.getItem("islogged");
  $("#submit-button").on("click", function (e) {

    e.preventDefault();
    console.log("in js");
    $("#panels").empty();
    var searchCat = $("#searchCategory").val().trim().toLowerCase();
    console.log(searchCat);
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

  function search(forWhat) {

    console.log(forWhat);
    var queryURL = "https://api.otreeba.com/v1/" + forWhat + "?count=5&sort=-createdAt";
    $.ajax({
      url: queryURL,
      method: "GET",
      header: {
        "Authorization": "key = bf33c451f08cbcb295cf6ccfbd0b5d5d3ceef706"
      }
    }).done(function (response) {
      console.log("finished the ajax call");
      for (var i = 0; i < response.data.length; i++) {
        var a = $("<p>").text(response.data[i].name);
        console.log(response.data[i].ocpc);
        $(a).attr("ocpc", response.data[i].ocpc);
        $(a).attr("obj", response.data[i]);
        $(a).addClass("resultElement");
        $(a).on("click", function () {
          var ocpc = $(this).attr("ocpc");
          localStorage.setItem("ocpc", ocpc);
          saveResult(ocpc);
        });
        $("#results").append(a);

        var b = $("<img>");
        $(b).attr("src", response.data[i].image);
        $(b).attr("ocpc", response.data[i].ocpc);
        $(b).attr("obj", response.data[i]);
        $(b).attr("width", "200px");
        $(b).attr("height", "200px");
        $(b).addClass("resultElement");
        $(b).on("click", function () {
          var ocpc = $(this).attr("ocpc");
          console.log(ocpc);
          localStorage.setItem("ocpc", ocpc);
          saveResult(ocpc);
        });
        // if (response.data[i].image == "https://www.cannabisreports.com/images/" + forWhat + "strains/no_image.png") {
        // $("#results").next(b);
        $("#results").append(b);
        // }

        var c = $("<p>").text(response.data[i].description);
        $(c).attr("ocpc", response.data[i].ocpc);
        $(c).attr("obj", response.data[i]);
        $(c).addClass("resultElement");
        $(c).on("click", function () {
          var ocpc = $(this).attr("ocpc");
          console.log(ocpc);
          localStorage.setItem("ocpc", ocpc);
          saveResult(ocpc);
        });
        $("#results").append(c);

        var d = $("<p></p>");
        $(d).attr("ocpc", response.data[i].ocpc);
        $(d).attr("obj", response.data[i]);
        $(d).addClass("resultElement");
        $(d).on("click", function () {
          var ocpc = $(this).attr("ocpc");
          console.log(ocpc);
          localStorage.setItem("ocpc", ocpc);
          saveResult(ocpc);

        });
        $("#results").append(d);
        var e = $("<a>").text("Write a Review of this Product!");
        $(e).attr("href", "http://localhost:7979/reviews");
        $("#results").append(e);
      }

    });
  };

  function saveResult(searchResult) {
    $.post("/reviews", {
      ucpc: searchResult
    })
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