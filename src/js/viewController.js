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
