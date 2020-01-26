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
            hide: false,
            letterVal: this.letter.text
        }
    },
    methods: {
        button_update: function() {
            this.hide = true;
            game.check_letter(this.letterVal);
        }
    }
}
)

var game = new Vue ({
    el: "#game",
    data: {
        letterList: [/*{id:0, text:"", hide:false}*/],
        wordToGuess: "abacate",
        triesLeft: 6
    },
    methods: {
        button_update: function(letter) {
            hide = true;
        },
        check_letter: function(guess) {
            var reg = new RegExp(guess,'i');
            if(this.wordToGuess.match(reg)) {
                this.reveal_letter();
            } else {
                this.triesLeft--;
                if(this.triesLeft <= 0) {
                    this.game_over();
                }
            }
        },
        game_over: function() {
            console.log("game over!");
        },
        reveal_letter: function() {
            console.log("show a letter");
        }
    } 
});

const LETTERS_IN_ALPHABET = 26;
const FIRST_LETTER_CODE = 65;
for(var i = 0; i < LETTERS_IN_ALPHABET; ++i) {
    game.letterList.push({id:i, text:String.fromCharCode(FIRST_LETTER_CODE+i), hide:false});
}

};