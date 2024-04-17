let video;
let imatgeCapturada;
let negativeFilter = false;
let dilateImage = false;
let posterizeImage = false;
let binariImage = false;
let combinedEffects = false;

function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent("lienzo");

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
}

function draw() {
    background(255);
    if (negativeFilter) {
        image(negativeImage(video), 0, 0, width, height);
    } else if(dilateImage) {
        image(applyDilation(video), 0, 0, width, height);
    } else if(posterizeImage){
        image(applyPosterize(video), 0, 0, width, height);
    } else if(binariImage){
        image(applyBinarization(video), 0, 0, width, height);
    } else if(combinedEffects){
        image(applyBothEffects(video), 0, 0, width, height);
    } else {
        image(video, 0, 0, width, height);
    }
    video.loadPixels();
    video.updatePixels();
}

function keyPressed() {
    restoreLiveView();
    switch (key.toLowerCase()) {
        case "l":
            // Exercici A)
            negativeFilter = true;
            break;
        case "a":
            // Exercici B)
            posterizeImage = true;
            break;
        case "r":
            // Exercici C)
            binariImage = true;
            break;
        case "o":
            // Exercici D)
            dilateImage = true;
            break;
        case "d":
            // Exercici E)
            combinedEffects = true;
            break;
        default:
            // Restaura la vista en vivo cuando se presiona cualquier tecla que no sea 'L', 'A', 'R', 'O' o 'D'
            restoreLiveView();
            break;
    }
}


function negativeImage(img) {
    let negativeImage = img.get();
    negativeImage.filter(INVERT); // Aplica la Inversión negativa a la imagen
    return negativeImage;
}

function applyDilation(img) {
    let negativeImage = img.get();
    negativeImage.filter(DILATE); // Aplica la Inversión negativa a la imagen
    return negativeImage;
}

function applyPosterize(img) {
    let posterizeImage = img.get();
    posterizeImage.filter(POSTERIZE,6); // Aplica la Inversión negativa a la imagen
    return posterizeImage;
}

function applyBinarization(img) {
    let binerizedImage = img.get();
    binerizedImage.filter(THRESHOLD,110 / 255); // Aplica la Inversión negativa a la imagen
    return binerizedImage;
}

function applyBothEffects(img) {
    let image = img.get();
    image.filter(THRESHOLD,110 / 255); // Aplica la Inversión negativa a la imagen
    image.filter(INVERT);
    return image;
}

function restoreLiveView() {
    imatgeCapturada = null;
    negativeFilter = false;
    dilateImage = false;
    posterizeImage = false;
    binariImage= false;
    combinedEffects= false;
}
