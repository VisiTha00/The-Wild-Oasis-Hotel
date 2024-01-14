import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useUpdateCabin } from "./useUpdateCabin";
import { useCreateCabin } from "./useCreateCabin";
import { FormRow, Label, Error } from "../../ui/FormComponents";

function CreateCabinForm({ cabin = {}, onClose }) {
  const { id: cabinEditId, ...cabinEditData } = cabin;
  const isEditSession = Boolean(cabinEditId);
  const { register, handleSubmit, reset, getValues, formState } = useForm(
    { defaultValues: isEditSession ? cabinEditData : {} } // if isEditSession is true, then cabinEditData, else empty object
  );
  const { errors } = formState;
  const { isEditing, editMutate } = useUpdateCabin();
  const { isCreating, createMutate } = useCreateCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editMutate(
        { newCabin: { ...data, image: image }, id: cabinEditId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    } else {
      createMutate(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  const isWriting = isCreating || isEditing;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
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
          onClick={() => onClose?.()}
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
