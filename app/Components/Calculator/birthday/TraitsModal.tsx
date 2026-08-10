"use client";

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

interface TraitsModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
    traits: string[];
}

export default function TraitsModal({ open, onClose, title, description, traits }: TraitsModalProps) {
    return (
        <Transition show={open} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-50">
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm" aria-hidden="true" />
                </TransitionChild>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-97 translate-y-1"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-97 translate-y-1"
                    >
                        <DialogPanel className="w-full max-w-md bg-white border border-stone-100 rounded-2xl p-7 shadow-2xl relative">
                            <button
                                onClick={onClose}
                                aria-label="Close"
                                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-600 mb-2">Profile</p>
                            <DialogTitle className="text-xl font-bold text-stone-900 mb-3">
                                {title}
                            </DialogTitle>
                            <p className="text-sm text-stone-500 leading-relaxed mb-6">{description}</p>

                            {traits.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Key Traits</p>
                                    <ul className="flex flex-wrap gap-2">
                                        {traits.map((t) => (
                                            <li key={t} className="text-xs bg-stone-100 text-stone-700 px-3 py-1 font-medium rounded-full">
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
