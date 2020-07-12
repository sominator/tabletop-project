<template>
    <div id="container">
        <div id="output">
            <h1>STRUCT</h1>
            <p v-for="(text, index) in textOutput" :key="index">{{text}}</p> 
        </div>
        <div id="input">
            <form>
                <input type="text" v-model="textInput" :placeholder="textInput" />
                <input type="submit" value="Send" v-on:click="submitText" />
            </form>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    let socket = io('http://localhost:3000');

    export default {
        name: 'Chat',
        data: function () {
            return {
                textInput: null,
                textOutput: []
            }
        },
        methods: {
            submitText: function (event) {
                event.preventDefault();
                socket.emit('send', this.textInput);
            }
        },
        created: function () {
            socket.on('connect', () => {
                console.log('Connected!');
            });
            socket.on('receive', (text) => {
                this.textOutput.push(text);
                this.textInput = null;
            });
        }
    }
</script>

<style scoped>
    #container {
        text-align: left;
        display: flex;
        flex-direction: column;
        margin-left: 1vw;
        min-height: 100vh;
    }
    h1 {
        text-align: center;
    }
    .hotpink {
        color: hotpink;
    }
    #input {
        position: fixed;
        margin-top: 95vh;
    }
    input[type=text] {
        height: 20px;
        width: 40vw;
        border: 2px solid cyan;
        background-color: black;
        color: hotpink;
        padding-left: 1em;
    }
    input[type=submit] {
        height: 25px;
        width: 5vw;
        background-color: black;
        color: cyan;
        border: 2px solid cyan;
        margin-right: 2vw;
    }
    input[type=submit]:hover {
        color: hotpink;
    }
    input[type=submit]:focus {
        outline: none;
    }
    @media (max-width: 1000px) {
        #container {
            border-left: none;
            border-top: 2px solid cyan;
            min-height: 50vh;
        }
        #input {
            margin-top: 43vh;
        }
        #output {
            margin-right: 10vw;
        }
        input[type=text] {
            width: 60vw;
        }
        input[type=submit] {
            min-width: 10vw;
        }
    }
</style>