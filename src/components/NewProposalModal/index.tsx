import { Modal, Button } from "antd";

interface INewProposalModal {
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewProposalModal: React.FC<INewProposalModal> = ({ isVisible, setVisibility }) => {
  const handleOk = () => {
    setVisibility(false);
  };

  const handleCancel = () => {
    setVisibility(false);
  };
  return (
    <Modal title="Basic Modal" visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default NewProposalModal;
