import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAndEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabin = {} }) {
  const { id: cabinEditId, ...cabinEditData } = cabin;
  const isEditSession = Boolean(cabinEditId);
  const { register, handleSubmit, reset, getValues, formState } = useForm(
    { defaultValues: isEditSession ? cabinEditData : {} } // if isEditSession is true, then cabinEditData, else empty object
  );
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createMutate } = useMutation({
    mutationFn: createAndEditCabin, // mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Cabin created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (error) => {
      toast.error("There was an error while creating the cabin.");
    },
  });

  const { isLoading: isEditing, mutate: editMutate } = useMutation({
    mutationFn: ({ newCabin, id }) => createAndEditCabin(newCabin, id), // mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Cabin updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (error) => {
      toast.error("There was an error while updating the cabin.");
    },
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editMutate({ newCabin: { ...data, image: image }, id: cabinEditId });
    } else {
      createMutate({ ...data, image: image });
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  const isWriting = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isWriting}
          {...register("name", { required: "This field should not be empty" })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWriting}
          {...register("maxCapacity", {
            required: "This field should not be empty",
            min: {
              value: 1,
              message: "The capacity should be at least 1 person",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWriting}
          {...register("regularPrice", {
            required: "This field should not be empty",
            min: {
              value: 1,
              message: "The price should not be negative or zero",
            },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWriting}
          {...register("discount", {
            required: "This field should not be empty",
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              "The discount should not be greater than the regular price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWriting}
          {...register("description", {
            required: "This field should not be empty",
          })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field should not be empty",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          sizes="medium"
          variation="secondary"
          type="reset"
          disabled={isWriting}
        >
          Cancel
        </Button>
        <Button sizes="medium" variation="primary" disabled={isWriting}>
          {isEditSession ? "Edit cabin" : "Add new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
