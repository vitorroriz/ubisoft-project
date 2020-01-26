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
    template: '<button class="letter-button">{{letter.text}}</button>'
}
)

var game = new Vue ({
    el: "#game",
    data: {
        letterList: [/*{id:0, text:""}*/]
    } 
});

const LETTERS_IN_ALPHABET = 26;
const FIRST_LETTER_CODE = 65;
for(var i = 0; i < LETTERS_IN_ALPHABET; ++i) {
    game.letterList.push({id:i, text:String.fromCharCode(FIRST_LETTER_CODE+i)});
}

};