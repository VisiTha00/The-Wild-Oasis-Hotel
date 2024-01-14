import Form from "../../ui/Form";
import { FormRow, Label } from "../../ui/FormComponents";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const { isUpdating, updateMutate } = useUpdateSetting();

  function handleSettingUpdate(value, settingName) {
    updateMutate({ [settingName]: value });
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form>
      <FormRow>
        <Label>Minimum nights/booking</Label>
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) =>
            handleSettingUpdate(e.target.value, "minBookingLength")
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Label>Maximum nights/booking</Label>
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) =>
            handleSettingUpdate(e.target.value, "maxBookingLength")
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Label>Maximum guests/booking</Label>
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) =>
            handleSettingUpdate(e.target.value, "maxGuestsPerBooking")
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Label>Breakfast price</Label>
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleSettingUpdate(e.target.value, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
