import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  const modal = document.getElementById("modal");
  return ReactDOM.createPortal(children, modal);
};

export default Portal;
