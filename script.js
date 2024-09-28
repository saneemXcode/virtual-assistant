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
   content.innerText=transcript.replace("Mirza", "Miza");
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
    const userAgent = navigator.userAgent 
   // The navigator.userAgent property contains information about the browser and operating system being used.

    if (/android/i.test(userAgent)) {
        // Android-specific intent to open the calculator app
        speak("Opening calculator on Android...");
        window.location.href = 'intent:#Intent;action=android.intent.action.MAIN;category=android.intent.category.APP_CALCULATOR;end;';
      /*  On Android, it's possible to use an intent to communicate with other apps from within a browser.
        By specifying a special URL format (intent://), we can try to trigger the native Calculator app on an Android device*/
    }else {
        // Fallback for desktop or unknown device
        speak("Opening calculator...");
        window.open("calculator://", "_blank"); // Open web-based calculator
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
   else if(message.includes("open github")){
    speak("opening github...")
    window.open('https://github.com/',"_blank")
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

   else{
   let final_text="this is  what i found on internet regarding "+message.replace("miza ","") || message.replace("mirza ","") 
    speak(final_text)
    window.open(`https://www.google.co.in/search?q=${message.replace("mirza ","") || message.replace("mirza ","")}`,"_blank")
   }
}
