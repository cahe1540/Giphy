import domElements from "./domElements.js";
import Gifs from "./gifModel.js";
import * as view from "./viewController.js";

//state 
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
    window.addEventListener('scroll', findEndOfPage);
    
    //event listener for serchbar
    state.dom.searchBtn.addEventListener('click', newGifSearch); 

    //generate default set on first visit 
    view.generateImages(state);
}

//event handler for scroll action
async function findEndOfPage(e){
    const bottomOfPage = document.body.offsetHeight;
    if(window.innerHeight + window.pageYOffset >= bottomOfPage){
        //if current images can still be retrieved from state
        if(state.imagesLoaded < state.gifs.imgUrl.length){
        
            view.generateImages(state);
        
        //otherwise, load more images
        } else{
            state.page++;
            await state.gifs.fetchQuery('cartoon', state.page * 50);
            view.generateImages(state);
        }
    }
}

//event handler for search button
async function newGifSearch(e) {

    //prevent a default behavior
    e.preventDefault();
    
    //get the search value
    const newQuery = state.dom.searchArea.value;
    
    //get new gif urls
    if(newQuery !== ''){

        //remove all old images
        let children = state.dom.gifArea.children;
        view.eraseImages(state.dom.gifArea, children);

        //reset num gifs loaded
        state.imagesLoaded = 0;

        //replace gif data
        state.gifs = new Gifs();
        await state.gifs.fetchQuery(newQuery, 0);

        //render new gifs
        view.generateImages(state);
    }
}

//state to hold all variables
init(); 


