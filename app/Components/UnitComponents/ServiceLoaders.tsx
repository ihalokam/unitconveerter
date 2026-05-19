"use client";
import dynamic from "next/dynamic";

const ConverterSpinner = () => (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
    </div>
);

export const MassServiceDynamic = dynamic(
    () => import("./MassService"),
    { loading: ConverterSpinner, ssr: false }
);

export const LengthServiceDynamic = dynamic(
    () => import("./LengthService"),
    { loading: ConverterSpinner, ssr: false }
);

export const VolumeServiceDynamic = dynamic(
    () => import("./VolumeService"),
    { loading: ConverterSpinner, ssr: false }
);

export const PressureServiceDynamic = dynamic(
    () => import("./PressureService"),
    { loading: ConverterSpinner, ssr: false }
);

export const TempServiceDynamic = dynamic(
    () => import("./TempService"),
    { loading: ConverterSpinner, ssr: false }
);

export const EnergyServiceDynamic = dynamic(
    () => import("./EnergyService"),
    { loading: ConverterSpinner, ssr: false }
);
