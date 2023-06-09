import { Modal, useMantineTheme } from '@mantine/core';
import PostShare from '../PostShare/PostShare';
import React from 'react';
function ShareModal({modalOpened,setModalOpened}) {
  const theme = useMantineTheme();  //an object that builds components in a unique way

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpened}
      onClose={()=>setModalOpened(false)}
    >
    <PostShare/>
    </Modal>
  );
}
export default ShareModal;