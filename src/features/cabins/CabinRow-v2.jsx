import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useCabinDelete } from "./useCabinDelete";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const { isCreating, createMutate } = useCreateCabin();

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
      <TableRow role="row">
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
          <button onClick={handleDuplicate} disabled={isCreating}>
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
          </button>
        </div>
      </TableRow>
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
