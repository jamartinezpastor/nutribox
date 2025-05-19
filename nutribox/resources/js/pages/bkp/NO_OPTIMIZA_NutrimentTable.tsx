// components/NutrimentTable.tsx
import React from 'react';

const nutriLabels = {
    'energy-kcal_100g': 'Energía (kcal)',
    fat_100g: 'Grasas (g)',
    'saturated-fat_100g': 'Grasas Saturadas (g)',
    carbohydrates_100g: 'Carbohidratos (g)',
    sugars_100g: 'Azúcares (g)',
    fiber_100g: 'Fibra (g)',
    proteins_100g: 'Proteínas (g)',
    salt_100g: 'Sal (g)',
} as const;

type Nutriments = {
    [K in keyof typeof nutriLabels]?: number;
};

export const NutrimentTable: React.FC<{ nutriments: Nutriments }> = React.memo(({ nutriments }) => (
    <table className="mt-2 w-full overflow-hidden rounded-xl border border-gray-300 text-sm transition-transform duration-200 hover:scale-105">
        <thead>
            <tr className="bg-gray-100">
                <th className="border border-gray-200 px-2 py-1 text-left">Nutriente</th>
                <th className="border border-gray-300 px-2 py-1">Por 100g</th>
            </tr>
        </thead>
        <tbody>
            {Object.entries(nutriLabels).map(([key, label]) =>
                nutriments[key as keyof typeof nutriLabels] !== undefined ? (
                    <tr key={key}>
                        <td className="border border-gray-200 px-2 py-1">{label}</td>
                        <td className="border border-gray-300 px-2 py-1">{nutriments[key as keyof typeof nutriLabels]}</td>
                    </tr>
                ) : null,
            )}
        </tbody>
    </table>
));
