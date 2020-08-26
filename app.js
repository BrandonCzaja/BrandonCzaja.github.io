/*
THINGS I NEED TO FIX
    -NOT REAL CARD OR TYPO?
    -NEED MISSING SET SYMBOLS
    -FIX SET SYMBOL PLACEMENT AND SIZES
    -FIX WINDOW BACKGROUND FOR DIFFERENT SCREEN SIZES
        -USE TABLET/PHONE BUTTON IN INSPECT

    


    STRETCH:
        -ON CLICK #BOTTOM TOP BORDER 5PX SOLID BLACK
*/









//////////////////INDIVIDUAL CARDS//////////////////////////////////

$('form').on('submit' , (event) => {
    event.preventDefault();

    const card = $('input').val();

    $.ajax({
        url:`https://api.magicthegathering.io/v1/cards?name=${card}`,
    }).then(
        (data) => {
            console.log(data)
                //Card Image
                $('#card-image').html(`<img src = "${data.cards[0].imageUrl}" 'width = 25%'>`)
                //Mana Cost
                $('#mana').html(data.cards[0].manaCost);
                //Type
                $('#type').html(data.cards[0].type);
                //Rarity
                $('#rarity').html(data.cards[0].rarity);
                //Power & Toughness
                if(data.cards[0].power === undefined) {
                    $('#power').text('This card is not a creature');
                } else {
                $('#power').html(data.cards[0].power + '/' + data.cards[0].toughness);
                }
                //Card Text
                if(data.cards[0].text === undefined) {
                    $('#card-text').text('This card does not have any rules text');
                } else {
                $('#card-text').html(data.cards[0].text);
                }
            })    
            }) , () => {
            $('form').append($('<div>').text('ERROR: Please try another card name.'));
            console.log('ERROR: Please try another card name.')
        }






//////////////////////////////////////////////////////////////////////

///////////////////////    Carousel    //////////////////////////////////
let currentImageIndex = 0;
let highestIndex = $('.carousel-images').children().length-1

//Next Button
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

//Previous Buttons
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
                //use sets/name for h1





const $makeGallery = () => {
    for(let i = 0; i < imagesArray.length; i++) {
        $cardImageGalery = $('<img>').attr({
            src: imagesArray[i],
            title: titlesArray[i]
    });
    }
}

const $img = $('<img>').attr('title' , 'aer')
$('.carousel-images').on('click' , (event) =>{
    $.ajax({
        //url: `https://api.scryfall.com/cards/search?order=set&q=e%3A${$img}&unique=prints`
        url: `https://api.scryfall.com/cards/search?order=set&q=e%3Aaer&unique=prints`
    }).then (
        (data) => {
            
            //console.log(data.data)
            console.log(data);
           for(let i = 0; i < data.data.length; i++) {
            $('<img>').attr('src', data.data[i].image_uris.normal).appendTo($('#bottom'));
           }
        }
    )
})



//make an array of objects that has all the information I need. The loop through that and create a variable for the current index. Then `` with the thing i need at current index


const $cardImageGalery = [
    {
        set_name: 'Aether Revolt',
        imgUrl: 'Aether_Revolt.png',
    }

]


