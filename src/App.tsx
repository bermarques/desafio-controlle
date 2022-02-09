import { Button } from "antd";
import { useState } from "react";
import "./App.css";
import NewProposalModal from "./components/NewProposalModal";

function App() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="App">
      <Button type="primary" onClick={showModal}>
        Adicionar proposta comercial
      </Button>
      <NewProposalModal isVisible={isModalVisible} setVisibility={setIsModalVisible} />
    </div>
  );
}

export default App;
