import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const logoData = await readFile(
  join(process.cwd(), "public/images/iahl-logo.jpeg"),
  "base64",
);
const logoSrc = `data:image/jpeg;base64,${logoData}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fffdf8",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "14px",
          width: "100%",
        }}
      >
        {/* ImageResponse supports native img elements for embedded assets. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={152} height={124} />
      </div>
    ),
    size,
  );
}
