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

    // Gives me all the setCodes so I can use them for gallery images
    let setCodes = [];
    for (let i = highestIndex; i >= 0; i--) {
        setCodes.push(data.data[i].code);
    }

    // Puts the sets in the proper order. The API has them reversed
    const orderedSets = [];

    //This makes the carousel
    for (let i = highestIndex; i >= 0; i--) {
        orderedSets.push(data.data[i].name);
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
            $(".gallery").append($("<img/>").attr("src", `https://scryfall.com/sets/${setCodes[currentImageIndex]}`));
        });
        console.log(setCodes[currentImageIndex]);
        console.log(currentImageIndex);

        $(".carousel-images").children().eq(currentImageIndex).css("display", "block");
        $(".set-search").text(orderedSets[currentImageIndex]);
    });

    // I MIGHT STILL BE ABLE TO GET THIS TO WORK. IF I JUST SET THE GALLERY AND CLICK FUNCTION HERE IT MIGHT WORK

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
            $(".gallery").append($("<img/>").attr("src", `https://scryfall.com/sets/${setCodes[currentImageIndex]}`));
        });
        console.log(setCodes[currentImageIndex]);
        console.log(currentImageIndex);

        $(".carousel-images").children().eq(currentImageIndex).css("display", "block");
        $(".set-search").text(orderedSets[currentImageIndex]);
    });

    // I WONDER IF I COULD SET THE SET CODE TO THE CURRENT IMAGE INDEX HERE

    ////////////////////////
    // Card Image Gallery
    ///////////////////////

    // ${setGallery}
    $(".carousel-images").click((event) => {
        $.ajax({
            url: `https://api.scryfall.com/sets/`,
            dataType: "json",
            type: "GET",
            contentType: "application/json",
            crossDomain: true,
        }).then((data) => {
            console.log("hello");
            // console.log(data.data[0].image_uris.normal);
            // $(".gallery").append($("<img/>").attr("src", data.data[0].image_uris.png));
        });
    });
});
