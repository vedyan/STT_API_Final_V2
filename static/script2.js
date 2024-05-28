var socket = io.connect(
    "http://" + window.location.hostname + ":" + location.port
  );
  
  var isTranscribing = false;
  
  document.getElementById("startButton").addEventListener("click", function () {
    if (!isTranscribing) {
      // Start transcription
      isTranscribing = true;
      socket.emit("toggle_transcription", { action: "start" });
      document.getElementById("startButton").innerText = "Stop";
    } else {
      // Stop transcription
      isTranscribing = false;
      socket.emit("toggle_transcription", { action: "stop" });
      document.getElementById("startButton").innerText = "Start";
    }
  });
  
  socket.on("transcription_update", function (data) {
    document.getElementById("captions").innerHTML = data.transcription;
  });
