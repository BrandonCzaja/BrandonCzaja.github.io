//////////////////    INDIVIDUAL CARDS    //////////////////////////////////
$("form").on("submit", (event) => {
    event.preventDefault();
    const card = $("input").val();
    $.ajax({
        url: `https://api.magicthegathering.io/v1/cards?name=${card}`,
    }).then((data) => {
        // $("#card-info").html("");
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
// () => {
// THIS DOESN'T WORK
// $('.split left').append($('<div>').text('ERROR: Please try another card name.'));
// console.log('ERROR: Please try another card name.');

///////////////////////    Carousel    //////////////////////////////////
//For CORS use jsonP

$.ajax({
    //URL FOR SET NAMES AND ICONS
    url: `https://api.scryfall.com/sets/`,
    dataType: "json",
    type: "GET",
    contentType: "application/json",
    crossDomain: true,
}).then((data) => {
    let highestIndex = data.data.length - 1;
    let setName = data.data[highestIndex].name;
    let currentImageIndex = 0;

    //This makes the carousel
    for (let i = highestIndex; i >= 0; i--) {
        // Set Symbol
        $("<img class = SetSymbols>")
            .attr({ src: data.data[i].icon_svg_uri, class: `${i}` })
            .appendTo($(".carousel-images"));
        // $(".set-search").text(setName);
    }
    $(".set-search").text(setName);
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Next Button
    $(".next").on("click", () => {
        $(".carousel-images").children().eq(currentImageIndex).css("display", "none");

        // Try using array.reverse => sets = data.data.reverse()
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
        if (currentImageIndex < highestIndex) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }

        $(".carousel-images").children().eq(currentImageIndex).css("display", "block");
        $(".set-search").text(data.data[currentImageIndex].name);
    });

    //Previous Buttons
    $(".previous").on("click", () => {
        $(".carousel-images").children().eq(currentImageIndex).css("display", "none");

        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = highestIndex;
        }

        $(".carousel-images").children().eq(currentImageIndex).css("display", "block");
        $(".set-search").text(data.data[currentImageIndex].name);
    });
});

///////////////////////////// CARD IMAGE GALLERY ////////////////////////////////////
