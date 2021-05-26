import React, { memo, useState } from 'react';
import { Button, FormItem, FormTitle, Modal, TextInput } from '@vizality/components';
import { close } from '@vizality/modal';

export default memo(({ targetName, targetType, targetId, sendMessage }) => {
  const [ message, setMessage ] = useState('');

  return (
    <Modal>
      <Modal.Header>
        <FormTitle tag='h4'>Message {targetName}</FormTitle>
        <Modal.CloseButton onClick={() => close()}/>
      </Modal.Header>
      <Modal.Content className='vizality-moderator-tools__modal-content'>
        <FormItem title='Message' required>
          <TextInput
            placeholder="I think you're cute."
            value={message}
            onChange={setMessage}
            autoFocus
          />
        </FormItem>
      </Modal.Content>
      <Modal.Footer>
        <Button
          color={Button.Colors.RED}
          disabled={!message}
          onClick={() => {
            sendMessage(`;message <${targetType === 'user' ? '@' : '#'}${targetId}> ${message}`);
            close();
          }}
        >Message</Button>
        <Button
          color={Button.Colors.PRIMARY}
          look={Button.Looks.LINK}
          onClick={() => close()}
        >Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
});
