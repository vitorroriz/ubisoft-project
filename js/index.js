"use strict";
window.onload = function() {

var startButton = new Vue({
    el: "#start-button",
    data: {
        message: "Play!"
    }, 
    methods: {
        update: function() {
            this.message = "Restart!";
        }
    }
});

Vue.component('letter-button', {
    props: ['letter'],
    template: '<button v-bind:disabled="hide" v-on:click="button_update" class="letter-button">{{letter.text}}</button>',
    /* data has to be a function in component, so each instance of the 
     * componente can have its own returned data
     */
    data: function() {
        return {
            hide: false
        }
    },
    methods: {
        button_update: function() {
            this.hide = true;
        }
    }
}
)

var game = new Vue ({
    el: "#game",
    data: {
        letterList: [/*{id:0, text:"", hide:false}*/],
        wordToGuess: "",
        triesLeft: 6
    },
    methods: {
        button_update: function() {
            hide = true;
        }
    } 
});

const LETTERS_IN_ALPHABET = 26;
const FIRST_LETTER_CODE = 65;
for(var i = 0; i < LETTERS_IN_ALPHABET; ++i) {
    game.letterList.push({id:i, text:String.fromCharCode(FIRST_LETTER_CODE+i), hide:false});
}

};