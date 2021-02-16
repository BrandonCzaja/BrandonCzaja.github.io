//////////////////    INDIVIDUAL CARDS    //////////////////////////////////
$("form").on("submit", (event) => {
    event.preventDefault();
    const card = $("input").val();
    $.ajax({
        url: `https://api.magicthegathering.io/v1/cards?name=${card}`,
    }).then((data) => {
        // I NEED A CASE FOR IF THE CARD DOESN'T EXIST

        //Card Image
        $("#card-image").html(`<img src = "${data.cards[0].imageUrl}">`);

        //Mana Cost
        $("#mana-cost").text("Mana Cost");
        if (data.cards[0].manaCost === undefined) {
            $("#mana").text("This card has no cost");
        } else {
            $("#mana").html(data.cards[0].manaCost);
        }

        //Type
        $("#card-type").text("Card Type");
        $("#type").html(data.cards[0].type);

        //Rarity
        $("#card-rarity").text("Card Rarity");
        $("#rarity").html(data.cards[0].rarity);

        //Card Text
        $("#card-rules").text("Rules Text");
        if (data.cards[0].text === undefined) {
            $("#card-text").text("This card does not have any rules text");
        } else {
            $("#card-text").html(data.cards[0].text);
        }

        //Power & Toughness
        $("#card-pt").text("Power & Toughness");
        if (data.cards[0].power === undefined) {
            $("#power").text("This card is not a creature");
        } else {
            $("#power").html(data.cards[0].power + "/" + data.cards[0].toughness);
        }
    });
});

///////////////////////    Carousel    //////////////////////////////////

$.ajax({
    //URL FOR SET NAMES AND ICONS
    url: `https://api.scryfall.com/sets/`,
    dataType: "json",
    type: "GET",
    contentType: "application/json",
    crossDomain: true,
}).then((data) => {
    // Creates a iterable number to associate the sets with
    let highestIndex = data.data.length - 1;
    let currentImageIndex = 0;

    // Puts the sets in the proper order. The API has them reversed
    const orderedSetsNames = [];
    const orderedSetsCodes = [];

    //This makes the carousel
    for (let i = highestIndex; i >= 0; i--) {
        orderedSetsNames.push(data.data[i].name);
        orderedSetsCodes.push(data.data[i].code);
        // Set Symbol
        $("<img class = SetSymbols>")
            .attr({ src: data.data[i].icon_svg_uri, class: `${i}` })
            .appendTo($(".carousel-images"));
    }

    // Only used for Alpha, rest come from buttons
    let setName = data.data[highestIndex].name;
    $(".set-search").text(setName);

    ////////////////
    // Next Button
    ////////////////
    $(".next").on("click", () => {
        $(".carousel-images").children().eq(currentImageIndex).css("display", "none");

        if (currentImageIndex < highestIndex) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }

        $(".carousel-images").click((event) => {
            $(".gallery").append($("<img/>").attr("src", `https://scryfall.com/sets/${orderedSetsCodes[currentImageIndex]}`));
        });
        // console.log(orderedSetsCodes[currentImageIndex]);
        // console.log(currentImageIndex);

        $(".carousel-images").children().eq(currentImageIndex).css("display", "block");
        $(".set-search").text(orderedSetsNames[currentImageIndex]);
    });

    /////////////////////
    // Previous Buttons
    /////////////////////
    $(".previous").on("click", () => {
        $(".carousel-images").children().eq(currentImageIndex).css("display", "none");

        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = highestIndex;
        }

        $(".carousel-images").click((event) => {
            $(".gallery").append($("<img/>").attr("src", `https://scryfall.com/sets/${orderedSetsCodes[currentImageIndex]}`));
        });
        // console.log(orderedSetsCodes[currentImageIndex]);
        // console.log(currentImageIndex);

        $(".carousel-images").children().eq(currentImageIndex).css("display", "block");
        $(".set-search").text(orderedSetsNames[currentImageIndex]);
    });

    ////////////////////////
    // Card Image Gallery
    ///////////////////////

    // I need to reset the gallery with each click. JS has a reset method, but that is for forms. I don't know if jQuery has a reset method

    $(".carousel-images").click((event) => {
        $.ajax({
            // Currently this url is giving me all the cards because I am pulling all of the set codes
            url: `https://api.scryfall.com/cards/search?order=set&q=e%3A${orderedSetsCodes[currentImageIndex]}&unique=prints`,
        }).then((data) => {
            // console.log(data);
            console.log(data.data);
            // Gives me the amount of cards in the set
            console.log(data.data.length);

            // THIS WORKS DO NOT DELETE, NEEDS EDITING
            for (let i = 0; i < data.data.length; i++) {
                $("#bottom").prepend(`<img src=${data.data[i].image_uris.border_crop}/>`);
            }
        });
    });
});
