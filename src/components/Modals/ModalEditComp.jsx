import { Modal } from "antd";

const ModalEditComp = ({ visible, onClose }) => {
  return (
    <Modal
      title="Editar Empresa"
      centered
      open={visible}
      onOk={onClose}
      onCancel={onClose}
    >
      <p>Conteúdo do modal para Editar empresa...</p>
      <p>Você pode adicionar formulários ou outros elementos aqui.</p>
    </Modal>
  );
};

export default ModalEditComp;