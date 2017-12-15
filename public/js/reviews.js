$(document).ready(function(){
    var a = localStorage.getItem("ucpc");
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