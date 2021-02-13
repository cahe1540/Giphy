import domElements from "./domElements.js";
import Gifs from "./gifModel.js";
import * as view from "./viewController.js";

//state i
let state = {
    imagesLoaded: 0,
    page : 0,
    gifs : new Gifs(),
    dom : new domElements(),
} 

//initialize app
async function init () {

    //fetch initial data
    await state.gifs.fetchQuery('candy', state.page * 50);
    
    //event listener for scrolling down
    window.addEventListener('scroll', view.findEndOfPage.bind(event,state)());
    
    //event listener for serchbar
    state.dom.searchBtn.addEventListener('click', view.newGifSearch.bind(event, state)()); 

    //generate default set on first visit 
    view.generateImages(state);
}

//state to hold all variables
init(); 


