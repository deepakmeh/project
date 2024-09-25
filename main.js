song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0; 

function setup(){
    canvas = createCanvas(600, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function draw(){
    image(video, 0, 0, 600, 450)
    fill("#FF0000");
    stroke("FF0000");

    if(scoreleftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " +volume;
    song.setVolume(volume);
    }
}

function preload(){
    sound = loadSound("music.mp3");
}

function play(){
    sound.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("PoseNet is initialized")
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        scoreleftWristX = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreleftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        roghtWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = " +rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = " +leftWristY);
 }
}