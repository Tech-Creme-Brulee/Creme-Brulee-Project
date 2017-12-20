$(document).ready(function () {
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
  });
});