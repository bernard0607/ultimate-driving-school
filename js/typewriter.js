document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect function
    class TypeWriter {
        constructor(element, options = {}) {
            this.element = element;
            this.text = this.element.getAttribute('data-text') || '';
            this.speed = options.speed || 100; // Default typing speed in ms
            this.delay = options.delay || 1000; // Delay before starting
            this.loop = options.loop !== undefined ? options.loop : true; // Loop by default
            this.cursor = options.cursor !== undefined ? options.cursor : true; // Show cursor by default
            
            this.init();
        }
        
        init() {
            this.element.textContent = ''; // Clear the element
            this.cursor && this.addCursor();
            
            // Start typing after delay
            setTimeout(() => {
                this.type();
            }, this.delay);
        }
        
        type() {
            let i = 0;
            const text = this.text;
            const speed = this.speed;
            const element = this.element;
            
            function typeWriter() {
                if (i < text.length) {
                    element.textContent = text.substring(0, i + 1);
                    i++;
                    setTimeout(typeWriter, speed);
                } else if (this.loop) {
                    // If loop is enabled, start over after a delay
                    setTimeout(() => {
                        this.delete();
                    }, 2000); // Wait 2 seconds before deleting
                }
            }
            
            // Bind the callback to maintain 'this' context
            typeWriter = typeWriter.bind(this);
            typeWriter();
        }
        
        delete() {
            let text = this.element.textContent;
            const speed = this.speed / 2; // Delete faster than typing
            const element = this.element;
            
            function deleteChar() {
                if (text.length > 0) {
                    text = text.substring(0, text.length - 1);
                    element.textContent = text;
                    setTimeout(deleteChar, speed);
                } else {
                    // Start typing again after deletion
                    this.type();
                }
            }
            
            // Bind the callback to maintain 'this' context
            deleteChar = deleteChar.bind(this);
            deleteChar();
        }
        
        addCursor() {
            const cursor = document.createElement('span');
            cursor.className = 'typewriter-cursor';
            cursor.textContent = '|';
            this.element.parentNode.insertBefore(cursor, this.element.nextSibling);
        }
    }
    
    // Initialize typewriter effect on all elements with class 'typewriter'
    document.querySelectorAll('.typewriter').forEach(element => {
        new TypeWriter(element, {
            speed: 100,    // Typing speed in ms
            delay: 500,    // Delay before starting
            loop: true,    // Loop the animation
            cursor: true   // Show cursor
        });
    });
});
