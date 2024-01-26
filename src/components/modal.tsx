import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Config } from "../utils/config";
import { useForm, Controller } from "react-hook-form";
import { Product } from "../utils/product.interface";

interface PropsModal {
  codes: string[];
  callback: () => void;
  button: boolean;
  editModal?: {
    initialDdata?: Product;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
}

export function ModalProduct(props: PropsModal) {
  const requests = new Config();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: props.editModal?.initialDdata?.name || "",
      desc: props.editModal?.initialDdata?.desc || "",
      price: props.editModal?.initialDdata?.price || "",
      code: props.editModal?.initialDdata?.code || "",
    },
  });
  const toast = useToast();

  const formNewProduct = async (data: any) => {
    if (props.codes.find((code) => data.code === code)) {
      toast({
        title: `O produto ${data.name} (${data.code}) já foi cadastrado`,
        status: "error",
        isClosable: true,
        duration: 2000,
      });
      return;
    }
    data.price = +data.price;
    try {
      await requests.creatProduct({ ...data });
      onClose();
      props.callback();
      toast({
        title: `O produto ${data.name} (${data.code}) foi cadastrado`,
        status: "success",
        isClosable: true,
        duration: 2000,
      });
    } catch {
      toast({
        title: `Falha ao cadastrar ${data.name} (${data.code})`,
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    }
    reset();
  };

  const formUpdateProduct = async (data: any) => {
    data.price = +data.price;
    try {
      await requests.updateProduct({ ...data });
      props.editModal?.onClose();
      props.callback();
      toast({
        title: `O produto ${data.name} (${data.code}) foi atualizado`,
        status: "success",
        isClosable: true,
      });
    } catch {
      toast({
        title: `Falha ao atualizar o ${data.name} (${data.code})`,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      {props.button ? (
        <Button colorScheme="blue" onClick={onOpen} className="mt-1">
          Cadastrar
        </Button>
      ) : null}
      <Modal
        isOpen={!props.editModal ? isOpen : props.editModal.isOpen}
        onClose={!props.editModal ? onClose : props.editModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!props.editModal
              ? "Cadastrar novo produto"
              : `Editar produto ${props.editModal.initialDdata?.name} (${props.editModal.initialDdata?.code})`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={handleSubmit(
                !props.editModal ? formNewProduct : formUpdateProduct
              )}
            >
              <FormControl isRequired className="d-grid gap-2">
                <div>
                  <FormLabel>Nome</FormLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Nome do produto"
                        defaultValue={props.editModal?.initialDdata?.name}
                        maxLength={42}
                      />
                    )}
                  />
                </div>
                <div>
                  <FormLabel>Descrição</FormLabel>
                  <Controller
                    name="desc"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Descrição do produto"
                        defaultValue={props.editModal?.initialDdata?.desc}
                        maxLength={150}
                      />
                    )}
                  />
                </div>
                <div>
                  <FormLabel>Preço</FormLabel>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Preço do produto"
                        onChange={(e) =>
                          e.target.value.length <= 9 && field.onChange(e)
                        }
                        defaultValue={props.editModal?.initialDdata?.price}
                      />
                    )}
                  />
                </div>
                <div>
                  <FormLabel>Código</FormLabel>
                  <Controller
                    name="code"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Código do produto"
                        value={props.editModal?.initialDdata?.code}
                        disabled={!props.editModal ? false : true}
                        maxLength={10}
                      />
                    )}
                  />
                </div>

                <div className="mt-4 mb-2 d-flex justify-content-end">
                  <Button
                    variant="ghost"
                    mr={3}
                    onClick={() =>
                      !props.editModal ? onClose() : props.editModal.onClose()
                    }
                  >
                    Cancelar
                  </Button>
                  <Button colorScheme="blue" type="submit">
                    Concluir
                  </Button>
                </div>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
