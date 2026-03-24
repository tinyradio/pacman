"use client";

import { Stepper, StepperItem, Typography } from "@wanteddev/wds";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

/** Header stepper: hidden on small screens (<=560px), replaced with text label */
export function StepIndicatorCompact({ currentStep, steps }: StepIndicatorProps) {
  const currentValue = steps[currentStep] ?? steps[0];

  return (
    <>
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
      <Typography
        variant="label1"
        weight="bold"
        sx={{
          display: "none",
          "@media (max-width: 560px)": {
            display: "block",
            textAlign: "center",
          },
        }}
      >
        {currentValue}
      </Typography>
    </>
  );
}
