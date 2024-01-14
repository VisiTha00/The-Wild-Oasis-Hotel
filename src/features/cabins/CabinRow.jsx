import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useCabinDelete } from "./useCabinDelete";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const [showForm, setShowForm] = useState(false);
  const [isDeleteClick, setIsDeleteClick] = useState(false);

  const { isDeleting, mutate } = useCabinDelete();
  const { createMutate } = useCreateCabin();

  function handleDuplicate() {
    createMutate({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests.</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          "No discount"
        )}
        <div>
          {/*}  <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((showForm) => !showForm)}>
            <HiPencil />
          </button>
          <button
            onClick={() => setIsDeleteClick((isDeleteClick) => !isDeleteClick)}
            disabled={isDeleting}
          >
            <HiTrash />
        </button> */}
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button onClick={handleDuplicate}>
                <HiSquare2Stack />
                Duplicate
              </Menus.Button>
              <Menus.Button
                onClick={() => setShowForm((showForm) => !showForm)}
              >
                <HiPencil /> Edit
              </Menus.Button>
              <Menus.Button
                onClick={() =>
                  setIsDeleteClick((isDeleteClick) => !isDeleteClick)
                }
              >
                <HiTrash /> Delete
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>
      {showForm ? (
        <Modal onClose={() => setShowForm(false)}>
          <CreateCabinForm cabin={cabin} onClose={() => setShowForm(false)} />
        </Modal>
      ) : null}
      {isDeleteClick ? (
        <Modal onClose={() => setIsDeleteClick(false)}>
          <ConfirmDelete
            resourceName="cabin"
            onConfirm={() => mutate(id)}
            onClose={() => setIsDeleteClick(false)}
            disabled={isDeleting}
          />
        </Modal>
      ) : null}
    </>
  );
}

export default CabinRow;
