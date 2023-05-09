import {
  Button,
  FormLabel,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCog } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setBoardSettings } from '../../store/actions/settings.actions';
import { SETTINGS } from '../../common/interfaces';
import { BOARD_THEME, PIECES_SCHEMA } from '../../common/constants';

export function SettingsGameModal() {
  const { board } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSetSettings = (settings: Partial<SETTINGS['board']>) => {
    if (settings.boardThemeName) {
      const { w, b } = BOARD_THEME[settings.boardThemeName];
      settings.blackColor = b;
      settings.whiteColor = w;
    }
    dispatch(setBoardSettings({ ...board, ...settings }));
  };

  return (
    <>
      <IconButton px="7" aria-label="Settings" size="md" colorScheme="gray" icon={<FaCog />} onClick={onOpen} />

      <Modal isOpen={isOpen} motionPreset="slideInBottom" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FaCog /> Game Settings
          </ModalHeader>
          <ModalBody>
            <SimpleGrid columns={2} spacing={3}>
              <FormLabel>Board</FormLabel>
              <Select
                value={board.boardThemeName}
                onChange={(e) => handleSetSettings({ boardThemeName: e.target.value })}
                size="sm"
                variant="filled"
              >
                {Object.keys(BOARD_THEME).map((k) => {
                  return (
                    <option key={k} value={k}>
                      {BOARD_THEME[k].name}
                    </option>
                  );
                })}
              </Select>

              <FormLabel>Pieces</FormLabel>
              <Select
                value={board.piecesSchema}
                onChange={(e) => handleSetSettings({ piecesSchema: e.target.value })}
                size="sm"
                variant="filled"
              >
                {Object.keys(PIECES_SCHEMA).map((k) => {
                  return (
                    <option key={k} value={k}>
                      {PIECES_SCHEMA[k]}
                    </option>
                  );
                })}
              </Select>

              <FormLabel>Arrows Highlights Moves</FormLabel>
              <Switch
                colorScheme="orange"
                onChange={(e) => handleSetSettings({ allowArrows: e.target.checked })}
                defaultChecked={board.allowArrows}
              />

              <FormLabel>Play Sounds</FormLabel>
              <Switch
                colorScheme="orange"
                onChange={(e) => handleSetSettings({ playSounds: e.target.checked })}
                defaultChecked={board.playSounds}
              />

              <FormLabel>Show Legal Moves</FormLabel>
              <Switch
                colorScheme="orange"
                onChange={(e) => handleSetSettings({ showLegalMoves: e.target.checked })}
                defaultChecked={board.showLegalMoves}
              />

              <FormLabel>Move Animation</FormLabel>
              <Switch
                colorScheme="orange"
                onChange={(e) => handleSetSettings({ showLegalMoves: e.target.checked })}
                defaultChecked={board.allowAnimation}
              />
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
