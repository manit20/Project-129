song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
songToPlay = "";

function preload(){
    song1 = loadSound("harry_potter.mp3");
    song2 = loadSound("peter_pan.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(420, 200);
    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    harry_potter_playing = song1.isPlaying();
    peter_pan_playing = song2.isPlaying();

    fill("0000FF");
    stroke("0000FF");
    

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(harry_potter_playing == "False"){
            song1.play();
            document.getElementById("song_name_name").innerHTML = "Harry Potter theme song";
            console.clear();
            console.log("Harry Potter theme song is playing");
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(peter_pan_playing == "False"){
            song2.play();
            document.getElementById("song_name_name").innerHTML = "Peter Pan";
            console.clear();
            console.log("Peter Pan is playing");
        }
    }
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "  Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "  Right Wrist Y = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Left Wrist  = " + scoreLeftWrist + " Score of Right Wrist  = " + scoreRightWrist);
    }
}