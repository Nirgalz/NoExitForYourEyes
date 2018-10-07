"use strict";

$(document).ready(() => {


    var user = "";

        const data = {
            welcome: {
                content: "Hello human. For the sake of subject identification, can you please decline your identity ?",
                nextAction: () => textInputHideShow(true)
            },
            greeting: {
                content: "hi "+ user +", I\'m your personal assistant for your time being, which may end up pretty soon. You've been removed from any control of your body. Don't despair yet, I can help you with that.",
                nextAction: console.log("gg")

            }
        };
        textInputHideShow(false);

        textOutput(data.welcome, 0);

        //output text and next action on end
        function textOutput(ctx, count) {

            const output = $("#textOutput");
            if (ctx.content[count] !== undefined) {
                setTimeout(() => {
                    output.text(output.text() + ctx.content[count]);
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

            user = input.val();
            textInputHideShow(false);
            textOutput(data.greeting, 0);

        }
    });
    }
);

