import {
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Progress,
  Text,
  Tooltip,
  VStack,
  keyframes,
  HStack,
} from "@chakra-ui/react";
import { FaAppleAlt } from "react-icons/fa";
import { GiChickenLeg, GiMeat } from "react-icons/gi";
import { ItemIcon } from "./components/ItemIcon";
import { Newable } from "./logic/extras";
import { Food, Apple, Hunger, FoodEffect, Meat } from "./logic/food";
import { StatBase } from "./components/StatBase";
import { useEffect, useState } from "react";

type BasePair<A> = [instance: A, classType: Newable<A>];
type BaseList<A extends BasePair<any>> = A[];
type BaseListByName<A extends BasePair<any>> = { [name: string]: A };

function separateListByName<A extends BasePair<any>>(list: A[]): BaseListByName<A> {
  return list.reduce(
    (acc, [instance, classType]) => ({
      ...acc,
      [classType.name]: [instance, classType],
    }),
    {}
  );
}

// Foods
const apple = new Apple();
const meat = new Meat();

console.log(apple);

type FoodPair = BasePair<Food>;
type FoodList = BaseList<FoodPair>;
type FoodListByName = BaseListByName<FoodPair>;

const foods: FoodList = [
  [apple, Apple],
  [meat, Meat],
];
const foodsByName: FoodListByName = separateListByName(foods);

const foodIconsByName: { [name: string]: React.ComponentType } = {
  Apple: FaAppleAlt,
  Meat: GiMeat,
};

// Effects

const hunger = new Hunger();

console.log(hunger);

type FoodEffectPair = BasePair<FoodEffect>;
type FoodEffectList = BaseList<FoodEffectPair>;
type FoodEffectListByName = BaseListByName<FoodEffectPair>;

const foodEffects: FoodEffectList = [[hunger, Hunger]];
const foodEffectsByName: FoodEffectListByName = separateListByName(foodEffects);

const foodEffectIconsByName: { [name: string]: React.ComponentType } = {
  Hunger: GiChickenLeg,
};

function App() {
  return (
    <VStack>
      <Category title="Food">
        {foods.map(([foodInstance, food]) => (
          <FoodStats
            key={food.name}
            name={food.name}
            effects={foodInstance.getEffectsNames()}
          />
        ))}
      </Category>
      <Category title="Food Effects">
        {foodEffects.map(([foodEffectInstance, foodEffect]) => (
          <FoodEffectStats
            key={foodEffect.name}
            name={foodEffect.name}
            description={foodEffectInstance.description}
          />
        ))}
      </Category>
    </VStack>
  );
}

interface CategoryProps {
  title: string;
  children: React.ReactNode;
}

function Category({ title, children }: CategoryProps) {
  return (
    <Flex direction="column" width="100%">
      <Text alignSelf="center" fontSize="5xl">
        {title}
      </Text>
      <Flex wrap="wrap" justifyContent="center" px="3" py="2" gap="2">
        {children}
      </Flex>
    </Flex>
  );
}

const eatingProgressAnimation = keyframes({
  from: {
    backgroundPosition: "0 0",
  },
  to: {
    backgroundPosition: "2rem 0",
  },
});

console.log(eatingProgressAnimation);

interface FoodStatsProps {
  name: string;
  effects: string[];
}

function FoodStats({ name, effects }: FoodStatsProps) {
  const instance = foodsByName[name][0];

  return (
    <StatBase category="food" icon={foodIconsByName[name]} title={name}>
      <Text fontSize="2xl" ml="2">
        Effects
      </Text>
      <HStack ml="4">
        {effects.map((effect) => (
          <Tooltip key={effect} label={`${effect} Effect`}>
            <a href={`#stat-effect-${effect}`}>
              <ItemIcon icon={foodEffectIconsByName[effect]} boxSize="2rem" />
            </a>
          </Tooltip>
        ))}
      </HStack>
      <Text fontSize="2xl" ml="2">
        Properties
      </Text>
      <Box ml="4">
        <List>
          <ListItem display="flex" alignItems="center">
            <Text as="span" fontSize="lg" ml="2" color="GrayText">
              Eat Time:
            </Text>
            <Text as="span" fontSize="xl" ml="2" color="green">
              {instance.eatTime}ms
            </Text>
          </ListItem>
        </List>
      </Box>

      <EatZone eatTime={instance.eatTime} />
    </StatBase>
  );
}

function EatZone({ eatTime }: { eatTime: number }) {
  const [isEating, setIsEating] = useState(false);
  const [eatingProgress, setEatingProgress] = useState(0);
  const [isEaten, setIsEaten] = useState(false);

  useEffect(() => {
    if (isEating) {
      const initialTime = Date.now();
      const interval = setInterval(() => {
        const timeElapsed = Date.now() - initialTime;
        const eatingProgress = (timeElapsed / eatTime) * 100;

        if (eatingProgress >= 100) {
          setIsEating(false);
          setIsEaten(true);
          setEatingProgress(0);
          clearInterval(interval);
          return;
        }

        setEatingProgress(eatingProgress);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isEating]);

  return (
    <Flex alignItems="center" gap="2">
      <Button isLoading={isEating} onClick={() => setIsEating(true)}>
        Eat
      </Button>
      {isEating && (
        <Progress
          hasStripe
          value={eatingProgress}
          width="100%"
          sx={{
            "> *": {
              animation: `${eatingProgressAnimation} 1s linear infinite`,
            },
          }}
        />
      )}
      {!isEating && isEaten && (
        <Text fontSize="2xl" color="green">
          Eaten
        </Text>
      )}
    </Flex>
  );
}

interface FoodEffectStatsProps {
  name: string;
  description: string;
}

function FoodEffectStats({ name, description }: FoodEffectStatsProps) {
  return (
    <StatBase category="effect" icon={foodEffectIconsByName[name]} title={name}>
      {description}
    </StatBase>
  );
}

export default App;
