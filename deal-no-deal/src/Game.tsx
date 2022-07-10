import { Grid } from "@chakra-ui/react";
import { InGamePrice } from "./inGame/Price";
import { InGamePricesColumn } from "./inGame/PricesColumn";

export function Game() {
  return (
    <Grid templateColumns="1fr auto 1fr" w="100%" px="2">
      <InGamePricesColumn>
        <InGamePrice>{0.01}</InGamePrice>
        <InGamePrice>{1}</InGamePrice>
        <InGamePrice>{5}</InGamePrice>
        <InGamePrice>{10}</InGamePrice>
        <InGamePrice>{25}</InGamePrice>
        <InGamePrice>{50}</InGamePrice>
        <InGamePrice>{75}</InGamePrice>
        <InGamePrice>{100}</InGamePrice>
        <InGamePrice>{200}</InGamePrice>
        <InGamePrice>{300}</InGamePrice>
        <InGamePrice>{400}</InGamePrice>
        <InGamePrice>{500}</InGamePrice>
        <InGamePrice>{750}</InGamePrice>
      </InGamePricesColumn>

      <div></div>

      <InGamePricesColumn side="right">
        <InGamePrice>{1000}</InGamePrice>
        <InGamePrice>{5000}</InGamePrice>
        <InGamePrice>{10000}</InGamePrice>
        <InGamePrice>{25000}</InGamePrice>
        <InGamePrice>{50000}</InGamePrice>
        <InGamePrice>{75000}</InGamePrice>
        <InGamePrice>{100000}</InGamePrice>
        <InGamePrice>{200000}</InGamePrice>
        <InGamePrice>{300000}</InGamePrice>
        <InGamePrice>{400000}</InGamePrice>
        <InGamePrice>{500000}</InGamePrice>
        <InGamePrice>{750000}</InGamePrice>
        <InGamePrice>{1000000}</InGamePrice>
      </InGamePricesColumn>
    </Grid>
  );
}
