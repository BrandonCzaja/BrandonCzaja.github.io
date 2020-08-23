/*
    -Things I want to add
        -Carousal of set pictures
            -Allow the user to be able to click on the image and search by that set
        -Card
            -Picture(s)
            -Name
            -Set(s)
            -CMC
            -Flavor Text
            -Card Type
            -Abilities
            -Power/Toughness if applies
        

*/

// $("form").on('submit', (event) => {
//     event.preventDefault();
//     const search = $('input').val();
    
//     $.ajax({
//         url:`https://api.magicthegathering.io/v1/cards`
//     })

// const mtg = require('mtgsdk');

// mtg.card.find(3).then(result => {
//     console.log(result.card.name);
// })


// })



//////////////////////////////API/////////////////////////////////////

$('form').on('submit' , (event) => {
    event.preventDefault();

    const card = $('input').val();

//This url gets all cards up to 100, but does not get the specific card i am asking for. The input is not triggering
$.ajax({
    url:`https://api.magicthegathering.io/v1/cards?name=${card}`,
}).then(
    (data) => {
        console.log(data);
        $('#name').html(data.cards[0].name);
        $('#mana').html(data.cards[0].manaCost);
        $('#type').html(data.cards[0].type);
        $('#card-text').html(data.cards[0].text);
        $('#card-image').html(`<img src = "${data.cards[0].imageUrl}" width = '10%'>`)
    }
)


})

//Card Image
//imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130483&type=card"






//////////////////////////////////////////////////////////////////////

////////////////////////////Carousel//////////////////////////////////
let currentImageIndex = 0;
let highestIndex = $('.carousel-images').children().length-1


$('.next').on('click' , () => {
    console.log('next was clicked');
    $('.carousel-images').children().eq(currentImageIndex).css('display' , 'none');

    if(currentImageIndex < highestIndex) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0;
    }

    $('.carousel-images').children().eq(currentImageIndex).css('display' , 'block');
})

$('.previous').on('click' , () => {
    $('.carousel-images').children().eq(currentImageIndex).css('display', 'none');

    if(currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = highestIndex;
    }

    $('.carousel-images').children().eq(currentImageIndex).css('display', 'block');
})

console.log(highestIndex)

//////////////////////////////////////////////////////////////////////