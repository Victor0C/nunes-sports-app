import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { TableProducts } from "./components/table";

function App() {
  return (
    <ChakraProvider>
      <div className="container-fluid d-flex justify-content-center align-items-center flex-column my-container">
        <TableProducts />
      </div>
    </ChakraProvider>
  );
}

export default App;
