import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";

function LogOut() {
  const { isLoading, loggingOut } = useLogout();
  return (
    <ButtonIcon>
      {isLoading ? (
        <SpinnerMini />
      ) : (
        <HiArrowRightOnRectangle onClick={loggingOut} display={isLoading} />
      )}
    </ButtonIcon>
  );
}

export default LogOut;
