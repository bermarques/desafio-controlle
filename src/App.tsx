import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Modal, Button } from "antd";

function App() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return <div className="App"></div>;
}

export default App;
