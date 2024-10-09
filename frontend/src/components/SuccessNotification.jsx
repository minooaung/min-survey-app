import { useStateContext } from "../contexts/ContextProvider";

export default function SuccessNotification() {
  const { successNotification } = useStateContext();
  return (
    <>
      {successNotification.show && (
        <div className="w-[300px] py-2 px-3 text-white rounded bg-emerald-500 fixed right-3 bottom-3 z-50 animate-fade-in-down">
          {successNotification.message}
        </div>
      )}
    </>
  );
}
