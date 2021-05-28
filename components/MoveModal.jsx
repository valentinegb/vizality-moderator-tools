import React, { memo, useState } from 'react';
import { Button, FormItem, FormTitle, Modal, TextInput } from '@vizality/components';
import { close } from '@vizality/modal';

export default memo(({ channelName, message, sendMessage }) => {
  const [ channel, setChannel ] = useState('');
  const [ messages, setMessages ] = useState(message || '');

  return (
    <Modal>
      <Modal.Header>
        <FormTitle tag='h4'>Move message{!message && `s from #${channelName}`}</FormTitle>
        <Modal.CloseButton onClick={() => close()}/>
      </Modal.Header>
      <Modal.Content className='vizality-moderator-tools__modal-content'>
        <FormItem title='Channel' required>
          <TextInput
            placeholder="735710639410118817"
            value={channel}
            onChange={setChannel}
          />
        </FormItem>
        {!message && (
          <FormItem
            className='vizality-moderator-tools__form-item'
            title='Messages'
            required
          >
            <TextInput
              placeholder="10"
              value={messages}
              onChange={setMessages}
            />
          </FormItem>
        )}
      </Modal.Content>
      <Modal.Footer>
        <Button
          color={Button.Colors.RED}
          disabled={!channel || !messages}
          onClick={() => {
            sendMessage(`;move <#${channel}> ${messages}`);
            close();
          }}
        >Move</Button>
        <Button
          color={Button.Colors.PRIMARY}
          look={Button.Looks.LINK}
          onClick={() => close()}
        >Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
});
