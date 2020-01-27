"use strict";

function get_indices_of(str, charToFind)
{
    var upperStr = str.toUpperCase();
    var upperChar = charToFind.toUpperCase();

    var ret = [];
    if(upperStr.length == 0)
        return ret;
    for(var i = 0; i < upperStr.length; ++i) {
        var c = upperStr.charAt(i);
        if(c == upperChar)
            ret.push(i);
    }
    return ret;
}

window.onload = function() {

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
            //game.check_letter(this.letterVal);
            this.$parent.$emit('letter-input', this.letterVal);
        }
    }
});

Vue.component('letter-display', {
    props: ['letter'],
    template: '<div class="word-display">{{letter.text == 32 ? " " : letter.text}}</div>'
});

var game = new Vue ({
    el: "#game",
    data: {
        letterList: [/*{id:0, text:"", hide:false}*/],
        wordToGuess: "super mario",
        displayVector: [],  
//        displayVector: [],
        triesLeft: 6,
        startButtonMsg: "Play!"
    },
    methods: {
        start_button: function() {
            this.startButtonMsg = "Restart";
            this.displayVector.splice(0, this.displayVector.length);
            for(var i = 0; i < this.wordToGuess.length; i++) {
                if(this.wordToGuess.charAt(i) == " ")
                    Vue.set(this.displayVector, i, {id:'dv'+i, text:32});
                else
                    Vue.set(this.displayVector, i, {id:'dv'+i, text:'?'});
            }
        },
        button_update: function(letter) {
            hide = true;
        },
        check_letter: function(guess) {
            var indices = get_indices_of(this.wordToGuess, guess);
            if(indices.length > 0) {
                this.reveal_letter(indices, guess);
            } else {
                this.triesLeft--;
                if(this.triesLeft <= 0) {
                    this.game_over();
                }
            }
        },
        game_over: function() {
            console.log("game over!");
            this.displayVector.splice(0, this.displayVector.length);
        },
        reveal_letter: function(indices, letter) {
            for(var i = 0; i < indices.length; i++) {
                Vue.set(this.displayVector, [indices[i]], {id:'dv'+indices[i], text:letter});
            }
        }
    },
    created: function() {
        
    }
});

/* Game events */
game.$on('letter-input', game.check_letter);

const LETTERS_IN_ALPHABET = 26;
const FIRST_LETTER_CODE = 65;
for(var i = 0; i < LETTERS_IN_ALPHABET; ++i) {
    game.letterList.push({id:i, text:String.fromCharCode(FIRST_LETTER_CODE+i), hide:false});
}

};