import {
  Box,
  Button,
  Flex,
  Highlight,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { useAppSelector } from '../../store/hooks';
import { FaCheck, FaCopy, FaShareAlt } from 'react-icons/fa';

export function ShareGameModal() {
  const { isTheCreator, isLoaded } = useAppSelector((state) => state.game);

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: isLoaded && isTheCreator });
  const { onCopy, hasCopied } = useClipboard(window.location.href);

  return (
    <>
      <IconButton aria-label="Share" onClick={onOpen} icon={<FaShareAlt />} />

      <Modal isOpen={isOpen} motionPreset="slideInBottom" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FaShareAlt /> Share Game
          </ModalHeader>
          <ModalBody>
            <Text>Copy this link and share it with your opponent to start the game.</Text>
            <Box my="10">
              <Highlight query="NOTE:" styles={{ px: '2', py: '.5', rounded: 'full', bg: 'orange.200' }}>
                NOTE: The first one who opens this link will be your opponent and if any other user joined will be a
                game viewer.
              </Highlight>
            </Box>
            <Flex mb={2} justifyContent="center" alignItems="center">
              <Text fontFamily="monospace" mr={2}>
                {window.location.href}
              </Text>
              <IconButton
                aria-label="Share"
                onClick={onCopy}
                colorScheme={hasCopied ? 'orange' : 'gray'}
                icon={hasCopied ? <FaCheck /> : <FaCopy />}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
