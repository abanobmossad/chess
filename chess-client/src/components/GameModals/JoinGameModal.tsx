import { useState, useRef, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { joinGameAction } from '../../store/actions/game.actions';

export function JoinGameModal() {
  const { userName, isLoaded } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const { isOpen } = useDisclosure({ isOpen: isLoaded && !userName });
  const [name, setName] = useState('');
  const toast = useToast();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  // join if the user have a name
  useEffect(() => {
    if (userName && isLoaded) dispatch(joinGameAction(userName));
  }, [isLoaded, userName, dispatch]);

  const handleJoinGame = () => {
    if (!name) {
      toast({
        description: 'Please enter your name.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    dispatch(joinGameAction(name));
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Joining Game</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Your Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={initialRef}
                placeholder="Your name here"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleJoinGame}>
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
