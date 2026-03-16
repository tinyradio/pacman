"use client";

import { Stepper, StepperItem } from "@wanteddev/wds";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

/** Header stepper: hidden on small screens (<=560px) */
export function StepIndicatorCompact({ currentStep, steps }: StepIndicatorProps) {
  const currentValue = steps[currentStep] ?? steps[0];

  return (
    <Stepper
      value={currentValue}
      sx={{
        "@media (max-width: 560px)": {
          display: "none",
        },
      }}
    >
      {steps.map((label) => (
        <StepperItem
          key={label}
          value={label}
          label={label}
          completedLabel={label}
        />
      ))}
    </Stepper>
  );
}
