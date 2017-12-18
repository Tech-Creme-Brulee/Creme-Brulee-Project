$(document).ready(function(){
    var a = localStorage.getItem("ucpc");
    var obj = localStorage.getItem("obj");

    var div = $("<img>");
    $(div).attr("src", obj.image);
    $(div).attr("width", "200px");
    $(div).attr("height", "200px");
    $(".results").html("");
    $(".results").append(div);

    var div2 = $("<p>");
    $(div2).text(obj.description);
    $(".results").append(div2);

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
})