import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  surveys: [],
  questionTypes: [],
  successNotification: {
    message: null,
    show: false,
  },
  setCurrentUser: () => {},
  setUserToken: () => {},
  showSuccessNotification: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("ACCESS_TOKEN") || ""
  );

  const [questionTypes] = useState([
    "text",
    "select",
    "radio",
    "checkbox",
    "textarea",
  ]);

  const [successNotification, setSuccessNotification] = useState({
    message: "",
    show: false,
  });

  const showSuccessNotification = (message) => {
    setSuccessNotification({ message: message, show: true });

    setTimeout(() => {
      setSuccessNotification({ message: "", show: false });
    }, 5000);
  };

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
    _setUserToken(token);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        questionTypes,
        successNotification,
        showSuccessNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
