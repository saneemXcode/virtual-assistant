let btn=document.querySelector('#btn')
let content=document.querySelector('#content')
let voice=document.querySelector('#voice')

//to speak ai we use SpeechSynthesisUtterance class or function

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text) // we created SpeechSynthesisUtterance object
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="en-GB" 
    window.speechSynthesis.speak(text_speak) // this speak on window using speechSynthesis.speak  (it convert text to speech)
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours(); // Get the current hour (0-23)

    if (hours >= 4 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else if (hours >= 16 && hours < 20) {
        speak("Good Evening Sir");
    } 
}




let speechRecognition  = window.SpeechRecognition || window.webkitSpeechRecognition
if (!speechRecognition) {
    // If Speech Recognition is not supported
    speak("Speech recognition is not supported in your browser.");
}
let recognition =  new speechRecognition()
recognition.onresult=(event)=>{
   let currentIndex =event.resultIndex;
   let transcript=event.results[currentIndex][0].transcript
   content.innerText = transcript
  .replace("Mirza", "Miza")
  .replace("git hub", "github")
  .replace("git up", "github") .replace("git hab", "github")
  .replace("get hub", "github").replace("get up", "github").replace("it hub", "github");
    console.log(event)
    takeCommand(transcript.toLowerCase())
}
btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none";
    voice.style.display="block"
    setTimeout(()=>{
        voice.style.display="none"
        btn.style.display="flex";
    },5000)
})

function openCalculator() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        // Android device detected, attempt to open the calculator using intent
        try {
            speak("Opening calculator on Android...");
            // Android intent to open calculator
            window.location.href = "intent://calculator/#Intent;action=android.intent.action.MAIN;category=android.intent.category.APP_CALCULATOR;end";

            setTimeout(function() {
                // If intent doesn't open the calculator, fallback to web-based calculator
                speak("Unable to open native calculator. Opening web-based calculator instead...");
                window.open("https://www.calculator.com", "_blank");
            }, 2000); // 2-second delay to allow for intent to work
        } catch (error) {
            // Fallback to web calculator if something goes wrong
            speak("Opening web-based calculator...");
            window.open("https://www.calculator.com", "_blank");
        }
    }  else {
        // Fallback for desktop or unknown devices
        speak("Opening calculator...");
        window.open("calculator://", "_blank");
    }
}






function takeCommand(message){
    btn.style.display="flex";
    voice.style.display="none"
   if(message.includes("hello") || message.includes("hey")){
    speak("hello sir ,what can i help you ?")
   }else if(message.includes("who are you")){
    speak("i am virtual assistant ,developed by  saneexcode ?")
   }else if(message.includes("open youtube")){
    speak("opening  youtube...")
    window.open('https://www.youtube.com/',"_blank")
   }
   else if(message.includes("open google")){
    speak("opening  google")
    window.open('https://www.google.com/',"_blank")
   }
   else if(message.includes("open linkedin")){
    speak("opening  linkedin...")
    window.open('https://www.linkedin.com/feed/',"_blank")
   }
   else if(message.includes("open instagram")){
    speak("opening  instagram...")
    window.open('https://www.instagram.com/',"_blank")
   } else if(message.includes("open facebook")){
    speak("opening facebook...")
    window.open('https://www.facebook.com/',"_blank")
   }
   else if(message.includes("open twitter") || message.includes("open x") ){
    speak("opening twitter...")
    window.open('https://x.com/',"_blank")
   }
 
   else if (
    ["open github", "open get hub", "open it hub", "open get up", "open git hab"]
    .some(phrase => message.toLowerCase().includes(phrase))
) {
    speak("Opening GitHub...");
    window.open("https://github.com", "_blank");
}
   else if(message.includes("open calculator")){
    openCalculator();
}

   else if(message.includes("open whatsapp")){
    speak("opening whatsapp...")
    window.open('https://whatsapp.com/',"_blank")
   }
   
   else if(message.includes("time")){
    let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})

    speak(time)
 
   }
   else if(message.includes("date")){
    let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short",year:"numeric"})

    speak(date)
 
   }

 else {
    // Correctly handle the message replacement for the final text
    const cleanedMessage = message.replace(/miza /i, "").replace(/mirza /i, "").trim();
    const final_text = "This is what I found on the internet regarding " + cleanedMessage;
    speak(final_text);
    window.open(`https://www.google.co.in/search?q=${cleanedMessage}`, "_blank");
}
}
