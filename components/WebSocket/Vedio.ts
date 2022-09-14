import io from "socket.io-client";

const socket = io("ws://" + location.host + "/video", {
  transports: ["websocket"],
  jsonp: false,
});

const myVideo = document.getElementById("myVideo");
const soundButton = document.getElementById("sound");
const videoButton = document.getElementById("video");
const camerasSelect = document.getElementById("cameras");

const welcome = document.getElementById("welcome");
const call = document.getElementById("call");

let myStream;
let isMute = false;
let isVideoOff = false;
let roomName;
let myPeerConnection; // RTC
let myDataChannel; //DataChannel

const getMedia = async (deviceId) => {
  const initialConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstraints
    );
    // myVideo.srcObject = myStream; 내 비디오 태그

    if (!deviceId) {
      await getCameras();
    }
  } catch (error) {
    console.log(error);
  }
};
const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getAudioTracks()[0];

    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      // camerasSelect.appendChild(option);

      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
    });
  } catch (e) {
    console.log(e);
  }
};
const soundHandler = () => {
  myStream.getAudioTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });
  if (!isMute) {
    soundButton.innerText = "Unmute";
    isMute = true;
  } else {
    soundButton.innerText = "Mute";
    isMute = false;
  }
};
const videoHandler = () => {
  myStream.getVideoTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });
  if (!isVideoOff) {
    videoButton.innerText = "Video On";
    isVideoOff = true;
  } else {
    videoButton.innerText = "Video Off";
    isVideoOff = false;
  }
};

const cameraHandler = async () => {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    await videoSender.replaceTrack(videoTrack);
  }
};

socket.on("welcome", async () => {
  myDataChannel = myPeerConnection.createDataChannel("chat"); // offer를 만드는 쪽에서 DataChannel 생성
  myDataChannel.addEventListener("message", (event) => {
    console.log(`Message: ${event.data}`);
  });

  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  socket.emit("offer", { offer, roomName });
});

socket.on("offer", async (offer) => {
  myPeerConnection.addEventListener("datachannel", (event) => {
    // offer를 받는 쪽에서 상대가 만든 datachannel을 받아서 양방향 통신한다.
    myDataChannel = event.channel;
    myDataChannel.addEventListener("message", (event) => {
      console.log(`Message: ${event.data}`);
    });
  });

  myPeerConnection.setRemoteDescription(offer);

  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", { answer, roomName });
});

socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
  myPeerConnection.addIceCandidate(ice);
});

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

const roomNameForm = document.getElementById("roomName");

async function handleRoomNameSubmit(event) {
  event.preventDefault();
  const input = roomNameForm.querySelector("input");
  roomName = input.value;
  await initCall();
  socket.emit("join_room", { roomName });
  input.value = "";
}
roomNameForm.addEventListener("submit", handleRoomNameSubmit);

// RTC Code

function makeConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.come:19302",
          "stun:stun1.l.google.come:19302",
          "stun:stun2.l.google.come:19302",
          "stun:stun3.l.google.come:19302",
          "stun:stun4.l.google.come:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce);
  // myPeerConnection.addEventListener('addstream', handleAddStream); // addstream is deprecated.
  myPeerConnection.addEventListener("track", handleAddStream); // addstream is deprecated.
  myStream.getTracks().forEach((track) => {
    myPeerConnection.addTrack(track, myStream);
  });
}

function handleIce(data) {
  socket.emit("ice", { ice: data.candidate, roomName: roomName });
}

function handleAddStream(data) {
  const peerVideo = document.getElementById("peerVideo");
  peerVideo.srcObject = data.streams[0];
}
