import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import * as DialogRadix from '@radix-ui/react-dialog';
import { ExclamationIcon, InformationCircleIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Button from './Button';

export default function Dialog({
  open,
  setOpen,
  title,
  children,
  isDanger,
  isEdit,
  onClose,
  onConfirm,
  showIcon,
  confirmText = 'Confirm',
}) {
  return (
    <DialogRadix.Root open={open} onOpenChange={setOpen}>
      <Transition.Root show={open}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <DialogRadix.Overlay
            forceMount
            className='fixed inset-0 z-50 bg-black/40 transition-opacity dark:bg-black/70'
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <DialogRadix.Content
            forceMount
            className={clsx(
              'fixed z-50',
              'w-[90%] max-w-lg rounded-lg',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white dark:bg-neutral-900'
            )}
          >
            <DialogRadix.Close
              className={
                'absolute top-3.5 right-3.5 rounded p-1 focus-visible:outline-none focus-visible:ring dark:focus-visible:ring-neutral-500'
              }
            >
              <XIcon className='h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400' />
            </DialogRadix.Close>

            <div className={`p-5 ${showIcon && 'sm:flex sm:gap-4'}`}>
              {showIcon ? (
                isDanger ? (
                  <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0'>
                    <ExclamationIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                  </div>
                ) : (
                  <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0'>
                    <InformationCircleIcon className='h-6 w-6 text-blue-600' aria-hidden='true' />
                  </div>
                )
              ) : null}
              <div className='mt-3 sm:mt-0'>
                <DialogRadix.Title className='text-center text-lg font-medium text-neutral-800 dark:text-neutral-100 sm:text-left'>
                  {title}
                </DialogRadix.Title>
                <div className='mt-2 text-sm font-normal tracking-wide text-neutral-600 dark:text-neutral-300'>
                  {children}
                </div>
              </div>
            </div>

            <div className='justify-end gap-3 px-5 pb-5 sm:flex'>
              <Button.secondary className='mb-2 w-full focus:ring-2 sm:mb-0 sm:w-auto' onClick={onClose}>
                Cancel
              </Button.secondary>
              {isDanger ? (
                <Button.danger className='w-full sm:w-auto' onClick={onConfirm}>
                  Delete
                </Button.danger>
              ) : isEdit ? (
                <Button className='w-full sm:w-auto' onClick={onConfirm}>
                  {confirmText}
                </Button>
              ) : (
                <Button.success className='w-full sm:w-auto' onClick={onConfirm}>
                  {confirmText}
                </Button.success>
              )}
            </div>
          </DialogRadix.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogRadix.Root>
  );
}
