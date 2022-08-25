$(document).ready(function () {

    var beforeScramble = $(".scramble").html();

    function blindOverlay(s) {
        if(s == "on") {
            let styles = {
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 10000,
                width: "100vw", 
                height: "100vh",
                backgroundColor: "#000",
            };
            const blackOverlay = $("<div class='blackOverlay'></div>").css(styles);
            $("body").prepend(blackOverlay);
        }
        if(s == "off") {
            $(".blackOverlay").remove();
        }
    }

    function cataractsOverlay(s) {
        if(s == "on") {
            $("body").children().css("filter", "blur(3px)");
        }
        if(s == "off") {
            $("body").children().css("filter", "none");
        }
    }

    function tunnelVisionOverlay(s) {
        if(s == "on") {
            let styles = {
                display: "block",
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: 10000,
                width: "100%",
                height: "100%",
                background: "#000"
            }
            
            $("body").css("position", "relative");
            $(".mouseCutout").css(styles);
            
            $(document).mousemove(function(e) {
    
                let X = e.pageX;
                let Y = e.pageY;
    
                $('.mouseCutout').css("background", "radial-gradient(circle at " + X + "px " + Y + "px, transparent, #000 5%)");
    
            });
        }

        if(s == "off") {
            let styles = {
                display: "none"
            }
            $(".mouseCutout").css(styles);
        }
    }

    function dyslexiaOverlay(s, beforeScramble = null) {

        myInterval = 80;

        if(s == "on") {
            var getTextNodesIn=function(el){
                return jQuery(el).find(":not(iframe,script)").addBack().contents().filter(function() {
                    return this.nodeType == 3
                })
            };
            
            var textNodes = getTextNodesIn(jQuery(".scramble"));
            var myInterval;
            
            function isLetter(char) {
                return/^[\d]$/.test(char)
            }
            
            var wordsInTextNodes=[];
            
            function getText(){
                for(var i=0; i<textNodes.length; i++) {
                    var node=textNodes[i];
                    var words=[]
                    var re=/\w+/g;
                    var match;
                    
                    while((match=re.exec(node.nodeValue))!=null) {
                        var word=match[0];
                        var position=match.index;words.push({
                            length:word.length,position:position
                        })
                    }
                    wordsInTextNodes[i]=words
                }
            }
            
            function messUpWords(){
                for(var i=0; i<textNodes.length; i++) {
                    var node=textNodes[i];
                    for(var j=0; j<wordsInTextNodes[i].length; j++){ 
                        if(Math.random()>1/10) {
                            continue
                        }
            
                        var wordMeta=wordsInTextNodes[i][j];
                        var word=node.nodeValue.slice(wordMeta.position,wordMeta.position+wordMeta.length);
                        var before=node.nodeValue.slice(0,wordMeta.position);
                        var after=node.nodeValue.slice(wordMeta.position+wordMeta.length);node.nodeValue=before+messUpWord(word)+after
                    }
                }
            }
            
            function messUpWord(word) {
                if(word.length<3) { 
                    return word
                }
                return word[0]+messUpMessyPart(word.slice(1,-1))+word[word.length-1]
            }
            
            function messUpMessyPart(messyPart){
                if(messyPart.length<2){
                    return messyPart
                }
            
                var a,b;
                while(!(a<b)) { 
                    a=getRandomInt(0,messyPart.length-1);
                    b=getRandomInt(0,messyPart.length-1)
                }
                return messyPart.slice(0,a)+messyPart[b]+messyPart.slice(a+1,b)+messyPart[a]+messyPart.slice(b+1)
            }
            
            function getRandomInt(min,max){
                return Math.floor(Math.random()*(max-min+1)+min)
            }
            
            function createInterval(i){ 
                myInterval = setInterval(function() { 
                    messUpWords()
                }, i)
            }
            
            getText();

            createInterval(myInterval);

        }

        if(s == "off") {
            clearInterval(myInterval);
            $('.scramble').html(beforeScramble);
        }


    }

    function motorOverlay(s) {
        if(s == "on") {
            let mouseStyles = {
                display: "block",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: 1000000000,
                width: 0, 
                height: 0, 
                borderLeft: "6px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: "18px solid black",
                transition: "0.1s",
                transform: "rotate(-18deg)"
            }
    
            $("body").css("position", "relative");
            $("body").css({'cursor' : 'none'});
            $(".mouseProxy").css(mouseStyles);
    
            $(document).mousemove(function(e) {
    
                let random_X = e.pageX + Math.floor(Math.random()*200+1);
                let random_Y = e.pageY + Math.floor(Math.random()*200+1);
    
                $('.mouseProxy').css({
                    left:  random_X,
                    top:   random_Y
                 });
    
            });

        } 

        if(s == "off") {
            let mouseStyles = {
                display: "none"
            }

            $("body").css({'cursor' : 'initial'});
            $(".mouseProxy").css(mouseStyles);
        }


    }
    

    // blindOverlay();
    // cataractsOverlay();
    // tunnelVisionOverlay();
    // dyslexiaOverlay();
    // motorOverlay();

    $(".blindToggle").click(function (e) { 
        e.preventDefault();
        $(this).toggleClass("on");
        if( $(this).hasClass("on") ) {
            blindOverlay("on");
        } else {
            blindOverlay("off");
        }
    });
    
    $(".cataractsToggle").click(function (e) { 
        e.preventDefault();
        $(this).toggleClass("on");
        if( $(this).hasClass("on") ) {
            cataractsOverlay("on");
        } else {
            cataractsOverlay("off");
        }
    });
    
    $(".tunnelVisionToggle").click(function (e) { 
        e.preventDefault();
        $(this).toggleClass("on");
        if( $(this).hasClass("on") ) {
            tunnelVisionOverlay("on");
        } else {
            tunnelVisionOverlay("off");
        }
    });
    
    $(".dyslexiaToggle").click(function (e) { 
        e.preventDefault();
        
        $(this).toggleClass("on");
        if( $(this).hasClass("on") ) {
            dyslexiaOverlay("on");
        } else {
            dyslexiaOverlay("off", beforeScramble);
        }
    });
    
    $(".motorToggle").click(function (e) { 
        e.preventDefault();
        $(this).toggleClass("on");
        if( $(this).hasClass("on") ) {
            motorOverlay("on");
        } else {
            motorOverlay("off");
        }
    });
});