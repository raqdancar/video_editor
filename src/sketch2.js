
//Creació de variables necessaries per controlar el programa:
let video , filteredImage, detectingContours = false, smoothing = false;

//Funció SETUP que prepara el background per que el programa funcioni
function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent("lienzo"); //Adjuntem el canva al nostre div "lienzo" per poder ubicarlo al html.

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
}

function draw() { //Funció que dibuixa al canva constantment. S'executa en bucle.
    background(255);
    if (detectingContours) { //Comprovació de si hem de aplicar algun filtre a la nostre imatge de la webcam.
        image(detectContours(video), 0, 0, width, height);
    } else if (smoothing) {
        image(smoothImage(video), 0, 0, width, height);
    } else {
        filteredImage = video.get();
        image(filteredImage, 0, 0, width, height);
    }
}

function keyPressed() { //Funció que s'executa cada cop que es detecta una tecla polsada al teclat.
    if (key.toLowerCase() === "d") {
        // Exercici A)
        detectingContours = true;
    } else if (key.toLowerCase() === "l") {
        // Exercici B)
        smoothing = true;
    }else{
        detectingContours = false;
        smoothing = false;
    }
}

function keyReleased() { //Funció que s'executa cada cop que es detecta que una tecla s'ha deixat de premer al teclat.
    if (key.toLowerCase() === "d") {
        detectingContours = false;
    } else if (key.toLowerCase() === "l") {
        smoothing = false;
    }else {
        detectingContours = false;
        smoothing = false;
    }
    //Treballarem modificant les variables de control definides al inici del fitxer.
}

function detectContours(img) { //Aplicarem els filtres necessaris per detectar els contorns de la nostre imatge de la webcam.
    let grayImage = img.get();
    grayImage.filter(GRAY); // Primer de tot convertim la imatge a escala de grisos.
    grayImage.filter(ERODE); //Apliquem filtre de erosió i dilatació per millorar la detecció dels contorns. Simultaneament i dos cops cada filtre.
    grayImage.filter(ERODE);
    grayImage.filter(DILATE);
    grayImage.filter(DILATE);
    grayImage.filter(THRESHOLD); //Finalment apliquem el filtre de umbral (threshold) per binaritzar la imatge i resaltar encara més els contorns.
    return grayImage; //Retornarem la imatge
}

function smoothImage(img) { //Apliquem els filtres necessaris per suavitzar l'imatge.
    let smoothed = img.get();
    smoothed.filter(BLUR, 4);
    return smoothed;
}
