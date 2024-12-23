$(document).ready(function() {
    var span = $("#span");
    span.html(span.html().replace(/adnan/, '<span style="color: #3498db; font-weight: bold;">$&</span>'));
    span.html(span.html().replace(/~/, '<span style="color: #2ecc71; font-weight: bold;">$&</span>'));

    var span = $("#spanQ");
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
    function typingEffect(text, elementId, sleeptime) {
        return new Promise(resolve => {
            setTimeout(function() {
                let i = 0;
                let speed = 50;
    
                function typeWriter() {
                    if (i < text.length) {
                        document.getElementById(elementId).textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                    } else {
                        resolve();
                    }
                }
    
                typeWriter();
            }, sleeptime);
        });
    }

    function enableTyping() {
        const inputElement = $("#getResume");
        
        inputElement.css({
            'outline': 'none',  
            'padding': '2px',
            '-webkit-user-select': 'text',  
            'user-select': 'text'
        });
        inputElement.on('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleCommand(this.textContent.trim());
                return false;
            }
        });

        inputElement.on('paste', function(e) {
            e.preventDefault();
            const text = (e.originalEvent.clipboardData || window.clipboardData).getData('text');
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text.replace(/[\r\n]/g, '')));
            selection.collapseToEnd();
        });

        inputElement.on('drop', function(e) {
            e.preventDefault();
            return false;
        });

        inputElement.attr("contenteditable", "true");
        inputElement.focus();
    }
    
    async function handleCommand(command) {
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
                $(".result, #availableCommands, #socialLinks, #spanQ, #getResume").hide();
                $("#socialLinks").show();
                
                $(document).one('keydown', function(e) {
                    if (e.key === 'Enter') {
                        $("#socialLinks").hide();
                        $(".result, #availableCommands, #spanQ, #getResume").show();
                        enableTyping();
                    }
                });
                break;

            case 'sudo --help':
                $("#availableCommands").show();
                break;
            
            case 'sudo --whoami':
                $(".result, #availableCommands, #socialLinks, #spanQ, #getResume").hide();
                $("#whoamiSection").show();
                
                $(document).one('keydown', function(e) {
                    if (e.key === 'Enter') {
                        $("#whoamiSection").hide();
                        $(".result, #availableCommands, #spanQ, #getResume").show();
                        enableTyping();
                    }
                });
                break;

            case 'sudo --awards':
                $(".result, #availableCommands, #socialLinks, #spanQ, #getResume").hide();
                $("#awardsSection").show();
                
                $(document).one('keydown', function(e) {
                    if (e.key === 'Enter') {
                        $("#awardsSection").hide();
                        $(".result, #availableCommands, #spanQ, #getResume").show();
                        enableTyping();
                    }
                });
                break;

            case 'cls':
                $("#whoamiSection, #awardsSection, #socialLinks, #availableCommands").hide();
                break;

            default:
                $("#commandError").html(`Command not found: ${command}`);
                $("#commandError").show();
                await sleep(2000);
                $("#commandError").hide();
        }

        const inputElement = $("#getResume");
        inputElement.text('');
        inputElement.focus();
        
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(inputElement[0]);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    
    (async function() {
        let sleeptime = 1000;
        let text = "sudo --get-info";
    
        await typingEffect(text, "showInfo", sleeptime);
        await sleep(500);
        $(".result").show();
        $("#spanQ").css("display", "inline-block");
        $("#availableCommands").show();
        $("#spanQ").css("display", "inline-block");
        enableTyping();
        $("#showInfo").hide();
        $("#span").hide();
    })();
});