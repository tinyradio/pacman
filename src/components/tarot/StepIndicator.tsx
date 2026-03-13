"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import { IconCheck } from "@wanteddev/wds-icon";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      gap="0px"
      sx={(theme) => ({
        padding: "12px 16px",
        borderRadius: "12px",
        backgroundColor: theme.semantic.background.normal.normal,
        outline: `1px solid ${theme.semantic.line.normal}`,
      })}
    >
      {steps.map((label, i) => {
        const isActive = i === currentStep;
        const isDone = i < currentStep;

        return (
          <FlexBox key={label} alignItems="center">
            <FlexBox alignItems="center" gap="6px">
              <FlexBox
                alignItems="center"
                justifyContent="center"
                sx={(theme) => ({
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  ...(isActive
                    ? {
                        backgroundColor: theme.semantic.primary.normal,
                      }
                    : isDone
                    ? {
                        backgroundColor: theme.semantic.primary.normal,
                        opacity: 0.6,
                      }
                    : {
                        backgroundColor: theme.semantic.fill.normal,
                      }),
                  transition: "all 0.3s ease",
                })}
              >
                {isDone ? (
                  <IconCheck sx={() => ({ fontSize: "12px", color: "#fff" })} />
                ) : (
                  <Typography
                    variant="caption2"
                    weight="bold"
                    sx={(theme) => ({
                      color: isActive
                        ? "#fff"
                        : theme.semantic.label.disable,
                    })}
                  >
                    {i + 1}
                  </Typography>
                )}
              </FlexBox>
              <Typography
                variant="caption1"
                weight={isActive ? "bold" : "regular"}
                color={
                  isActive || isDone
                    ? "semantic.label.normal"
                    : "semantic.label.disable"
                }
              >
                {label}
              </Typography>
            </FlexBox>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: "20px",
                  height: "1px",
                  margin: "0 8px",
                  backgroundColor: isDone ? "currentColor" : "#e5e5e5",
                  transition: "background-color 0.3s ease",
                }}
              />
            )}
          </FlexBox>
        );
      })}
    </FlexBox>
  );
}
