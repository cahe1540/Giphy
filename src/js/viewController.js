import Gifs from './gifModel.js';

export const addImage = (src) => {
    if(!(src === undefined)){
        const img = document.createElement('img');
        img.src = src;
        document.querySelector('.Gifs').appendChild(img);
    }
}

//remove all rendered images
export const eraseImages = (parent, children) => {
    for(let i = children.length-1; i >= 0; i--){
        parent.removeChild(children[i]);
    }
}

export const generateImages = (state) => {
    //load 9 more images
    const limit = state.imagesLoaded+9;
    for(let i = state.imagesLoaded; i < limit; i++){

        addImage(state.gifs.imgUrl[i]);
        state.imagesLoaded++;
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