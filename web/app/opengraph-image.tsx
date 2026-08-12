import { ImageResponse } from "next/og";

export const alt =
  "Innovate AI HealthLab — responsible, locally relevant health research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fffdf8",
          color: "#35363a",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 84px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Arial, sans-serif",
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Innovate AI HealthLab
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 900,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Georgia, serif",
              fontSize: 75,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            Responsible health research, built around people.
          </div>
          <div
            style={{
              color: "#62656c",
              display: "flex",
              fontFamily: "Arial, sans-serif",
              fontSize: 28,
              lineHeight: 1.4,
              marginTop: 28,
            }}
          >
            AI, community knowledge and partnerships for locally relevant
            health priorities.
          </div>
        </div>

        <div
          style={{
            bottom: 0,
            display: "flex",
            height: 14,
            left: 0,
            position: "absolute",
            width: "100%",
          }}
        >
          <div style={{ background: "#7d2a91", flex: 1 }} />
          <div style={{ background: "#36acd0", flex: 1 }} />
          <div style={{ background: "#98ae38", flex: 1 }} />
          <div style={{ background: "#f26622", flex: 1 }} />
        </div>
      </div>
    ),
    size,
  );
}
