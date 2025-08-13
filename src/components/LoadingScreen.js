// src/components/LoadingDots.jsx
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

// animação estilo "suspense"
const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); opacity: .5; }
  40% { transform: scale(1); opacity: 1; }
`;

export default function LoadingDots({
  label = "Carregando",
  count = 5,           // quantidade de bolinhas (ex.: 3, 4, 5…)
  dotSize = 14,        // tamanho das bolinhas (px)
  gap = 10,            // espaçamento entre bolinhas (px)
  labelVariant = "h5", // tamanho do texto: "body1", "h6", "h5", etc.
  duration = 1.3,      // duração da animação (s)
}) {
  // acessibilidade: respeita "prefers-reduced-motion"
  const prefersReducedMotion = typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{ minHeight: "60vh", display: "grid", placeItems: "center", px: 2 }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant={labelVariant} sx={{ mb: 2, fontWeight: 600 }}>
          {label}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: `${gap}px` }}>
          {Array.from({ length: count }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                bgcolor: "primary.main",
                ...(prefersReducedMotion
                  ? { opacity: 0.6 } // sem animação para usuários que preferem menos movimento
                  : {
                      animation: `${bounce} ${duration}s infinite ease-in-out both`,
                      animationDelay: `${i * (duration / (count + 2))}s`,
                    }),
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
