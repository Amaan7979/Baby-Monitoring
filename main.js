status1 = "";
alarm = "";
objects = [];
function setup() {
    canvas = createCanvas(500, 500);
    video = createCapture(VIDEO);
    video.hide();
    canvas.center();
    objectDetector = ml5.objectDetector('COCOSSD', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting Baby";
}

function preload() {
    alarm = loadSound("alarm.mp3");
}

function draw() {
    image(video, 0, 0, 500, 500);
    if (status1 != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, got_results);
        for (let index = 0; index < objects.length; index++) {
            fill(r, g, b);
            stroke(r, g, b);
            percent = floor(objects[index].confidence * 100)
            noFill();
            text(objects[index].label + " " + percent + "%", objects[index].x, objects[index].y);
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);
            document.getElementById("status").innerHTML = "status : Baby found ";
            if (object[index] == "person") {
                document.getElementById("status").innerHTML = "status : Baby found";
                alarm.stop();
            } else {
                document.getElementById("status").innerHTML = "status : Baby not found";
                alarm.play();
            }
        }
    }

}

function modelLoaded() {
    status1 = true;
    console.log("Model is loaded");
    objectDetector.detect(video, got_results);
}

function got_results(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}