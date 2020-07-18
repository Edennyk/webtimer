
let timerObj = {
    minutes: 0,
    seconds: 0,
    timerId: 0
}

function soundAlarm(){
    let amount = 1 ;
    let audio = new Audio("Timer_Sound_Effect.mp3")
    
    // add in start btn onclick
    //child function
    function playSound(){
        audio.pause()
        audio.currentTime = 0
        if(document.getElementById("sound").checked) 
        {audio.play()}
    }
    for(let i = 0 ; i < amount; i++){
        setTimeout(playSound, 1200 * i)
    }
}


function updateValue(key, value){
    if(value < 0){
        value = 0;
    }

    if(key === "seconds"){
        if(value < 10){
            // set seconds format with "0"
            value = "0" + value; 
        }

        if(value > 59){
            value = 59;
        }
    }

    // id with key = minutes, seconds => update timer
    $("#" + key).html(value || 0);
    timerObj[key] = value;

}

// immediately invoked function
(function detectChanges(key){
    //selector pattern minutes / seconds 
    let input = "#" + key + "-input";

    // like event listener
    $(input).change(function(){
        updateValue(key, $(input).val());
    });

    //escape key
    $(input).keyup(function(){
        updateValue(key, $(input).val());
    });

    return arguments.callee;

})("minutes")("seconds"); // call twice at the beginning

//managing the buttons and input
function startTimer(){
    buttonManager(["start", false], ["pause", true], ["stop",true]);
    freezeInput();

    timerObj.timerId = setInterval(function(){
        timerObj.seconds--;
        if(timerObj.seconds < 0){
            if(timerObj.minutes == 0){
                soundAlarm();
                return stopTimer();
            }
            timerObj.seconds = 59;
            timerObj.minutes--;
        }

        updateValue("minutes", timerObj.minutes);
        updateValue("seconds", timerObj.seconds);

    },1000);
}
function stopTimer(){
    clearInterval(timerObj.timerId);
    buttonManager(["start", true], ["pause", false], ["stop",false]);
    unfreezeInput();

    //reset timer back to original time
    // updateValue("minutes", $("#minutes-input").val());
    // updateValue("seconds", $("#seconds-input").val());

}
function pauseTimer(){
    buttonManager(["start", true], ["pause", false], ["stop",true]);
    clearInterval(timerObj.timerId);
}

//rest operator: using spread operator ... => to array
function buttonManager(...btnArray){
   for(let i = 0; i < btnArray.length; i++){
       let button = "#" + btnArray[i][0] + "-button";
       // array with two elements: 1e(name of btn) , 2e(true:enable or false:disable btn)
       if(btnArray[i][1]){
           $(button).removeAttr("disabled");
        } else{
            // attr(): change attribute value in html tag
            $(button).attr("disabled", "disabled");
        }

   }
}

function freezeInput(){
    $("#minutes-input").attr("disabled","disabled");
    $("#seconds-input").attr("disabled","disabled");
}
function unfreezeInput(){
    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");
}


