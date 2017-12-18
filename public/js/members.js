$(document).ready(function () {
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.name);
    console.log(data);

  });
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