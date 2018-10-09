"use strict";

$(document).ready(() => {

    var options = {
        devMode: false
    }

    var userData = {
        name: "",
        status: "welcome"
    };


    var data = {
        welcome : {
            string: " Hello human. For the sake of subject identification, can you please decline your identity ?",
            nextAction: () => {
                userData.status = "greeting";
                textInputHideShow(true);
            }
        },
        greeting : {
            string: " Salutations {name}, I\'m your personal assistant for your time being, which may end up pretty soon. You've been removed from any control of your body. Don't despair yet, I can help you with that.",
            nextAction: () => {
                userData.status = "proposeInformation";
                contextAction();
            }
        },
        proposeInformation: {
            string: " You may need more data to process the situation, but we have other matters in hand. Your physical integrity is in danger. Do you wish to be informed of the immediate risk or better assess the situation ?",
            nextAction: () => {
                userData.status = "firstChoice";
            }
        },
        firstChoice : {
            type: "choice",
            string : [
                ""
            ]
        }
    };

    textInputHideShow(false);

    //starts game
    contextAction();

    function contextAction() {
        textOutput(data[userData.status], 0);
        PlaySynthTts(data[userData.status].string);
    }

    //output text and next action on end
    function textOutput(ctx, count) {
        let string = replaceVarsInText(ctx.string);
        const div = $("#textOutput");
        let out = $("#out");
        if (count === 0) {
            out.first().removeAttr("id");
            div.append("<p id='out'></p>");
        }

        if (options.devMode) {
            out.text(string);
            ctx.nextAction();
        } else {
            if (string[count] !== undefined) {

                setTimeout(() => {
                    out.text(out.text() + string[count]);
                    textOutput(ctx, count + 1)
                }, 30);

            } else {
                ctx.nextAction();
            }
        }
    }

    //replace vars in string by userData vars
    function replaceVarsInText(string) {
        let s = string.split("{");
        let vars = [];
        if (s.length > 1) {
            for (let i = 1 ; i < s.length ; i++) {
                vars.push(s[i].split("}")[0]);
            }
        }
        for (let j = 0 ; j < vars.length ; j++) {
            string = string.replace("{" + vars[j] + "}", userData[vars[j]]);
        }
        return string;
    }

    //hide-show text input
    function textInputHideShow(bool) {
        const input = $("#textInput");
        if (bool) {
            input.show();
        } else {
            input.hide();
        }
    }


    //input
    $("#textInput").keypress((e) => {
        if (e.which === 13) {
            let input = $("#textInput");
            textInputHideShow(false);
            eventManager(input.val());
        }
    });

    function eventManager(input) {
        if (userData.status === "greeting") {
            userData.name = input;
            contextAction();
        }

    }





//tests with TTS
function PlaySynthTts(string) {
    let seconds = 30;
    let waveBytes = SAMPLE_FREQUENCY * 2 * 2 * seconds;
    let speed = 0.3;
    let buf = new Int16Array(new ArrayBuffer(waveBytes));
    let freq = 40;
    SynthSpeech(buf, string, freq, speed, 0);
    playAudioBuffer(buf); 
}

function playAudioBuffer(buf) {
    var maxAmp = 22000;
    var audioString = "";
    for (var i=0; i<buf.length; i++) {
        var y = buf[i] / maxAmp * 0x7800;
        audioString += String.fromCharCode(y & 255, (y >> 8) & 255);
    }
    console.log("new Audio...");
    var audio = new Audio("data:audio/wav;base64,"+btoa(atob("UklGRti/UABXQVZFZm10IBAAAAABAAIARKwAABCxAgAEABAAZGF0YbS/UAA") + audioString));
    console.log("play()!");
    audio.play();
}


});