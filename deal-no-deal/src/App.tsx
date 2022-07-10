import { Center, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Game } from "./Game";

function App() {
  const [isSM, setIsSM] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSM(window.innerWidth < 512 && window.innerHeight < 256);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <Center>
      {isSM ? (
        <Text p="4"> Please play in landscape or on bigger device</Text>
      ) : <Game />}
    </Center>
  );
}

export default App;
