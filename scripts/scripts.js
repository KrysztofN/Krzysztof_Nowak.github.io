$(document).ready(function() {
    const canvas = document.getElementById('matrixCanvas');
    const context = canvas.getContext('2d');
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    
    const fontSize = 20;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array of drops, one per column
    const drops = new Array(columns).fill(1);
    
    function draw() {
        context.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        context.fillStyle = '#0F0';
        context.font = `${fontSize}px monospace`;
    
        for (let i = 0; i < drops.length; i++) {
            const text = Math.random() > 0.5 ? '1' : '0';
            context.fillText(text, i * fontSize, drops[i] * fontSize);
    
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', () => {
        setCanvasSize();
        const newColumns = Math.floor(canvas.width / fontSize);
        drops.length = newColumns;
        for (let i = 0; i < newColumns; i++) {
            drops[i] = drops[i] || 1;
        }
    });
    
    
    // Transition to description page
    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("content").style.display = "none";
            document.getElementById("matrixCanvas").style.display = "none";
            document.getElementById("description").style.display = "inline-block";
            // Set canvas size again to ensure it covers the entire window
            setCanvasSize();
        }
    });
});
