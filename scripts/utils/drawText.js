import { canvas, ctx } from "../game/canvas.js";
class DrawText {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx    = ctx;
        this.fontImage = document.getElementById("sprite-sheet");
        this.keyShadow = ["noShadow", "greyShadow", "darkShadow"];

        this.font   = {
            width   : 6,
            height  : 6,
            // UpperCase
            'A':{ noShadow:{ x:318, y:104 }, greyShadow:{ x:396, y:104}, darkShadow:{ x:474, y:104 } },
            'B':{ noShadow:{ x:324, y:104 }, greyShadow:{ x:402, y:104}, darkShadow:{ x:480, y:104 } },
            'C':{ noShadow:{ x:330, y:104 }, greyShadow:{ x:408, y:104}, darkShadow:{ x:486, y:104 } },
            'D':{ noShadow:{ x:336, y:104 }, greyShadow:{ x:414, y:104}, darkShadow:{ x:492, y:104 } },
            'E':{ noShadow:{ x:342, y:104 }, greyShadow:{ x:420, y:104}, darkShadow:{ x:498, y:104 } },
            'F':{ noShadow:{ x:348, y:104 }, greyShadow:{ x:426, y:104}, darkShadow:{ x:504, y:104 } },
            'G':{ noShadow:{ x:354, y:104 }, greyShadow:{ x:432, y:104}, darkShadow:{ x:510, y:104 } },
            'H':{ noShadow:{ x:360, y:104 }, greyShadow:{ x:438, y:104}, darkShadow:{ x:516, y:104 } },
            'I':{ noShadow:{ x:366, y:104 }, greyShadow:{ x:444, y:104}, darkShadow:{ x:522, y:104 } },
            'J':{ noShadow:{ x:372, y:104 }, greyShadow:{ x:450, y:104}, darkShadow:{ x:528, y:104 } },
            'K':{ noShadow:{ x:378, y:104 }, greyShadow:{ x:456, y:104}, darkShadow:{ x:534, y:104 } },
            'L':{ noShadow:{ x:384, y:104 }, greyShadow:{ x:462, y:104}, darkShadow:{ x:540, y:104 } },
            'M':{ noShadow:{ x:390, y:104 }, greyShadow:{ x:468, y:104}, darkShadow:{ x:546, y:104 } },
            'N':{ noShadow:{ x:318, y:110 }, greyShadow:{ x:396, y:110}, darkShadow:{ x:474, y:110 } },
            'O':{ noShadow:{ x:324, y:110 }, greyShadow:{ x:402, y:110}, darkShadow:{ x:480, y:110 } },
            'P':{ noShadow:{ x:330, y:110 }, greyShadow:{ x:408, y:110}, darkShadow:{ x:486, y:110 } },
            'Q':{ noShadow:{ x:336, y:110 }, greyShadow:{ x:414, y:110}, darkShadow:{ x:492, y:110 } },
            'R':{ noShadow:{ x:342, y:110 }, greyShadow:{ x:420, y:110}, darkShadow:{ x:498, y:110 } },
            'S':{ noShadow:{ x:348, y:110 }, greyShadow:{ x:426, y:110}, darkShadow:{ x:504, y:110 } },
            'T':{ noShadow:{ x:354, y:110 }, greyShadow:{ x:432, y:110}, darkShadow:{ x:510, y:110 } },
            'U':{ noShadow:{ x:360, y:110 }, greyShadow:{ x:438, y:110}, darkShadow:{ x:516, y:110 } },
            'V':{ noShadow:{ x:366, y:110 }, greyShadow:{ x:444, y:110}, darkShadow:{ x:522, y:110 } },
            'W':{ noShadow:{ x:372, y:110 }, greyShadow:{ x:450, y:110}, darkShadow:{ x:528, y:110 } },
            'X':{ noShadow:{ x:378, y:110 }, greyShadow:{ x:456, y:110}, darkShadow:{ x:534, y:110 } },
            'Y':{ noShadow:{ x:384, y:110 }, greyShadow:{ x:462, y:110}, darkShadow:{ x:540, y:110 } },
            'Z':{ noShadow:{ x:390, y:110 }, greyShadow:{ x:468, y:110}, darkShadow:{ x:546, y:110 } },
            // LowerCase
            'a':{ noShadow:{ x:318, y:116 }, greyShadow:{ x:396, y:116 }, darkShadow:{x:474, y:116 } },
            'b':{ noShadow:{ x:324, y:116 }, greyShadow:{ x:402, y:116 }, darkShadow:{x:480, y:116 } },
            'c':{ noShadow:{ x:330, y:116 }, greyShadow:{ x:408, y:116 }, darkShadow:{x:486, y:116 } },
            'd':{ noShadow:{ x:336, y:116 }, greyShadow:{ x:414, y:116 }, darkShadow:{x:492, y:116 } },
            'e':{ noShadow:{ x:342, y:116 }, greyShadow:{ x:420, y:116 }, darkShadow:{x:498, y:116 } },
            'f':{ noShadow:{ x:348, y:116 }, greyShadow:{ x:426, y:116 }, darkShadow:{x:504, y:116 } },
            'g':{ noShadow:{ x:354, y:116 }, greyShadow:{ x:432, y:116 }, darkShadow:{x:510, y:116 } },
            'h':{ noShadow:{ x:360, y:116 }, greyShadow:{ x:438, y:116 }, darkShadow:{x:516, y:116 } },
            'i':{ noShadow:{ x:366, y:116 }, greyShadow:{ x:444, y:116 }, darkShadow:{x:522, y:116 } },
            'j':{ noShadow:{ x:372, y:116 }, greyShadow:{ x:450, y:116 }, darkShadow:{x:528, y:116 } },
            'k':{ noShadow:{ x:378, y:116 }, greyShadow:{ x:456, y:116 }, darkShadow:{x:534, y:116 } },
            'l':{ noShadow:{ x:384, y:116 }, greyShadow:{ x:462, y:116 }, darkShadow:{x:540, y:116 } },
            'm':{ noShadow:{ x:390, y:116 }, greyShadow:{ x:468, y:116 }, darkShadow:{x:546, y:116 } },
            'n':{ noShadow:{ x:318, y:122 }, greyShadow:{ x:396, y:122 }, darkShadow:{x:474, y:122 } },
            'o':{ noShadow:{ x:324, y:122 }, greyShadow:{ x:402, y:122 }, darkShadow:{x:480, y:122 } },
            'p':{ noShadow:{ x:330, y:122 }, greyShadow:{ x:408, y:122 }, darkShadow:{x:486, y:122 } },
            'q':{ noShadow:{ x:336, y:122 }, greyShadow:{ x:414, y:122 }, darkShadow:{x:492, y:122 } },
            'r':{ noShadow:{ x:342, y:122 }, greyShadow:{ x:420, y:122 }, darkShadow:{x:498, y:122 } },
            's':{ noShadow:{ x:348, y:122 }, greyShadow:{ x:426, y:122 }, darkShadow:{x:504, y:122 } },
            't':{ noShadow:{ x:354, y:122 }, greyShadow:{ x:432, y:122 }, darkShadow:{x:510, y:122 } },
            'u':{ noShadow:{ x:360, y:122 }, greyShadow:{ x:438, y:122 }, darkShadow:{x:516, y:122 } },
            'v':{ noShadow:{ x:366, y:122 }, greyShadow:{ x:444, y:122 }, darkShadow:{x:522, y:122 } },
            'w':{ noShadow:{ x:372, y:122 }, greyShadow:{ x:450, y:122 }, darkShadow:{x:528, y:122 } },
            'x':{ noShadow:{ x:378, y:122 }, greyShadow:{ x:456, y:122 }, darkShadow:{x:534, y:122 } },
            'y':{ noShadow:{ x:384, y:122 }, greyShadow:{ x:462, y:122 }, darkShadow:{x:540, y:122 } },
            'z':{ noShadow:{ x:390, y:122 }, greyShadow:{ x:468, y:122 }, darkShadow:{x:546, y:122 } },
            // Numbers
            '0':{ noShadow:{ x:318, y:128 }, greyShadow:{x:396, y:128 }, darkShadow:{x:474, y:128 } },
            '1':{ noShadow:{ x:324, y:128 }, greyShadow:{x:402, y:128 }, darkShadow:{x:480, y:128 } },
            '2':{ noShadow:{ x:330, y:128 }, greyShadow:{x:408, y:128 }, darkShadow:{x:486, y:128 } },
            '3':{ noShadow:{ x:336, y:128 }, greyShadow:{x:414, y:128 }, darkShadow:{x:492, y:128 } },
            '4':{ noShadow:{ x:342, y:128 }, greyShadow:{x:420, y:128 }, darkShadow:{x:498, y:128 } },
            '5':{ noShadow:{ x:348, y:128 }, greyShadow:{x:426, y:128 }, darkShadow:{x:504, y:128 } },
            '6':{ noShadow:{ x:354, y:128 }, greyShadow:{x:432, y:128 }, darkShadow:{x:510, y:128 } },
            '7':{ noShadow:{ x:360, y:128 }, greyShadow:{x:438, y:128 }, darkShadow:{x:516, y:128 } },
            '8':{ noShadow:{ x:366, y:128 }, greyShadow:{x:444, y:128 }, darkShadow:{x:522, y:128 } },
            '9':{ noShadow:{ x:372, y:128 }, greyShadow:{x:450, y:128 }, darkShadow:{x:528, y:128 } },
            '+':{ noShadow:{ x:378, y:128 }, greyShadow:{x:456, y:128 }, darkShadow:{x:534, y:128 } },
            '-':{ noShadow:{ x:384, y:128 }, greyShadow:{x:462, y:128 }, darkShadow:{x:540, y:128 } },
            '=':{ noShadow:{ x:390, y:128 }, greyShadow:{x:468, y:128 }, darkShadow:{x:546, y:128 } },
            '(':{ noShadow:{ x:318, y:134 }, greyShadow:{x:396, y:134 }, darkShadow:{x:474, y:134 } },
            ')':{ noShadow:{ x:324, y:134 }, greyShadow:{x:402, y:134 }, darkShadow:{x:480, y:134 } },
            '[':{ noShadow:{ x:330, y:134 }, greyShadow:{x:408, y:134 }, darkShadow:{x:486, y:134 } },
            ']':{ noShadow:{ x:336, y:134 }, greyShadow:{x:414, y:134 }, darkShadow:{x:492, y:134 } },
            '{':{ noShadow:{ x:342, y:134 }, greyShadow:{x:420, y:134 }, darkShadow:{x:498, y:134 } },
            '}':{ noShadow:{ x:348, y:134 }, greyShadow:{x:426, y:134 }, darkShadow:{x:504, y:134 } },
            '<':{ noShadow:{ x:354, y:134 }, greyShadow:{x:432, y:134 }, darkShadow:{x:510, y:134 } },
            '>':{ noShadow:{ x:360, y:134 }, greyShadow:{x:438, y:134 }, darkShadow:{x:516, y:134 } },
            '/':{ noShadow:{ x:366, y:134 }, greyShadow:{x:444, y:134 }, darkShadow:{x:522, y:134 } },
            '*':{ noShadow:{ x:372, y:134 }, greyShadow:{x:450, y:134 }, darkShadow:{x:528, y:134 } },
            ':':{ noShadow:{ x:378, y:134 }, greyShadow:{x:456, y:134 }, darkShadow:{x:534, y:134 } },
            '#':{ noShadow:{ x:384, y:134 }, greyShadow:{x:462, y:134 }, darkShadow:{x:540, y:134 } },
            '%':{ noShadow:{ x:390, y:134 }, greyShadow:{x:468, y:134 }, darkShadow:{x:546, y:134 } },
            '!':{ noShadow:{ x:318, y:140 }, greyShadow:{x:396, y:140 }, darkShadow:{x:474, y:140 } },
            '?':{ noShadow:{ x:324, y:140 }, greyShadow:{x:402, y:140 }, darkShadow:{x:480, y:140 } },
            '.':{ noShadow:{ x:330, y:140 }, greyShadow:{x:408, y:140 }, darkShadow:{x:486, y:140 } },
            ';':{ noShadow:{ x:336, y:140 }, greyShadow:{x:414, y:140 }, darkShadow:{x:492, y:140 } },
            "'":{ noShadow:{ x:342, y:140 }, greyShadow:{x:420, y:140 }, darkShadow:{x:498, y:140 } },
            '"':{ noShadow:{ x:348, y:140 }, greyShadow:{x:426, y:140 }, darkShadow:{x:504, y:140 } },
            '@':{ noShadow:{ x:354, y:140 }, greyShadow:{x:432, y:140 }, darkShadow:{x:510, y:140 } },
            '&':{ noShadow:{ x:360, y:140 }, greyShadow:{x:438, y:140 }, darkShadow:{x:516, y:140 } },
            '$':{ noShadow:{ x:366, y:140 }, greyShadow:{x:444, y:140 }, darkShadow:{x:522, y:140 } },
            ' ':{ noShadow:{ x:372, y:140 }, greyShadow:{x:450, y:140 }, darkShadow:{x:528, y:140 } }
            
        }

    }


    drawText(x, y, text, shadow) {
        x = x - this.font.width;
        x = x - ( ( this.font.width * text.length ) / 2 );

        if(!this.keyShadow.includes(shadow) || !shadow){
            shadow = this.keyShadow[0];
        }

        for (let letter of text) {
            this.ctx.save();
            this.ctx.drawImage(
                this.fontImage,
                this.font[letter][shadow].x,
                this.font[letter][shadow].y,
                this.font.width,
                this.font.height,
                x += this.font.width,
                y,
                this.font.width,
                this.font.height
            );
            this.ctx.restore();
        }
        
    }

}

const drawText = new DrawText(canvas, ctx);

export { DrawText, drawText }