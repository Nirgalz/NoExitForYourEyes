"use strict";

$(document).ready(() => {


    var userData = {
        name: "",
        status: ""
    };


        const data = {
            welcome: {
                content: " Hello human. For the sake of subject identification, can you please decline your identity ?",
                nextAction: () => textInputHideShow(true)
            },
            greeting: {
                content: " hi "+ userData.name +", I\'m your personal assistant for your time being, which may end up pretty soon. You've been removed from any control of your body. Don't despair yet, I can help you with that.",
                nextAction: () => {console.log(userData.name)}

            }
        };
        textInputHideShow(false);

        textOutput(data.welcome, 0);

        //output text and next action on end
        function textOutput(ctx, count) {

            const div = $("#textOutput");
            let out = $("#out");
            if (count === 0) {
                out.first().removeAttr("id");
                div.append("<p id='out'></p>");
            }

            if (ctx.content[count] !== undefined) {

                setTimeout(() => {
                    out.text(out.text() + ctx.content[count]);
                    textOutput(ctx, count + 1)
                }, 30);
            }
            else {
                ctx.nextAction();
            }
        }

        function textInputHideShow(bool) {
            const input = $("#textInput");
            if (bool) {
                input.show()
            } else {
                input.hide()
            }
        }


    //input
    $("#textInput").keypress((e) => {

        if (e.which === 13) {

            let input = $("#textInput");

            userData.name = input.val();
            textInputHideShow(false);
            textOutput(data.greeting, 0);

        }
    });
    }
);

