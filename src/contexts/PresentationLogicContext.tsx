import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface PresentationLogicContextType {
  waitingForSecondUser: boolean;
  setWaitingForSecondUser: Dispatch<SetStateAction<boolean>>;
  waitingForSecondUserToRespond: boolean;
  setWaitingForSecondUserToRespond: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

const PresentationLogicContext = createContext<
  PresentationLogicContextType | undefined
>(undefined);

interface PresentationLogicProviderProps {
  children: ReactNode;
}

export const PresentationLogicProvider: React.FC<
  PresentationLogicProviderProps
> = ({ children }) => {
  const [waitingForSecondUser, setWaitingForSecondUser] = useState(false);
  const [waitingForSecondUserToRespond, setWaitingForSecondUserToRespond] =
    useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <PresentationLogicContext.Provider
      value={{
        waitingForSecondUser,
        setWaitingForSecondUser,
        waitingForSecondUserToRespond,
        setWaitingForSecondUserToRespond,
        disabled,
        setDisabled,
      }}
    >
      {children}
    </PresentationLogicContext.Provider>
  );
};

export const usePresentationLogic = (): PresentationLogicContextType => {
  const context = useContext(PresentationLogicContext);
  if (!context) {
    throw new Error(
      'usePresentationLogic must be used within a PresentationLogicProvider'
    );
  }
  return context;
};
