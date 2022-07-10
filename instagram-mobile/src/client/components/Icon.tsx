import styled from "@emotion/styled";
import { Text, TextProps } from "@chakra-ui/react";

export interface IconProps {
  name: string;
  variant?: "filled" | "outlined" | "rounded" | "sharp" | "two-tone";
  className?: string | string[];
}

export default function Icon({
  name,
  variant = "filled",
  className,
  ...props
}: IconProps & Omit<TextProps, "className">) {
  return (
    <Text
      fontSize="2rem"
      className={[
        "material-icons" + (variant !== "filled" ? "-" + variant : ""),
        className,
      ]
        .filter((_) => _)
        .flat()
        .join(" ")}
      {...props}
    >
      {name}
    </Text>
  );
}
