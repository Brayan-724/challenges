import { useToken } from "@chakra-ui/react";
import Color from "color";
import { useMemo } from "react";

export function useColor(color: string): Color {
  const rawColor = useToken("colors", color, color);
  const colorObj = useMemo(() => Color(rawColor), [rawColor]);

  return colorObj;
}
