let video;
let translationX = 0;
let translationY = 0;
let rotationAngle = 0;
let scaleValue = 1;
let rotateContinuously = false;
let zoomin = false;
let zoomout = false;
let moveRight = false;
let moveLeft = false;
let moveUp = false; // Variable para el movimiento hacia arriba
let moveDown = false; // Variable para el movimiento hacia abajo


function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent("lienzo");

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
}

function draw() {
    background(255);
    
    // Aplicar transformaciones geométricas
    translate(width / 2, height / 2); // Centrar la transformación en el centro del lienzo
    translationX += (moveRight ? 10 : 0) - (moveLeft ? 10 : 0); // Desplazamiento continuo

    // Verificar si la imagen de la cámara se ha movido más allá de los límites del lienzo
    if (translationX > width / 2) {
        translationX = -width / 2; // Aparece por el lado izquierdo
    } else if (translationX < -width / 2) {
        translationX = width / 2; // Aparece por el lado derecho
    }
    
    if (translationY > height / 2) {
        translationY = -height / 2; // Aparece por la parte superior
    } else if (translationY < -height / 2) {
        translationY = height / 2; // Aparece por la parte inferior
    }

    translate(translationX, translationY); // Aplicar la translación
    if (rotateContinuously) {
        rotationAngle += 0.1; // Rotar continuamente en sentido horario si se debe
    }
    if (zoomin){
        scaleValue += 0.1; // Ampliar
    }
    if (zoomout){
        scaleValue -= 0.1; // Reducir
    }
    rotate(rotationAngle); // Aplicar la rotación
    scale(scaleValue); // Aplicar la ampliación/reducción

    // Mostrar la captura de la webcam
    image(video, -width / 2, -height / 2, width, height);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        translationY -= 10; // Desplazar hacia arriba
    } else if (keyCode === DOWN_ARROW) {
        translationY += 10; // Desplazar hacia abajo
    } else if (keyCode === LEFT_ARROW) {
        moveLeft = true; // Activar movimiento hacia la izquierda
    } else if (keyCode === RIGHT_ARROW) {
        moveRight = true; // Activar movimiento hacia la derecha
    } else if (key.toLowerCase() === "d") {
        rotateContinuously = true; // Activar la rotación continua
    } else if (key === "+") {
        zoomin = true; // Activar movimiento hacia la derecha
    } else if (key === "-") {
        zoomout = true; // Activar movimiento hacia la derecha
    }
}

function keyReleased() {
    // Detener la translación al soltar las teclas de flechas
    if (keyCode === LEFT_ARROW) {
        moveLeft = false;
    } else if (keyCode === RIGHT_ARROW) {
        moveRight = false;
    } else if (key.toLowerCase() === "d") {
        rotateContinuously = false; // Desactivar la rotación continua al soltar la tecla "d"
    } else if (key === "+") {
        zoomin = false; 
    } else if (key === "-") {
        zoomout = false; 
    }
}
