import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import FileContainer from "../../components/sub/FileContainer";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";

const Home: NextPage = () => {
  const [fileUrl, setFileUrl] = useState<string[]>([]);
  const [display, setDisplay] = useState<string[]>([]);
  const ws = new WebSocket(`ws://${location.host}`);
  ws.onopen = () => {
    console.log("send");
  };
  function sendMessage() {
    ws.send("hello");
    ws.onmessage = (evt: MessageEvent) => {
      console.log(evt);
      console.log(evt.data);
    };
  }
  return (
    <div>
      <div>
        <FileContainer
          mode="add"
          setDisplay={(file) => setDisplay([...display, file])}
        />
      </div>
      {display.map((f, i) => (
        <FileContainer key={i} displayUrl={display[i]} />
      ))}
    </div>
  );
};

export default Home;
//클릭이벤트로 onchange랑
