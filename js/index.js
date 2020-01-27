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

function n_distinct_chars(word) {
    var distinct = new Set();
    for (let index = 0; index < word.length; index++) {
        let c = word.charAt(index); 
        if(c != " ")
            distinct.add(c);
    }
    return distinct.size;
}

window.onload = function() {

Vue.component('letter-button', {
    props: ['letter'],
    template: '<button v-bind:disabled="disabled" v-on:click="button_update" class="letter-button">{{letter.text}}</button>',
    /* data has to be a function in component, so each instance of the 
     * componente can have its own returned data
     */
    data: function() {
        return {
            disabled: true,
            letterVal: this.letter.text
        }
    },
    methods: {
        button_update: function() {
            this.disabled = true;
            //game.check_letter(this.letterVal);
            this.$parent.$emit('letter-input', this.letterVal);
        },
        restart: function() {
            this.disabled = false;
        },
        game_over: function() {
            this.disabled = true;
        }
    },

    created: function(){
        /* Event listeners (uses parent as event bus) */
        this.$parent.$on('start-button', this.restart);
        this.$parent.$on('game-over', this.game_over);
    }
});

Vue.component('letter-display', {
    props: ['letter'],
    template: '<div class="word-display">{{letter.text == 32 ? " " : letter.text}}</div>'
});

var game = new Vue ({
    el: "#game",
    data: {
        letterList: [/*{id:0, text:"", disabled:false}*/],
        wordToGuess: "super mario",
        displayVector: [],  
        MAX_TRIES: 6,
        triesLeft: 6,
        nLettersLeftToWin: 10,
        startButtonMsg: "Play!",
        listHangmanImgs: ["sinit.png","s0.png","s1.png","s2.png","s3.png","s4.png","s5.png"],
        imageDisplay:"sinit.png",
        resultClass:"",
        resultMsg:"",
        wordsList: [
            "super mario",
            "pokemon",
            "assassins creed",
            "the settlers",
            "anno"
        ],
    },
    methods: {
        start_button: function() {
            this.startButtonMsg = "Restart";
            this.wordToGuess = this.get_random_word();
            this.nLettersLeftToWin = n_distinct_chars(this.wordToGuess);
            this.clear_display();
            for(var i = 0; i < this.wordToGuess.length; i++) {
                if(this.wordToGuess.charAt(i) == " ")
                    Vue.set(this.displayVector, i, {id:'dv'+i, text:32});
                else
                    Vue.set(this.displayVector, i, {id:'dv'+i, text:'?'});
            }
            this.triesLeft = this.MAX_TRIES;
            this.imageDisplay = this.listHangmanImgs[0];
            this.resultMsg = "";
            this.$emit('start-button');
        },
        button_update: function(letter) {
            disabled = true;
        },
        check_letter: function(guess) {
            var indices = get_indices_of(this.wordToGuess, guess);
            if(indices.length > 0) {
                this.reveal_letter(indices, guess);
                this.nLettersLeftToWin--;
                if(this.nLettersLeftToWin <= 0) {
                    //user has won the game
                    this.game_won();
                }
            } else {
                this.triesLeft--;
                let listSz = this.listHangmanImgs.length;
                this.imageDisplay = this.listHangmanImgs[listSz-this.triesLeft-1];
                if(this.triesLeft <= 0) {
                    this.game_over();
                }
            }
        },
        game_over: function() {
            console.log("game over!");
            //this.clear_display();
            this.resultClass = "result-gameover";
            this.resultMsg = "GAME OVER!";
            this.$emit('game-over');
        },
        game_won: function() {
            console.log("you won!!!!")
            this.resultClass = "result-gamewon";
            this.resultMsg = "YOU WON!";
            this.$emit('game-over');
        },
        reveal_letter: function(indices, letter) {
            for(var i = 0; i < indices.length; i++) {
                Vue.set(this.displayVector, [indices[i]], {id:'dv'+indices[i], text:letter});
            }
        },
        get_random_word() {
            var index = Math.floor((Math.random() * this.wordsList.length));
            return this.wordsList[index];
        },
        clear_display() {
            this.displayVector.splice(0, this.displayVector.length);
        }
    },
    created: function() {
        this.triesLeft = this.MAX_TRIES;
        this.imageDisplay = this.listHangmanImgs[0];
        /* Event listeners (game is used as event bus by children) */
        this.$on('letter-input', this.check_letter);
    }
});

const LETTERS_IN_ALPHABET = 26;
const FIRST_LETTER_CODE = 65;
for(var i = 0; i < LETTERS_IN_ALPHABET; ++i) {
    game.letterList.push({id:i, text:String.fromCharCode(FIRST_LETTER_CODE+i), disabled:false});
}

};