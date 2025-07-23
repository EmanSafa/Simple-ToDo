import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { type ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  isClosed: () => void;
  children: ReactNode;
  title: string;
}
const Model = ({ isOpen, isClosed, title, children }: IProps) => {
  return (
    <>
      {isOpen && (
        <div>
          <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={isClosed}
            __demoMode
          >
            <DialogBackdrop className="fixed inset-0 bg-black/30 px-4 backdrop-blur-sm " />
            <div className="fixed inset-0 z-10 w-screen overflow-y">
              <div className="flex min-h-1/2 items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-5xl rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                >
                  <DialogTitle
                    as="h2"
                    className="text-base/7 font-2xl text-white "
                  >
                    {title}
                  </DialogTitle>
                  {children}

                  <div className="mt-4"></div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
};
export default Model;
