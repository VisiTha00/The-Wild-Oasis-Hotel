import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
//import UpdateSettingsForm from "../settings/UpdateSettingsForm";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  // const [isOpenSetting, setIsOpenSetting] = useState(false);
  return (
    <div>
      <Button
        variation="primary"
        sizes="medium"
        onClick={() => setIsOpenModal(!isOpenModal)}
      >
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}

      {/*]  <Button
        variation="primary"
        sizes="medium"
        onClick={() => setIsOpenSetting(!isOpenSetting)}
      >
        Open Settings
      </Button>
      {isOpenSetting && (
        <Modal onClose={() => setIsOpenSetting(false)}>
          <UpdateSettingsForm />
        </Modal>
      )} */}
    </div>
  );
}

export default AddCabin;
