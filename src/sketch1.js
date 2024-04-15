let video;
let capturedImage;

function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent('lienzo');
    
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
}

function draw() {
    background(255);
    if (capturedImage) {
        image(capturedImage, 0, 0, width, height);
    } else {
        image(video, 0, 0, width, height);
    }
    video.loadPixels();
    video.updatePixels();
}

function keyPressed() {
    if (key === 'l' || key === 'L') {
        captureAndApplyNegativeFilter();
    } else if (key === 'a' || key === 'A') {
        applyPosterizationFilter(6);
    }
    
    else {
        // Restaura la vista en vivo cuando se presiona cualquier tecla que no sea 'L'
        restoreLiveView();
    }
}

function captureAndApplyNegativeFilter() {
    // Captura la imagen de la webcam
    capturedImage = createImage(width, height);
    capturedImage.copy(video, 0, 0, video.width, video.height, 0, 0, capturedImage.width, capturedImage.height);
    
    // Aplica el filtro negativo a la imagen capturada
    capturedImage.loadPixels();
    for (let i = 0; i < capturedImage.pixels.length; i += 4) {
        capturedImage.pixels[i] = 255 - capturedImage.pixels[i]; // R
        capturedImage.pixels[i + 1] = 255 - capturedImage.pixels[i + 1]; // G
        capturedImage.pixels[i + 2] = 255 - capturedImage.pixels[i + 2]; // B
    }
    capturedImage.updatePixels();
}

function applyPosterizationFilter(level) {
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    
      // Aplica la posterización a cada canal de color
      r = round(r / 255 * level) * floor(255 / level);
      g = round(g / 255 * level) * floor(255 / level);
      b = round(b / 255 * level) * floor(255 / level);

    pixels[i] = r;
    pixels[i + 1] = g;
    pixels[i + 2] = b;
    }
    updatePixels();
}


function restoreLiveView() {
    capturedImage = null;
}
