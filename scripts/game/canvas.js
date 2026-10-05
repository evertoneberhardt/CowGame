import { Globals } from "./globals.js";

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
/* 640 x 360  960 x 540*/
export let width = 960; 
export let height = 540;
// export let width = 640; 
// export let height = 360;
export let scale = 1;
export const center = { x: width / 2, y: height / 2 };

ctx.imageSmoothingEnabled = false;

export function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
    center.x = width / 2;
    center.y = height / 2;
    ctx.imageSmoothingEnabled = false;
    // ctx.scale(scale, scale);
}

export function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        Globals.scale = 1.5;
    }
    resizeCanvas(width, height);
}

export function toggleFullScreen() { 
    if (document.fullscreenElement) {
        document.exitFullscreen();
        resizeCanvas(width, height);
    } else {
        Globals.scale = 2;
        if (canvas.requestFullscreen) { canvas.requestFullscreen(); }
        else if (canvas.mozRequestFullscreen) { canvas.mozRequestFullscreen(); }
        else if (canvas.webkitRequestFullscreen) { canvas.webkitRequestFullscreen(); }
        else if (canvas.msRequestFullscreen) { canvas.msRequestFullscreen(); }

        resizeCanvas(screen.width, screen.height);
    }

}

// export { canvas, ctx, scale, width, height, resizeCanvas, exitFullscreen, toggleFullScreen }