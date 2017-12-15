$("#submit-button").on("click", function(e){

    e.preventDefault();
    console.log("in js");
    $("#panels").empty();
    var searchCat = $("#searchCategory").val().trim().toLowerCase();
    console.log(searchCat);
    if(searchCat == "products" || "products"){
      search("products");
    }else if(searchCat == "strains" || "strain"){
      search("strains");
    }else if(searchCat == "flowers" || "flower"){
      search("flowers");
    }else if(searchCat == "seeds" || "seed"){
      search("seeds");
    }else{

    }

  });

  function search(forWhat){
    console.log("inside the ajax call");
    var queryURL = "https://api.otreeba.com/v1/" + forWhat + "?count=5&sort=-createdAt";
    $.ajax({
      url: queryURL,
      method: "GET",
      header: {
        "Authorization": "key = bf33c451f08cbcb295cf6ccfbd0b5d5d3ceef706"
      }
    }).done(function(response){
      console.log("finished the ajax call");
      for(var i = 0; i < response.data.length; i++){
        var a = response.data[i].name;
        a.attr("ocpc", response.data[i].ocpc);
        a.attr("obj", response.data[i]);
        $("#results").append(a);
        var b = $("<img>");
        b.attr("src", response.data[i].image);
        b.attr("ocpc", response.data[i].ocpc);
        b.attr("obj", response.data[i]);
        $("#results").append(b);
        var c = $("<p>").text(response.data[i].description);
        c.attr("ocpc", response.data[i].ocpc);
        c.attr("obj", response.data[i]);
        $("#results").append(c);
        console.log(response.data[i]);
        var d = $("<p></p>");
        d.attr("ocpc", response.data[i].ocpc);
        d.attr("obj", response.data[i]);
        $("#results").append(d);
        
      }
      
    });    
  };

  $("#results").on("click", function(){
    var ocpc = $(this).ocpc;

  });

  saveResult(resultId);


  function saveResult(searchResult){
    $.post("/api/search_data",{
      ucpc: searchResult
    }).then(function(){
      displayTopResults();
    })
  }
