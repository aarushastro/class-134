img = ""
status = "";
objects = [];

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function setup()
{
    canvas = createCanvas(320, 320);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(320,320);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}



function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }

    console.log(results);
    objects = results;
}
function draw()
{
    image(video, 0, 0, 320, 320 );

    if (status != "")
{

    r = random(255);
    g = random(255);
    b = random(255);
    for (i = 0; i < objects.length; i++)
    {
        objectDetector.detect(video, gotResult);
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected";
    
    
        fill(r,g,b);
    
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
    }
}


}
