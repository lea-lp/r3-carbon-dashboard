import { Box, StatLabel, StatRoot, StatValueText } from "@chakra-ui/react";

const C = {
  surface: "#0e1a13",
  border: "#1a3024",
  accent: "#39ff7a",
  text: "#d4edd9",
  muted: "#4d7a5c",
};

const FONT_DISPLAY = "'Bebas Neue', sans-serif";
const FONT_MONO = "'IBM Plex Mono', monospace";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
}

export default function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <Box
      flex="1"
      minW="160px"
      bg={C.surface}
      border={`1px solid ${C.border}`}
      px={6}
      py={5}
    >
      <StatRoot>
        <StatLabel
          fontSize="10px"
          letterSpacing="0.3em"
          textTransform="uppercase"
          color={C.muted}
          fontFamily={FONT_MONO}
          mb={2}
        >
          {label}
        </StatLabel>
        <StatValueText
          fontFamily={FONT_DISPLAY}
          fontSize="36px"
          letterSpacing="0.04em"
          color={C.accent}
          lineHeight="1"
        >
          {value}
        </StatValueText>
        {sub && (
          <Box
            fontSize="10px"
            color={C.muted}
            fontFamily={FONT_MONO}
            mt={2}
            letterSpacing="0.05em"
          >
            {sub}
          </Box>
        )}
      </StatRoot>
    </Box>
  );
}
