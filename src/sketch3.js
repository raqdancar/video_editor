//Creació de variables necessaries per controlar el programa:
let video;
let translationX = 0;
let translationY = 0;
let rotationAngle = 0;
let scaleValue = 1;
//Variable per rotar l'imatge.
let rotateContinuously = false;
//Variables de zoom, moviment lateral i superior/inferior.
let zoomin = false;
let zoomout = false;
let moveRight = false;
let moveLeft = false;
let moveUp = false; // Variable para el movimiento hacia arriba
let moveDown = false; // Variable para el movimiento hacia abajo

//Funció SETUP que prepara el background per que el programa funcioni
function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent("lienzo");

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
}

function draw() { //Funció que dibuixa al canva constantment. S'executa en bucle.
    background(255);
    
    //Apliquem transformacions geometriques
    translate(width / 2, height / 2); // Escollim el centre del canva com a origen de totes les nostres transformacions.
    translationX += (moveRight ? 10 : 0) - (moveLeft ? 10 : 0); // Comprovem si el desplaçament continu está en marxa.

    // Verifiquem si la imatge esta dins dels limits del nostre espai canva.
    if (translationX > width / 2) {
        translationX = -width / 2; // Fem que la imatge aparegui pel costat esquerra.
    } else if (translationX < -width / 2) {
        translationX = width / 2;  // Fem que la imatge aparegui pel costat dret.
    }
    
    if (translationY > height / 2) {
        translationY = -height / 2;  // Fem que la imatge aparegui per la part superior.
    } else if (translationY < -height / 2) {
        translationY = height / 2;  // Fem que la imatge aparegui per la part inferior.
    }

    translate(translationX, translationY); // Apliquem la translació
    if (rotateContinuously) {
        rotationAngle += 0.1; // Girem la imatge en sentit horari indefinidament.
    }
    if (zoomin){
        scaleValue += 0.1; // Ampliem imatge si es boolean true
    }
    if (zoomout){
        scaleValue -= 0.1; // Redu:im la imatge si es boolean false.
    }
    rotate(rotationAngle); // Apliquem rotació
    scale(scaleValue); // Apliquem ampliació/reducció

    // Mostrem la captura de la nostre webcam
    image(video, -width / 2, -height / 2, width, height);
}

function keyPressed() { //Funció que s'executa cada cop que es detecta una tecla polsada al teclat.
    if (keyCode === UP_ARROW) {
        translationY -= 10; // Desplaçament superior
    } else if (keyCode === DOWN_ARROW) {
        translationY += 10; //  Desplaçament Inferior
    } else if (keyCode === LEFT_ARROW) {
        moveLeft = true; // Moviment a l'esquerra
    } else if (keyCode === RIGHT_ARROW) {
        moveRight = true; // Moviment a la dreta
    } else if (key.toLowerCase() === "d") {
        rotateContinuously = true; // Rotació continua
    } else if (key === "+") {
        zoomin = true; // Activar ampliació
    } else if (key === "-") {
        zoomout = true; // Activar reducció
    }
}

function keyReleased() {
    //Funció que s'executa cada cop que es detecta que una tecla s'ha deixat de premer al teclat.
    if (keyCode === LEFT_ARROW) {
        moveLeft = false;
    } else if (keyCode === RIGHT_ARROW) {
        moveRight = false;
    } else if (key.toLowerCase() === "d") {
        rotateContinuously = false;
    } else if (key === "+") {
        zoomin = false; 
    } else if (key === "-") {
        zoomout = false; 
    }
}
