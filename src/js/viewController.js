import Gifs from './gifModel.js';
import domElements from './domElements.js';

const domEls = new domElements();

//add a single image to image area
export const addImage = (src) => {
    
    //only do so if img exists
    if(!(src === undefined)){
        const img = document.createElement('img');
        img.src = src;
        domEls.gifArea.appendChild(img);
    }
}

//remove all rendered images or messages
export const eraseImages = (parent, children) => {
    for(let i = children.length-1; i >= 0; i--){
        parent.removeChild(children[i]);
    }
}

//tell user search returned no results
export const renderSearchFailMessage = () => {
    let message = 'Search returned no results...'

    let errorMsg = document.createElement('div');

    errorMsg.classList.add('error-message');
    errorMsg.innerHTML = message;

    domEls.gifArea.appendChild(errorMsg);
}

export const generateImages = (state) => {
    
    if(state.gifs.resultsFound){
        //load 9 more images
        const limit = state.imagesLoaded+9;
        for(let i = state.imagesLoaded; i < limit; i++){

            addImage(state.gifs.imgUrl[i]);
            state.imagesLoaded++;
        }    
    } else {
        renderSearchFailMessage();
    }
}

//event handler for scroll action
export function findEndOfPage (state) {
    return async function fn(e){
        const bottomOfPage = document.body.offsetHeight;
        if(window.innerHeight + window.pageYOffset >= bottomOfPage){
            
            //if current images can still be retrieved from state
            if(state.imagesLoaded < state.gifs.imgUrl.length){
            
                generateImages(state);
            
            //otherwise, load more images
            } else{
                state.page++;
                await state.gifs.fetchQuery('cartoon', state.page * 50);
                generateImages(state);
            }
        }
    }
}

//event handler for search button
export function newGifSearch (state) {
    return async function fn(e) {
        //prevent a default behavior
        e.preventDefault();
        
        //get the search value
        const newQuery = state.dom.searchArea.value;
        
        //get new gif urls
        if(newQuery !== ''){

            //remove all old images
            let children = state.dom.gifArea.children;
            eraseImages(state.dom.gifArea, children);

            //reset num gifs loaded
            state.imagesLoaded = 0;

            //replace gif data
            state.gifs = new Gifs();
            await state.gifs.fetchQuery(newQuery, 0);

            //render new gifs
            generateImages(state);
        }
    }
}