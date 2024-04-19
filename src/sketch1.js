//Creació de variables necessaries per controlar el programa:
let video, imatgeCapturada , negativeFilter = false, dilateImage = false , posterizeImage = false, binariImage = false , combinedEffects = false;

//Funció SETUP que prepara el background per que el programa funcioni.
function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent("lienzo"); //Adjuntem el canva al nostre div "lienzo" per poder ubicarlo al html.

    video = createCapture(VIDEO); //Iniciem enregistrament de captura amb webcam.
    video.size(width, height);
    video.hide();
}

function draw() { //Funció que dibuixa al canva constantment. S'executa en bucle.
    background(255);
    if (negativeFilter) { //Comprovació de si hem de aplicar algun filtre a la nostre imatge de la webcam.
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
    video.loadPixels(); //Actualitzem la imatge de la webcam amb el filtre aplicat.
    video.updatePixels();
}

function keyPressed() { //Funció que s'executa cada cop que es detecta una tecla polsada al teclat.
    restoreLiveView();
    switch (key.toLowerCase()) { //En funció de la tecla modificarem els valors de les variables que es comproven a la funció draw()
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
            // Restaurem la vista normal i sense filtres quan es presioni qualsevol tecla que no sigui 'L', 'A', 'R', 'O' o 'D'
            restoreLiveView();
            break;
    }
}


function negativeImage(img) {
    let negativeImage = img.get();
    negativeImage.filter(INVERT); // Apliquem la inversió negativa a la imatge.
    return negativeImage;
}

function applyDilation(img) {
    let negativeImage = img.get();
    negativeImage.filter(DILATE); // Apliquem el filtre de dilatació a la imagen
    return negativeImage;
}

function applyPosterize(img) {
    let posterizeImage = img.get();
    posterizeImage.filter(POSTERIZE,6); // Apliquem el filtre de posterització amb nivell 6.
    return posterizeImage;
}

function applyBinarization(img) {
    let binerizedImage = img.get();
    binerizedImage.filter(THRESHOLD,110 / 255); // Apliquem una binarització amb el THRESHOLD amb un llindar de 110 en una escala de 1-225.
    return binerizedImage;
}

function applyBothEffects(img) { //Amb aquesta funció obtenim la imatge i apliquem els dos filtres simultaneament.
    let image = img.get();
    image.filter(THRESHOLD,110 / 255); 
    image.filter(INVERT);
    return image;
}

function restoreLiveView() { //Retornem tots els valors de les variables modificats a false, per que la imatge de la web cam torni a ser normal.
    imatgeCapturada = null;
    negativeFilter = false;
    dilateImage = false;
    posterizeImage = false;
    binariImage= false;
    combinedEffects= false;
}
