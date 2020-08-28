//////////////////    INDIVIDUAL CARDS    //////////////////////////////////
$('form').on('submit' , (event) => {
    event.preventDefault();
    const card = $('input').val();
    $.ajax({
        url:`https://api.magicthegathering.io/v1/cards?name=${card}`
    }).then(
        (data) => {
            console.log(data);
            // if(data.cards[0].text === undefined) {
            //     $('#card-text').text('This card does not have any rules text');
            // } else {
            // $('#card-text').html(data.cards[0].text);
            // }IF DATA.CARDS[0].NAME != INPUT => ERROR

                //Card Image
                $('#card-image').html(`<img src = "${data.cards[0].imageUrl}">`);
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
                //THIS DOESN'T WORK
            $('.split left').append($('<div>').text('ERROR: Please try another card name.'));
            console.log('ERROR: Please try another card name.');
        }



///////////////////////    Carousel    //////////////////////////////////
$.ajax({
//URL FOR SET NAMES AND ICONS
url: `https://api.scryfall.com/sets/` 
}).then(
    (data) =>{
        //console.log(data)
        let highestIndex = data.data.length-1;
        let currentImageIndex = 0;
        for(let i = 0; i <= highestIndex; i++){
            $('<img class = SetSymbols>').attr({src: data.data[i].icon_svg_uri , class: `${i}`}).appendTo($('.carousel-images'));
            $('.set-search').text(data.data[currentImageIndex].name);      
        }          
        
        //Next Button
        $('.next').on('click' , () => {
            $('.carousel-images').children().eq(currentImageIndex).css('display' , 'none');

            if(currentImageIndex < highestIndex) {
                currentImageIndex++;
            } else {
                currentImageIndex = 0;
            }
        
            $('.carousel-images').children().eq(currentImageIndex).css('display' , 'block');
            $('.set-search').text(data.data[currentImageIndex].name);
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
            $('.set-search').text(data.data[currentImageIndex].name);
        })
    }
)



/*                               THINGS TO ADD IN THE FUTURE
REJECTION NOTICE IF CARD DOES NOT EXIST
CARD IMAGE GALLERY
DECK BUILDING FEATURE
DRAFTING FEATURE
LIMIT MY CAROUSEL TO CORE AND EXPANSION SETS INSTEAD OF EVERY PRINTING
*/ 


//CARD GALLERY
// $.ajax({
//     url: 'https://api.scryfall.com/cards/search?order=set&q=e%3Aaer&unique=prints'
// }).then(
//     (data) => {
//         $('.carousel-images').on('click' , () => {
//             for(let i = 0; i > data.data.length; i++) {
//                 $('<img>').attr('src' , data.data[i].image_uris.normal).appendTo($('#bottom'));
//             } 
//         })
//     }
// )


// $('.carousel-images').on('click' , () => {
//   $.ajax({
//         //URL FOR CARD GALLERY
//         url: 'https://api.scryfall.com/cards/search?order=set&q=e%3Aaer&unique=prints',   
//   }).then(
//       (data) => {
//         for(let i = 0; i < data.data.length; i++) {
//             $('<img>').attr('src' , data.data[i].image_uris.normal).appendTo($('#bottom'));
//         }
//       }
//   )
// })
