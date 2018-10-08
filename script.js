"use strict";

$(document).ready(() => {

    var options = {
        devMode: true
    }

    var userData = {
        name: "",
        status: "status test"
    };


    var data = [{
        label: "welcome",
            string: " Hello human. For the sake of subject identification, can you please decline your identity ?",
            nextAction: () => textInputHideShow(true)
        },
        {
            label: "greeting",
            string: " hi {name}, I\'m your personal assistant for your time being, which may end up pretty soon. You've been removed from any control of your body. Don't despair yet, I can help you with that. {status}",
            nextAction: () => {
                console.log(userData.name)
            }

        }
    ];

    textInputHideShow(false);

    textOutput(data[0], 0);

    //output text and next action on end
    function textOutput(ctx, count) {
        replaceVarsInText(ctx.string);
        const div = $("#textOutput");
        let out = $("#out");
        if (count === 0) {
            out.first().removeAttr("id");
            div.append("<p id='out'></p>");
        }

        if (options.devMode) {
            out.text(ctx.string);
            ctx.nextAction();
        } else {
            if (ctx.string[count] !== undefined) {

                setTimeout(() => {
                    out.text(out.text() + ctx.string[count]);
                    textOutput(ctx, count + 1)
                }, 30);

            } else {
                ctx.nextAction();
            }
        }
    }


    function replaceVarsInText(string) {
        let s = string.split("{");
        let vars = [];
        if (s.length > 1) {
            for (let i = 1 ; i < s.length ; i++) {
                vars.push(s[i].split("}")[0]);
            }
        }
        for (let j = 0 ; j < vars.length ; j++) {
            let v = "{" + vars[j] + "}";
            let c = userData[vars[j]];
            string.replace(v, c);
            console.log(string, v, c);
        }

        console.log(string);
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
            textOutput(data[1], 0);

        }
    });
});