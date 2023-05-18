const {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} = require("react");

const DropdownContext = createContext();

const DropdownProvider = (props) => {
  const [show, setShow] = useState();
  const nodeRef = useRef();
  useEffect(() => {
    function handleClickOutSide(e) {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.addEventListener("click", handleClickOutSide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const values = { show, setShow, nodeRef };
  return (
    <DropdownContext.Provider
      value={values}
      {...props}
    ></DropdownContext.Provider>
  );
};

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within a DropdownContext");
  return context;
};

export { useDropdown, DropdownProvider };
