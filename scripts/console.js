$(document).ready(function() {


    // Detected terminal words
    var span = $("#span");
    span.html(span.html().replace(/adnan/, '<span style="color: #3498db; font-weight: bold;">$&</span>'));
    span.html(span.html().replace(/~/, '<span style="color: #2ecc71; font-weight: bold;">$&</span>'));

    var span1 = $("#span1");
    span1.html(span1.html().replace(/Krzysztof Nowak/, '<span style="color: #e74c3c; font-weight: bold;">$&</span>'));

    // Controllers
    $("button.close").click(function() {
        $(".window").hide();
        $(".afterclose").fadeIn("fast");
    });

    $("button.open").click(function() {
        $(".window").show();
        $(".afterclose").hide();
    });

    $("button.maximize").click(function() {
        $(".window").toggleClass("windowmax");
        $(".bash").toggleClass("bashmax");
    });

    $("button.minimize").click(function() {
        $(".window").toggleClass("windowmin");
        $(".bash").toggleClass("bashmin");
    });

    // sleep function 
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // typing effect
    function typingEffect(text, elementid, sleeptime) {
        return new Promise(resolve => {
            setTimeout(function() {
                let i = 0;
                let speed = 50;
    
                function typeWriter() {
                    if (i < text.length) {
                        document.getElementById(elementid).innerHTML += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                    } else {
                        resolve(); // Resolve the promise when typing is complete
                    }
                }
    
                typeWriter();
            }, sleeptime);
        });
    }

    function enableTyping() {
        $("#getResume").attr("contenteditable", "true");
        $("#getResume").focus();
    }
    
    (async function() {
        let sleeptime = 1000;
        let text = "sudo --get-info";
    
        await typingEffect(text, "showInfo", sleeptime);
        await sleep(250);
        $(".result").show();
        $("#spanQ").css("display", "inline-block");

        $("#availableCommands").show();

        $("#spanQ").css("display", "inline-block");
        enableTyping();
        document.addEventListener('keydown', async function(event){
            if(event.key === 'Enter'){
                const command = document.getElementById('getResume').innerHTML;
                
                switch(command) {
                    case 'sudo --get-Resume':
                        const link = document.createElement('a');
                        link.href = 'assets/resume.pdf'; 
                        link.setAttribute('download', '');
                        link.download = 'Krzysztof_Nowak_Resume.pdf'; 
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        break;

                    case 'sudo --show-socials':
                        $("#socialLinks").show();
                        break;

                    case 'sudo --help':
                        $("#availableCommands").show();
                        break;

                    default:
                        $("#commandError").html(`Command not found: ${command}`);
                        $("#commandError").show();
                        await sleep(2000);
                        $("#commandError").hide();
                }

                document.getElementById('getResume').innerHTML = '';
                enableTyping();
            }
        })
    
    })();
    

});
