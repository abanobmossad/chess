import { IconButton, Center, Flex, Button, Tooltip } from '@chakra-ui/react';
import { FaFlag, FaCog, FaChessKing, FaComments } from 'react-icons/fa';
import { ShareGameModal } from '../../pages/GamePlay/ShareGameModal';

export function GameControls() {
  return (
    <div style={{ backgroundColor: '#22201D', padding: '10px' }}>
      <Flex flexDirection="column" gap="2">
        <Center>
          <Flex gap="2">
            <Tooltip hasArrow label="Resign" >
              <IconButton px="7" aria-label="Resign" size="md" colorScheme="gray" icon={<FaFlag />} />
            </Tooltip>
            <Tooltip hasArrow label="Chat">
              <IconButton px="7" aria-label="Chat" size="md" colorScheme="gray" icon={<FaComments />} />
            </Tooltip>
            <Tooltip hasArrow label="Game Settings">
              <IconButton px="7" aria-label="Settings" size="md" colorScheme="gray" icon={<FaCog />} />
            </Tooltip>
            <Tooltip hasArrow label="Share Game">
              <div>
                <ShareGameModal />
              </div>
            </Tooltip>
          </Flex>
        </Center>
        <Button colorScheme="orange" size="md" width="100%" leftIcon={<FaChessKing />}>
          New Game
        </Button>
      </Flex>
    </div>
  );
}
