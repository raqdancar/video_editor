let video;
let imatgeCapturada;

function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent("lienzo");

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
}

function draw() {
    background(255);
    if (imatgeCapturada) {
        image(imatgeCapturada, 0, 0, width, height);
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
            captureAndApplyNegativeFilter();
            break;
        case "a":
            // Exercici B)
            applyPosterizationFilter(false, 6);
            break;
        case "r":
            // Exercici C)
            applyBinarizationFilter(110);
            break;
        case "o":
            // Exercici D)
            applyDilation();
            break;
        case "d":
            // Exercici E)
            captureAndApplyNegativeFilter();
            applyPosterizationFilter(true, 6);
            break;
        default:
            // Restaura la vista en vivo cuando se presiona cualquier tecla que no sea 'L', 'A', 'R', 'O' o 'D'
            restoreLiveView();
            break;
    }
}

function screenshoot(){
    let imatgeCapturada = createImage(width, height);
    imatgeCapturada.copy(
        video,
        0,
        0,
        video.width,
        video.height,
        0,
        0,
        imatgeCapturada.width,
        imatgeCapturada.height
    ); 
    return imatgeCapturada;
}

function captureAndApplyNegativeFilter() {
    // Captura la imagen de la webcam
    imatgeCapturada = screenshoot();

    // Aplica el filtro negativo a la imagen capturada
    imatgeCapturada.loadPixels();
    for (let i = 0; i < imatgeCapturada.pixels.length; i += 4) {
        imatgeCapturada.pixels[i] = 255 - imatgeCapturada.pixels[i]; // R
        imatgeCapturada.pixels[i + 1] = 255 - imatgeCapturada.pixels[i + 1]; // G
        imatgeCapturada.pixels[i + 2] = 255 - imatgeCapturada.pixels[i + 2]; // B
    }
    imatgeCapturada.updatePixels();
}

function applyPosterizationFilter(useExistingImage,level) {
    if (!useExistingImage || !imatgeCapturada) {
        // Realiza una nueva captura de pantalla solo si se solicita o si no hay una imagen capturada existente
        imatgeCapturada = screenshoot();
    }
    imatgeCapturada.loadPixels();
    for (let i = 0; i < imatgeCapturada.pixels.length; i += 4) {
        let r = imatgeCapturada.pixels[i];
        let g = imatgeCapturada.pixels[i + 1];
        let b = imatgeCapturada.pixels[i + 2];

        // Aplica la posterización a cada canal de color
        r = round((r / 255) * level) * floor(255 / level);
        g = round((g / 255) * level) * floor(255 / level);
        b = round((b / 255) * level) * floor(255 / level);

        imatgeCapturada.pixels[i] = r;
        imatgeCapturada.pixels[i + 1] = g;
        imatgeCapturada.pixels[i + 2] = b;
    }
    imatgeCapturada.updatePixels();
}

function applyBinarizationFilter(threshold) {
    imatgeCapturada = screenshoot();
    
    imatgeCapturada.loadPixels();
    for (let i = 0; i < imatgeCapturada.pixels.length; i += 4) {
        let r = imatgeCapturada.pixels[i];
        let g = imatgeCapturada.pixels[i + 1];
        let b = imatgeCapturada.pixels[i + 2];

        // Calcula el valor promedio de los componentes de color
        let avg = (r + g + b) / 3;

        // Aplica la binarización según el umbral dado
        if (avg < threshold) {
            imatgeCapturada.pixels[i] = 0;
            imatgeCapturada.pixels[i + 1] = 0;
            imatgeCapturada.pixels[i + 2] = 0;
        } else {
            imatgeCapturada.pixels[i] = 255;
            imatgeCapturada.pixels[i + 1] = 255;
            imatgeCapturada.pixels[i + 2] = 255;
        }
    }
    imatgeCapturada.updatePixels();
}

function applyDilation() {
    imatgeCapturada = screenshoot();
    imatgeCapturada.filter(DILATE); // Aplica la dilatación a la imagen
}


function restoreLiveView() {
    imatgeCapturada = null;
}
