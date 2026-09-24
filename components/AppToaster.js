"use client";

import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2500,
        style: {
          background: "#15171d",
          color: "#fff",
          border: "1px solid #2b303d",
          fontSize: "14px",
        },
        success: { iconTheme: { primary: "#c2f800", secondary: "#0c0d10" } },
      }}
    />
  );
}
