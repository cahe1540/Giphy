import * as constants from "./config.js";
import regeneratorRuntime from "regenerator-runtime";
import axios from "axios";

export default class Gifs {

    constructor(){
        this.res = null;
        this.imgUrl = [];
    }

    async fetchQuery (query, offset) {
        try{    
            const data = await axios.get(`${constants.API_URL}search?api_key=${constants.KEY}&q=${query}&limit=50&offset=${offset}&rating=r&lang=en`);
            this.res = data;
            this.generateUsefulFields();
        } catch (error) {
            console.log(error);
        }
    }

    generateUsefulFields(){
       this.res.data.data.forEach(cur => {
           this.imgUrl.push(cur.images.fixed_height.url);
       });
    }
}
