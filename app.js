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
    // setName only gives me Alpha, the rest come from buttons
    let setName = data.data[highestIndex].name;
    let currentImageIndex = 0;
    const orderedSets = [];

    //This makes the carousel
    for (let i = highestIndex; i >= 0; i--) {
        orderedSets.push(data.data[i].name);
        // Set Symbol
        $("<img class = SetSymbols>")
            .attr({ src: data.data[i].icon_svg_uri, class: `${i}` })
            .appendTo($(".carousel-images"));
    }
    // console.log(orderedSets);
    // Only used for Alpha, rest come from buttons
    $(".set-search").text(setName);

    ////////////////
    // Next Button
    ////////////////
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
        $(".set-search").text(orderedSets[currentImageIndex]);
        // $(".set-search").text(reversedData[currentImageIndex].name);
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
        $(".set-search").text(orderedSets[currentImageIndex]);
    });
});

////////////////////////
// Card Image Gallery
///////////////////////

$(".carousel-images").click(() => {
    $.ajax({
        url: `https://api.scryfall.com/sets/`,
        dataType: "json",
        type: "GET",
        contentType: "application/json",
        crossDomain: true,
    }).then((data) => {
        const setGalleryArray = [data.data];
        console.log(setGalleryArray);
    });
});

// I need to make sure that I am linking only the current image to the correct card gallery. Right now I am pulling in all sets
