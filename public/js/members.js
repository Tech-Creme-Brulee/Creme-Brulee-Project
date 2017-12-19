$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data", function(data){
    $(".member-name").text(data.name);
   
  })
  var userSession = sessionStorage.getItem("islogged");

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
    setLinkVisibility();
  })
});
