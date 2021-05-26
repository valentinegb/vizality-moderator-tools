import React, { memo, useState } from 'react';
import { Button, FormItem, FormTitle, Modal, TextInput } from '@vizality/components';
import { close } from '@vizality/modal';

export default memo(({ channelName, sendMessage }) => {
  const [ message, setMessage ] = useState('');

  return (
    <Modal>
      <Modal.Header>
        <FormTitle tag='h4'>Clean #{channelName}</FormTitle>
        <Modal.CloseButton onClick={() => close()}/>
      </Modal.Header>
      <Modal.Content className='vizality-moderator-tools__modal-content'>
        <FormItem title='Message Count / Message ID' required>
          <TextInput
            placeholder='10'
            value={message}
            onChange={value => setMessage(`${parseInt(value) || ''}`)}
            autoFocus
          />
        </FormItem>
      </Modal.Content>
      <Modal.Footer>
        <Button
          color={Button.Colors.RED}
          disabled={!message}
          onClick={() => {
            sendMessage(`;clean ${message}`);
            close();
          }}
        >Clean</Button>
        <Button
          color={Button.Colors.PRIMARY}
          look={Button.Looks.LINK}
          onClick={() => close()}
        >Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
});
