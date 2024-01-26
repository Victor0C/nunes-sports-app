import {
  Button,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PropsAcoes } from "../utils/propsAcoes.interface";
import { Config } from "../utils/config";

export function Delete(props: PropsAcoes) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const requests = new Config();

  const deleteProduct = async () => {
    try {
      await requests.deleteProduct(props.data.code);
      onClose();
      props.callback();
      toast({
        title: `O produto ${props.data.name} (${props.data.code}) foi deletado`,
        status: "success",
        isClosable: true,
        duration: 2000,
      });
    } catch {
      onClose();
      toast({
        title: `Falha ao deletar ${props.data.name} (${props.data.code})`,
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atenção!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" color="tomato">
              Tem certeza em deletar o produto {props.data.name} (
              {props.data.code})?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={deleteProduct}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <svg
        onClick={onOpen}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash"
        viewBox="0 0 16 16"
      >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
      </svg>
    </div>
  );
}
