let video;
let filteredImage;
let detectingContours = false;
let smoothing = false;

function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent("lienzo");

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
}

function draw() {
    background(255);
    if (detectingContours) {
        image(detectContours(video), 0, 0, width, height);
    } else if (smoothing) {
        image(smoothImage(video), 0, 0, width, height);
    } else {
        filteredImage = video.get();
        image(filteredImage, 0, 0, width, height);
    }
}

function keyPressed() {
    if (key.toLowerCase() === "d") {
        detectingContours = true;
    } else if (key.toLowerCase() === "l") {
        smoothing = true;
    }else{
        detectingContours = false;
        smoothing = false;
    }
}

function keyReleased() {
    if (key.toLowerCase() === "d") {
        detectingContours = false;
    } else if (key.toLowerCase() === "l") {
        smoothing = false;
    }else {
        detectingContours = false;
        smoothing = false;
    }
}

function detectContours(img) {
    let grayImage = img.get();
    grayImage.filter(GRAY);
    grayImage.filter(INVERT);
    grayImage.filter(THRESHOLD);
    grayImage.filter(ERODE);
    grayImage.filter(DILATE);
    return grayImage;
}

function smoothImage(img) {
    let smoothed = img.get();
    smoothed.filter(BLUR, 4);
    return smoothed;
}
