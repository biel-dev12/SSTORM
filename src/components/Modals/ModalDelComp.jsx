import { Modal } from "antd";

const ModalDelComp = ({ visible, onClose }) => {
  return (
    <Modal
      title="Excluir Empresa"
      centered
      open={visible}
      onOk={onClose}
      onCancel={onClose}
    >
      <p>Conteúdo do modal para Excluir empresa...</p>
      <p>Você pode adicionar formulários ou outros elementos aqui.</p>
    </Modal>
  );
};

export default ModalDelComp;