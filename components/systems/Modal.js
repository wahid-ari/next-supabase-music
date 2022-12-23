import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, InformationCircleIcon } from "@heroicons/react/outline";
import Button from "@components/systems/Button";

export default function Modal({ open, title, children, isDanger, onClose, onConfirm, showIcon }) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" open={open} onClose={onClose}>
        <div className="pt-4 px-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-middle bg-white dark:bg-neutral-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-lg">

              <div className="sm:flex p-5 sm:gap-4">
                {showIcon ?
                  isDanger ? (
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                      <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                      <InformationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                  )
                  : null
                }
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-neutral-800 dark:text-neutral-100">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 text-neutral-700 dark:text-neutral-300">
                    {children}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 sm:flex gap-3 justify-end">
                <Button.secondary className="sm:w-auto w-full mb-2 sm:mb-0" onClick={onClose} >
                  Cancel
                </Button.secondary>

                {isDanger ?
                  <Button.danger className="sm:w-auto w-full" onClick={onConfirm} >
                    Delete
                  </Button.danger>
                  :
                  <Button className="sm:w-auto w-full" onClick={onConfirm} >
                    Confirm
                  </Button>
                }
              </div>

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
