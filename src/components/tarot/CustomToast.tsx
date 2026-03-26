"use client";

interface CustomToastProps {
  message: string;
  visible: boolean;
}

export function CustomToast({ message, visible }: CustomToastProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "20px"})`,
        opacity: visible ? 1 : 0,
        transition: "all 0.3s ease",
        backgroundColor: "rgba(27, 28, 30, 0.52)",
        color: "white",
        padding: "12px 24px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 500,
        textAlign: "center",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );
}
