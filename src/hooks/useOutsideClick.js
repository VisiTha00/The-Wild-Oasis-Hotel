import { useEffect, useRef } from "react";

//Method 1

/*function useOutsideClick() {
  const ref = useRef();
  const [isOutsideClick, setIsOutsideClick] = useState(false);
  useEffect(() => {
    function handleOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOutsideClick(true);
      }
    }
    document.addEventListener("click", handleOutsideClick, true);
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, []);
  return { ref, isOutsideClick };
}

export default useOutsideClick;*/

//Method 2

function useOutsideClick(onClose, listenEvent = true) {
  const ref = useRef();
  useEffect(() => {
    function handleOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("click", handleOutsideClick, listenEvent);
    return () =>
      document.removeEventListener("click", handleOutsideClick, listenEvent);
  }, [onClose, listenEvent]);
  return { ref };
}

export default useOutsideClick;
