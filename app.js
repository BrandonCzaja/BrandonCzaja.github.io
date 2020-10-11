// jQuery.ajaxPrefilter(function(options) {
//     if (options.crossDomain && jQuery.support.cors) {
//         options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//     }
// });


//////////////////    INDIVIDUAL CARDS    //////////////////////////////////
$('form').on('submit', (event) => {
    event.preventDefault();
    const card = $('input').val();
    $.ajax({
        url:`https://api.magicthegathering.io/v1/cards?name=${card}`
    }).then(
        (data) => {
            //console.log(data);
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
//For CORS use jsonP

$.ajax({
//URL FOR SET NAMES AND ICONS
url: `https://api.scryfall.com/sets/`,
dataType: "json",
type: "GET",
contentType: "application/json",
crossDomain: true,
}).then(
    (data) =>{
        console.log(data)
        let highestIndex = data.data.length-1;
        let currentImageIndex = 0;
        for(let i = 0; i <= highestIndex; i++){
            $('<img class = SetSymbols>').attr({src: data.data[i].icon_svg_uri , class: `${i}`}).appendTo($('.carousel-images'));
            $('.set-search').text(data.data[currentImageIndex].name);  
        }



        //Card Image Gallery



    //Card Gallery Can Go Here

        //Card Image Gallery
    //    console.log(data.data[1].scryfall_uri)
    //    const setArray = data.data[608].name
    // const setArray = data.data[608].search_uri
    
    //console.log(`This is my setArray: ${setArray}`)

    const setArray = data.data
    // $('.carousel-images').on('click', () => {
      
    // })

    $('.carousel-images').on('click', () => {
        for(let i = 0; i <= highestIndex; i++){
            $("<p></p>").text(data.data[i].name).appendTo($('#bottom'))
        }
    })

    // for(let i = 0; i <= data.data.length-1; i++) {
    //     $(`.carousel-images`).on('click', () => {
    //         ($('<p>').attr('src' , data.data[i].name).appendTo($('#bottom')))
    //     })
    //  } 

    //This gets me the names of each set
    //const setArray = data.data
    // setArray.forEach(data => {
    //     console.log(data.name)
    // })



 //    setArray.forEach(data => console.log(data.scryfall_uri))

 


        ////////////////////////////////////////////////////////////////////////////////////////////////


        
        //Next Button
        $('.next').on('click' , () => {
            console.log('next')
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
            console.log('previous')
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



     








//CARD GALLERY
// let setSearch = 
// $.ajax({
//     // url: 'https://api.scryfall.com/cards/search?order=set&q=e%3Aaer&unique=prints'
//     url: `https://api.scryfall.com/cards/search?order=set&q=e%3A${setSearch}&unique=prints`,   
// }).then(
//     (data) => {
        
//         $('.carousel-images').on('click' , () => {
//             console.log(data)
//             //Notes 10/11/2020 Changed the for loop to i < data.data.length. It was i > data.data.length
//             for(let i = 0; i < data.data.length; i++) {
//                 $('.carousel-images').on('click' , () => {
//                     console.log(data)
//                 $('<img>').attr('src' , data.data[i].image_uris.normal).appendTo($('#bottom'));
//             })
//             } 
//         })
//     }
// )

// $("#bottom").val();
// $.ajax()



