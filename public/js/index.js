$("#submit-button").on("click", function(e){
    e.preventDefault();
    $("#results").html("");
    var searchCat = $("#searchCategory").val();

    if(searchCat = "products"){
      searchProducts();
    }else if(searchCat = "strain"){
      searchStrain();
    }else if(searchCat = "flower"){
      searchFlower();
    }else if(searchCat = "seeds"){
      searchSeeds();
    }else{

    }

  });

  function searchProducts(){
    var queryURL = "https://api.otreeba.com/v1/seed-companies?count=5&sort=-createdAt";
    $.ajax({
      url: queryURL,
      method: "GET",
      headesr: {
        Authorization: "key = 26299dcdbe909a94af5640327e2ca1a8b55a3852"
      }
    }).done(function(response){
      var a = response.data[0].ocpc;
      $("#result1").append(a);
    });    
  }

  function searchFlower(){

  }

  function searchSeeds(){

  }

  function searchStrain(){

  }