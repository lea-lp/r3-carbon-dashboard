import { useState } from "react";
import { Box, Flex, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSectors } from "../hooks/useSectors";
import { useEmissions } from "../hooks/useEmissions";
import StatCard from "./StatCard";

const C = {
  bg: "#080e0b",
  surface: "#0e1a13",
  surfaceAlt: "#111f17",
  border: "#1a3024",
  accent: "#39ff7a",
  accentDim: "#1a6636",
  text: "#d4edd9",
  muted: "#4d7a5c",
  barFill: "#39ff7a",
  barHover: "#7fffa8",
  grid: "#0f2018",
  tooltipBg: "#0b1610",
};

const FONT_DISPLAY = "'Bebas Neue', sans-serif";
const FONT_MONO = "'IBM Plex Mono', monospace";

export default function Dashboard() {
  const [sectorId, setSectorId] = useState<string | undefined>(undefined);
  const { data: sectors, isLoading: sectorsLoading } = useSectors();
  const { data: emissions, isLoading: emissionsLoading } =
    useEmissions(sectorId);

  const selectedSectorName = sectorId
    ? (sectors?.find((s) => s.id === sectorId)?.name ?? "")
    : "Tous les secteurs";

  const topEmission = emissions?.reduce(
    (max, e) => (e.value > max.value ? e : max),
    { value: -Infinity, label: "" } as { value: number; label: string }
  );

  return (
    <Box minH="100vh" bg={C.bg} color={C.text} fontFamily={FONT_MONO}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        body { background: ${C.bg}; margin: 0; }
      `}</style>

      {/* Header */}
      <Box
        borderBottom={`1px solid ${C.border}`}
        px={{ base: 6, md: 12 }}
        py={8}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset={0}
          opacity={0.03}
          backgroundImage="repeating-linear-gradient(0deg, transparent, transparent 24px, #39ff7a 24px, #39ff7a 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, #39ff7a 24px, #39ff7a 25px)"
          pointerEvents="none"
        />
        <Text
          fontSize="10px"
          letterSpacing="0.4em"
          color={C.accentDim}
          textTransform="uppercase"
          mb={3}
        >
          Base Empreinte · ADEME · {new Date().getFullYear()}
        </Text>
        <Heading
          fontFamily={FONT_DISPLAY}
          fontSize={{ base: "52px", md: "88px" }}
          color={C.text}
          letterSpacing="0.04em"
          lineHeight="1"
          mb={3}
        >
          Tableau de bord Carbone
        </Heading>
        <Text fontSize="13px" color={C.muted} letterSpacing="0.05em">
          Facteurs d'émission par secteur d'activité
        </Text>
      </Box>

      {/* Sector filters */}
      <Box
        px={{ base: 6, md: 12 }}
        py={6}
        borderBottom={`1px solid ${C.border}`}
      >
        {sectorsLoading ? (
          <Spinner size="sm" color={C.accent} />
        ) : (
          <Flex gap={2} flexWrap="wrap" align="center">
            <Text
              fontSize="10px"
              color={C.muted}
              letterSpacing="0.3em"
              mr={3}
              textTransform="uppercase"
            >
              Filtrer
            </Text>
            <Button
              size="sm"
              variant={sectorId === undefined ? "solid" : "outline"}
              colorPalette="green"
              onClick={() => setSectorId(undefined)}
              fontFamily={FONT_MONO}
              fontSize="11px"
              letterSpacing="0.08em"
              borderRadius={0}
            >
              Tous
            </Button>
            {sectors?.map((sector) => (
              <Button
                key={sector.id}
                size="sm"
                variant={sectorId === sector.id ? "solid" : "outline"}
                colorPalette="green"
                onClick={() => setSectorId(sector.id)}
                fontFamily={FONT_MONO}
                fontSize="11px"
                letterSpacing="0.08em"
                borderRadius={0}
              >
                {sector.name}
              </Button>
            ))}
          </Flex>
        )}
      </Box>

      {/* Stats row */}
      <Flex px={{ base: 6, md: 12 }} py={6} gap={4} flexWrap="wrap">
        <StatCard
          label="Secteurs"
          value={sectors?.length ?? "—"}
        />
        <StatCard
          label="Facteurs affichés"
          value={emissions?.length ?? "—"}
        />
        <StatCard
          label="Valeur max"
          value={topEmission && topEmission.value > -Infinity ? topEmission.value : "—"}
          sub={topEmission && topEmission.value > -Infinity ? topEmission.label : undefined}
        />
      </Flex>

      {/* Chart area */}
      <Box px={{ base: 6, md: 12 }} py={10}>
        <Flex justify="space-between" align="baseline" mb={6}>
          <Text
            fontFamily={FONT_DISPLAY}
            fontSize="28px"
            letterSpacing="0.06em"
            color={C.text}
          >
            {selectedSectorName}
          </Text>
          {!emissionsLoading && (
            <Text fontSize="11px" color={C.muted} letterSpacing="0.2em">
              {emissions?.length ?? 0} facteurs · kgCO₂e
            </Text>
          )}
        </Flex>

        <Box
          bg={C.surface}
          border={`1px solid ${C.border}`}
          p={{ base: 4, md: 8 }}
          minH="600px"
          position="relative"
        >
          {emissionsLoading ? (
            <Flex align="center" justify="center" h="360px" gap={4}>
              <Spinner size="lg" color={C.accent} />
              <Text fontSize="12px" color={C.muted} letterSpacing="0.2em">
                Chargement...
              </Text>
            </Flex>
          ) : emissions && emissions.length > 0 ? (
            <ResponsiveContainer width="100%" height={560}>
              <BarChart
                data={emissions}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                barCategoryGap="30%"
              >
                <CartesianGrid
                  strokeDasharray="1 4"
                  stroke={C.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={{
                    fill: C.muted,
                    fontSize: 10,
                    fontFamily: "IBM Plex Mono",
                    width: 160,
                  }}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={180}
                  tickLine={false}
                  axisLine={{ stroke: C.border }}
                />
                <YAxis
                  tick={{
                    fill: C.muted,
                    fontSize: 10,
                    fontFamily: "IBM Plex Mono",
                  }}
                  tickLine={false}
                  axisLine={false}
                  width={60}
                  label={{
                    value: "kgCO₂e",
                    angle: -90,
                    position: "insideLeft",
                    fill: C.muted,
                    fontSize: 10,
                    fontFamily: "IBM Plex Mono",
                    offset: -5,
                  }}
                />
                <Tooltip
                  cursor={{ fill: C.surfaceAlt }}
                  contentStyle={{
                    backgroundColor: C.tooltipBg,
                    border: `1px solid ${C.accent}`,
                    borderRadius: 0,
                    fontFamily: "IBM Plex Mono",
                    fontSize: 11,
                    color: C.text,
                    padding: "8px 12px",
                  }}
                  labelStyle={{ color: C.accent, marginBottom: 4 }}
                  formatter={(value) => [`${value} kgCO₂e`, "Émission"]}
                />
                <Bar
                  dataKey="value"
                  fill={C.barFill}
                  radius={0}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Flex
              align="center"
              justify="center"
              h="360px"
              direction="column"
              gap={2}
            >
              <Text
                fontSize="11px"
                color={C.muted}
                letterSpacing="0.3em"
                textTransform="uppercase"
              >
                Aucune donnée disponible
              </Text>
            </Flex>
          )}
        </Box>
      </Box>

      {/* Footer */}
      <Flex
        px={{ base: 6, md: 12 }}
        py={4}
        borderTop={`1px solid ${C.border}`}
        justify="space-between"
        align="center"
      >
        <Text fontSize="10px" color={C.muted} letterSpacing="0.2em">
          r3-carbon-dashboard
        </Text>
        <Text fontSize="10px" color={C.muted} letterSpacing="0.2em">
          Source: ADEME Base Empreinte
        </Text>
      </Flex>
    </Box>
  );
}
