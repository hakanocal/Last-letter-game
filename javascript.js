//SAYFANIN YÜKLENME DURUMUNA GÖRE ANİMASYON GÖSTER
document.onreadystatechange = function() { 
    if (document.readyState !== "complete") { 
        document.querySelector("body").style.visibility = "hidden"; 
        document.querySelector("#wrapper-loader").style.visibility = "visible"; 
    } else { 
        document.querySelector("#wrapper-loader").style.display = "none"; 
        document.querySelector("body").style.visibility = "visible"; 
    } 
}; 
//GEÇEN SÜRE
const timer = document.getElementById('stopwatch');

var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        if (min == 59 && sec == 59){
            document.getElementById("hint").disabled = true;
            document.getElementById("sendWord").disabled = true;
            document.getElementById("insWord").disabled = true;
            document.getElementById("insWord").value = "Oyun bitti lütfen yeni oyun başlatın";

            document.getElementById("hint").style.cursor = "default";
            document.getElementById("sendWord").style.cursor = "default";
        }
        else{
            sec = sec + 1;
            if (sec == 60) {
                min = min + 1;
                sec = 0;
            }
            
            if (sec < 10 || sec == 0) {
            sec = '0' + sec;
            }
            if (min < 10 || min == 0) {
                min = '0' + min;
            }
            timer.innerHTML = "Geçen süre: " + min + ':' + sec;
            setTimeout("timerCycle()", 1000);
        }
  }
}

function resetTimer() {
    timer.innerHTML = "Geçen süre: " +"00:00";
    stoptime = true;
    sec = 0;
    min = 0;
}
//ENTER TUŞUNA TIKLANDIĞINDA SEND BUTONUNU ÇALIŞTIR
var inputKey = document.getElementById("ListenKey");
inputKey.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("sendWord").click();
    document.getElementById("sendWord").blur();
    }
});
//SPACE TUŞUNA TIKLANDIĞINDA BUTONUNU ÇALIŞTIR
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        document.getElementById("hint").click();
        document.getElementById("hint").blur();
    }
}
//DOSYADA BULUNAN KELİMELERİ LİSTEYE AKTAR
var wordArray = []
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var n = allText.split("\n");
                for(var x in n){   
                    wordArray.push((n[x].trim()));
                }
            }
        }
    }
    rawFile.send(null);
}
readTextFile("allWords.txt");
// BAŞLANGIÇTA REASTGELE KELİME İLE OYUNA BAŞLA
var idCounter = 0;
var lastLetterIdCounter = 0;
function insWorddefaultStyle(){
    document.getElementById('insWord').style.color = "black";
}
var hintCount = 0;
var remainingHintCount = 5;
document.getElementById('help').innerHTML = "İpucu: " + hintCount;
document.getElementById('remainingHintCount').innerHTML = remainingHintCount;
document.getElementById('hint').disabled = false;
document.getElementById("hint").style.cursor = "pointer";
document.getElementById('stopwatch').innerHTML = "Geçen süre: 00:00"
insertedWordListArray = [];
var insertedWordList;
function bodyOnLoad(){
    var randomWordIndexForPageLoad	=	Math.round(Math.random()*(wordArray.length-1));
    var randomWordForPageLoad = wordArray[randomWordIndexForPageLoad];

    idCounter+=1;
    var createSpanElement	=	document.createElement("DIV");	
    createSpanElement.setAttribute("id", idCounter);
    var kelimeOlustur	=	document.createTextNode(randomWordForPageLoad);	
    createSpanElement.appendChild(kelimeOlustur);				
    document.getElementById("insertedWordList").appendChild(createSpanElement);

    insertedWordList = document.getElementById('insertedWordList').innerText.trim();
    var n = insertedWordList.split("\n");
    for(var x in n){   
        insertedWordListArray.push((n[x].trim()));
    }
    document.getElementById('score').innerHTML = "Skor: " + (insertedWordListArray.length-1);
}
//info fadeout timer
// var var_infoTimer;
// function infoTimer() {
//     var_infoTimer = setTimeout(function(){ 
//         $("#info").fadeOut(1000); 
//     }, 3000);
// }
// function stopInfoTimer() {
//     clearTimeout(var_infoTimer);
// }

// GİRİLEN KELİMEYİ ARA
var finded; 
var lastLetter;
var styledWord;

function findWord() {
    if (lastLetterIdCounter != 0){
        document.getElementById('lastLetterIdCounter-'+lastLetterIdCounter).removeAttribute('style');
    }
    if (styledWord != undefined){
        styledWord.style.backgroundColor = "initial";
        styledWord.style.color = "rgb(84, 84, 84)";
    }
    document.getElementById("hint").blur();
    document.getElementById("sendWord").blur();
	finded = document.getElementById('insWord').value
    /* Son kelime ve son karakteri*/
    insertedWordListArray = [];
    insertedWordList = document.getElementById('insertedWordList').innerText.trim();
    var n = insertedWordList.split("\n");
    for(var x in n){   
        insertedWordListArray.push((n[x].trim()));
    }
    var lastWord = insertedWordListArray[insertedWordListArray.length - 1]
    var lastLetter = lastWord[lastWord.length-1]

    var firstLetter = finded[0]
    if (lastLetter == firstLetter){
        function func_listedeara(eleman, sira, referans){
            return eleman == finded;
        }
        var sonuc		=	insertedWordListArray.find(func_listedeara);
        if (sonuc != finded){

            function func_kelimeListesindeAra(eleman, sira, referans){
                return eleman == finded;
            }
            var word		=	wordArray.find(func_kelimeListesindeAra);
            if (finded == word){
                idCounter +=1;
                var createSpanElement	=	document.createElement("DIV");	
                createSpanElement.setAttribute("id", idCounter);
                var kelimeOlustur	=	document.createTextNode(finded);	
                createSpanElement.appendChild(kelimeOlustur);				
                document.getElementById("insertedWordList").appendChild(createSpanElement);

                document.getElementById('insWord').value = "";
                var scrollList = document.getElementById("insertedWordList");
                scrollList.scrollTop = scrollList.scrollHeight;
                // insertedWordList.scrollTo(0,document.querySelector("#insertedWordList").scrollHeight);
                document.getElementById('score').innerHTML = "Skor: " + (insertedWordListArray.length);
                if (stoptime == true){
                    startTimer();
                }
            }
            else {
                // $("#info").stop();
                // $("#info").fadeOut(1); 
                // $("#info").fadeIn(1); 
                document.getElementById('insWord').style.color = "#b1000d";
                // document.getElementById('info').innerHTML = "Böyle bir kelime yok";
                // infoTimer();
            }
        }
        else{
            // $("#info").stop();
            // $("#info").fadeOut(1); 
            // $("#info").fadeIn(1); 
            // document.getElementById('info').innerHTML = "Bu kelime önceden yazıldı";
            
            /* Eğer girilen kelime zaten daha önceden yazıldıysa listede o kelimeyi kırmızı ile göster*/
            var alan		=	document.getElementById("insertedWordList").children;
            for(var baslangic = 0; baslangic<alan.length; baslangic++){
                if (alan[baslangic].innerText == finded){
                    document.getElementById(alan[baslangic].id).scrollIntoView();
                    // document.getElementById(alan[baslangic].id).scrollIntoView({behavior: 'smooth'});
                    alan[baslangic].style.backgroundColor = "#b1000d";
                    alan[baslangic].style.color = "white";
                    styledWord = alan[baslangic];
                }					
            }
            // infoTimer();
        }
    }
    else{
        // $("#info").fadeOut(1); 
        // $("#info").fadeIn(1); 
        // document.getElementById('info').innerHTML = "Kelime son harf ile başlamıyor";
        /* son kelimeye ulaş */
        lastLetterIdCounter +=1;
        var str = document.getElementById("insertedWordList").lastElementChild.innerText; 
        var txt2 = "<span style='background-color:#b1000d; color:white;' id='lastLetterIdCounter-" + lastLetterIdCounter + "'>" + str.slice(-1) + "</span>" ;
        var txt3 = str.slice(0, str.length-1);
        document.getElementById("insertedWordList").lastElementChild.innerHTML = txt3 + txt2;
        // infoTimer();
        var scrollList = document.getElementById("insertedWordList");
        scrollList.scrollTop = scrollList.scrollHeight;
    }
}
// BUTONLARIN GENİŞLİĞİNİ EN UZUN OLANA GÖRE AYARLA
    buttonLengths = []
    var buttonCount	=	document.querySelector(".buttons").childElementCount;
    for (i = 0; i < buttonCount; i++) {
        buttonLengths.push(document.querySelector(".buttons").children[i].offsetWidth);
    }
    maxButtonLenght = Math.max.apply(Math, buttonLengths);
    var sonuc = document.getElementsByClassName("button");
    for (i = 0; i < buttonCount; i++) {
        sonuc[i].style.width = maxButtonLenght + "px";	
    }
// YENİDEN BAŞLAT
function resetGame(){
    idCounter = 0;
    document.getElementById("hint").disabled = false;
    document.getElementById("sendWord").disabled = false;
    document.getElementById("insWord").disabled = false;
    document.getElementById("hint").style.cursor = "pointer";
    document.getElementById("sendWord").style.cursor = "pointer";

    document.getElementById("reset").blur();
    resetTimer();
    insertedWordListArray = [];
    insertedWordList = "";
    document.getElementById('insertedWordList').innerHTML = "";
    document.getElementById('insWord').value = "";
    bodyOnLoad();
    hintCount = 0;
    remainingHintCount = 5;
    document.getElementById('help').innerHTML = "İpucu: " + hintCount;
    document.getElementById('remainingHintCount').innerHTML = remainingHintCount;
    document.getElementById('hint').disabled = false;
    document.getElementById("hint").style.cursor = "pointer";
}


// İPUCU BUTONU
function hint(){
    document.getElementById("hint").blur();
    document.getElementById("sendWord").blur();
    /* son kelime ve karakteri */
    insertedWordListArray = [];
    insertedWordList = document.getElementById('insertedWordList').innerText.trim();
    var n = insertedWordList.split("\n");
    for(var x in n){   
        insertedWordListArray.push((n[x].trim()));
    }
    var lastWord = insertedWordListArray[insertedWordListArray.length - 1];
    var lastLetter = lastWord[lastWord.length-1];
    /* listeye girilen karakterlerin olmadığı yeni bir liste çıkart ve son karakterle başlayan kelimelerin bulunduğu listeden rastgele kelime seç ardından inputta kelimeyi  göster*/
    var withoutInsertedWord = [];
    var isEqual = false;
    for (var i = 0; i < wordArray.length; i++){
        for (var j = 0; j < insertedWordListArray.length; j++){
            if (wordArray[i] == insertedWordListArray[j]){
                isEqual = true;
            }
            else{
                if (!isEqual){
                    isEqual = false;
                }
            }
        }
        if (!isEqual){
                withoutInsertedWord.push(wordArray[i]);
        }
        var isEqual = false;
    }

    var firstLetter = lastLetter;
    var startWithFirstLetterList = [];
    for(var x in withoutInsertedWord){ 
        var perArrayItem = withoutInsertedWord[x].trim();
        var isStartingWithFirstLetter = perArrayItem.startsWith(firstLetter);
        if (isStartingWithFirstLetter == true){
            startWithFirstLetterList.push(perArrayItem);
        }
    }
    if (startWithFirstLetterList.length == 0){
        // $("#info").fadeOut(1); 
        // $("#info").fadeIn(1); 
        document.getElementById('info').innerHTML = "\"" + lastLetter + "\"" + " İLE BAŞLAYAN KELİME KALMADI";
        // infoTimer();
    }
    else{
        if (hintCount >= 5){
            document.getElementById('hint').disabled = true;
            document.getElementById("hint").style.cursor = "default";
            document.getElementById('help').innerHTML = "İpucu: " + hintCount;
            document.getElementById('remainingHintCount').innerHTML = remainingHintCount;

        }
        else{
            hintCount +=1;
            remainingHintCount -=1;
            document.getElementById('help').innerHTML = "İpucu: " + hintCount;
            document.getElementById('remainingHintCount').innerHTML = remainingHintCount;
            var randomWordStartingWithFirstLetter = startWithFirstLetterList[Math.floor(Math.random() * startWithFirstLetterList.length)];
            document.getElementById('insWord').value = randomWordStartingWithFirstLetter;
            if (hintCount >= 5){
                document.getElementById('hint').disabled = true;
                document.getElementById("hint").style.cursor = "default";
                document.getElementById('help').innerHTML = "İpucu: " + hintCount;
                document.getElementById('remainingHintCount').innerHTML = remainingHintCount;
            }
        }
    }
}


// Nasıl oynanır?
if (document.getElementById('slideIcon').innerText == "arrow_drop_up"){
    $("#howToPlay").slideDown(1);
}
else{
    $("#howToPlay").slideUp(1);
}


if($("#howToPlay").is(":hidden"))
{
    document.getElementById('slideIcon').innerText = "arrow_drop_down";
}
else{
    document.getElementById('slideIcon').innerText = "arrow_drop_up";
}
  

$("#rightSideTitle").click(function(){
    if($("#howToPlay").is(":hidden"))
    {
        document.getElementById('slideIcon').innerText = "arrow_drop_up";
        $("#howToPlay").slideDown("fast");
    }
    else{
        document.getElementById('slideIcon').innerText = "arrow_drop_down";
        $("#howToPlay").slideUp("fast");
    }
});