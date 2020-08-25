/*
THINGS I NEED TO FIX
    -IF CARD IS VANILLA THE RULES TEXT DOESN'T CHANGE
        -IF(RULES === FALSE) {DISPLAY THIS CARD HAS NO SPECIAL RULES}
    -I NEED TO LIMIT THE DISPLAY WIDTH OF TH DL SO THAT MY IMAGES DON'T FLY TO THE RIGHT SIDE IF THE TEXT IS LONGER THAN AVERAGE
    -NOT REAL CARD OR TYPO?
    -NEED MISSING SET SYMBOLS
    -FIX SET SYMBOL PLACEMENT AND SIZES

    


    STRETCH:
        -ON CLICK #BOTTOM TOP BORDER 5PX SOLID BLACK
*/


////// TEST CODE FOR DYNAMICALLY ADDING IMAGES.... THIS WORKS FOR THE SET SYMBOLS BUT NOW I NEED TO MAKE IT FOR THE CARD GALLERY WHEN I CLICK THE SET SYMBOL IMAGE//////


//I think the solution to this is going to be loop through an array of images > append each image to the body > give each image an id of i

    //$('#bottom').append($('#1').css('background-color', 'white'));
/////////////////////////////////////////////









//////////////////INDIVIDUAL CARDS//////////////////////////////////

$('form').on('submit' , (event) => {
    event.preventDefault();

    const card = $('input').val();

    $.ajax({
        url:`https://api.magicthegathering.io/v1/cards?name=${card}`,
    }).then(
        (data) => {
                //Card Image
                $('#card-image').html(`<img src = "${data.cards[0].imageUrl}" 'width = 25%'>`)
                //Card Name
                //$('#name').html(data.cards[0].name);
                //Mana Cost
                $('#mana').html(data.cards[0].manaCost);
                //Type
                $('#type').html(data.cards[0].type);
                //Rarity
                $('#rarity').html(data.cards[0].rarity);
                //Rules Text
                    //If card is vanilla rules text says loading...
                $('#card-text').html(data.cards[0].text);
            })    
            }) , () => {
            $('form').append($('<div>').text('ERROR: Please try another card name.'));
            console.log('ERROR: Please try another card name.')
        }






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









//////////// CAROUSEL CLICK = DISPLAY SET ///////////
let $setSymbol = $('#results');
//url:`https://api.scryfall.com/sets/SETNAME?as=grid&order=set`
//So what the url says is search this site by sets => set name > display it as a grid => in the order that the cards are listed in the set


//Object path to Card Names `https://api.scryfall.com/cards/search?order=set&q=e%3Awar&unique=prints`
    //object.data[i].name



// const getSetSymbol = () => {

//   $.ajax({
//         url: `https://api.scryfall.com/cards/search?order=set&q=e%3Awar&unique=prints`
//     }).then(
//         (data) => {
//             console.log('you clicked the set symbol');
//            $($setSymbol).append(data);
//             console.log(data);
//         }
//     )
// }

// $('img').on('click' , getSetSymbol);


//BREAKTHROUGH FOR CAROUSEL IMAGES
    //SCRYFALL HAS A SEARCH_URI PROPERTY WITH AN URL THAT GIVES THE LIST OF EVERY CARD IN THE SET





























//Use a different API for the carousel, my original one doesn't have the set info

//Carousel API
    //I may need this api https://mtgjson.com/data-models/set/
    //Or this one https://api.scryfall.com

// const setSymbol = $('.carousel-images')

// $.ajax({
//     url: `https://api.magicthegathering.io/v1/sets?name=${setSymbol}`,
// }).then(
//     (data) => {
//         $('.carousel-images').html(data.sets.name);
//     }
// )





//Making the set images a button
    //Put an event handler on the image and do event.target