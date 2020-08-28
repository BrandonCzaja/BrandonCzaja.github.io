//////////////////INDIVIDUAL CARDS//////////////////////////////////
//GOOD NEWS: RECEIVED A 503 ERROR: THEY ARE TEMPORARILY OFFLINE FOR MAINTENANCE 
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






////////////////////////////////////////////////////////////////////

///////////////////////    Carousel    //////////////////////////////////
/*
-POTENTIAL NEW API. SAME AS THE CARD SEARCH API BUT FOR SETS NOT CARDS
https://api.magicthegathering.io/v1/sets?SETNAME= THEN HOWEVER I CALL IT

-I WONDER IF I CAN CHANGE THE CAROUSEL TO BE ALL IMAGE VARIATIONS OF THE CARD.
*/

        // $.ajax({
        //     url: 'https://api.magicthegathering.io/v1/sets?'
        // }).then(
        //     (data) => {
        //         console.log(data);
        //         let highestIndex = data.length-1;
        //         let currentImageIndex = 0;

        //         for(let i = 0; i < highestIndex; i++) {
        //             $('<img class = SetSymbols>').attr({src: data[i].imageUrl}).appendTo($('.carousel-images'));
        //         }
                
        //         //Next Button
        //         $('.next').on('click' , () => {
        //             console.log('next was clicked');
        //             $('.carousel-images').children().eq(currentImageIndex).css('display' , 'none');
                
        //             if(currentImageIndex < highestIndex) {
        //                 currentImageIndex++;
        //             } else {
        //                 currentImageIndex = 0;
        //             }
                
        //             $('.carousel-images').children().eq(currentImageIndex).css('display' , 'block');
        //         })

        //         //Previous Buttons
        //         $('.previous').on('click' , () => {
        //             $('.carousel-images').children().eq(currentImageIndex).css('display', 'none');
                
        //             if(currentImageIndex > 0) {
        //                 currentImageIndex--;
        //             } else {
        //                 currentImageIndex = highestIndex;
        //             }
                
        //             $('.carousel-images').children().eq(currentImageIndex).css('display', 'block');
        //         })
        //     }
        // )



 
          
          

          
////////////////////////////////////////////////////////////////////
//SET ICONS
                                    //I WANT TO LIMIT MY SEARCH TO JUST CORE AND EXPANSION SETS

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


//////////////////////////////////////////////////////////////////////


//APIs THAT WORK FOR ME
/*
    -THIS GETS ME THE CARD IMAGE GALLERY SPECIFICALLY FOR AER: WORKS!
    url: `https://api.scryfall.com/cards/search?order=set&q=e%3Aaer&unique=prints`


    -THIS GETS ME THE SET OBJECT WITH POSSIBLY THE SET ICON... (ICON_SVG_URI)
    url: `https://api.scryfall.com/sets/aer`


    -URL SYNTAX I THINK I NEED TO USE
    url: `https://api.scryfall.com/cards/search?order=set&q=e%3A${$img}&unique=prints`


/             //SET ICONS
//             $('<img class = SetSymbols>').attr('src', data.data[i].icon_svg_uri).appendTo($('#bottom'));
//             //SET NAMES
//             //$('<p>').text(data.data[i].name).appendTo('#bottom');
//             //CARD GALLERY
//             //$('<img>').attr('src' , data.data[i].image_uris.normal).appendTo('#bottom');
//         //NOT REALLY SURE WHAT THIS IS RETURNING
//         url: "https://c2.scryfall.com/file/scryfall-symbols/sets/aer.svg?1598241600",
//         //URL FOR CARD GALLERY
//         url: 'https://api.scryfall.com/cards/search?order=set&q=e%3Aaer&unique=prints',
//          //URL FOR SET NAMES AND ICONS
//         url: `https://api.scryfall.com/sets`
*/




// let myArray = []



// let test = () => {

//     $.ajax({
//         url: `https://api.scryfall.com/sets`
//     }).then (
//         (data) => {
//             myArray = data.data;
//             console.log(myArray);
//             for(let i = 0; i < data.data.length; i++) {
//                 myArray.push({
//                     Name: data.data[i].name,
//                     Icon: data.data[i].icon_svg_uri,
//                     Gallery: data.data[i].search_uri
//                 })
//                 //$('<p>').text(data.data[i].name).prependTo('#bottom');
//             //}
//                $('.carousel-images').on('click' , (event) => {
//                 myArray.forEach(element => {
//                     $('<img>').attr('src' , myArray.Gallery).appendTo($('#bottom'));
//                 });
        
//             })


            
//         }

//     })
// }
// test();


// $('.carousel-images').on('click' , () => {
//     $.ajax({
//           //URL FOR CARD GALLERY
//           url: 'https://api.scryfall.com/cards/search?order=set&q=e%3Aaer&unique=prints',   
//     }).then(
//         (data) => {
//             for(let i = 0; i < data.data.length; i++) {
//                $('<img>').attr('src' , myArray[i].Gallery).appendTo($('#bottom'));
//             }
//         })}
// )