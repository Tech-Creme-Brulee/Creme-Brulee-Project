$(document).ready(function () {
  var resultId = "97fc3192-e486-42a2-b400-6f4dd2b189dd";
  var userSession = sessionStorage.getItem("islogged");

  $("#submit-button").on("click", function (e) {
    e.preventDefault();
    $("#results").html("");
    $("#results").append("<div>hello</div>");
    saveResult(resultId);
  });

  function saveResult(searchResult) {
    $.post("/api/search_data", {
      ucpc: resultId
    }).then(function () {
      displayTopResults();
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
  })


  setLinkVisibility();
})