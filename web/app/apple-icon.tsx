import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#832a95",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          fontSize: "52px",
          fontWeight: 700,
          letterSpacing: "-2px",
          width: "100%",
        }}
      >
        IAHL
      </div>
    ),
    size,
  );
}
