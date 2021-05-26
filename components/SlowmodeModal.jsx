import React, { memo, useState } from 'react';
import { Button, FormItem, FormTitle, Modal, TextInput } from '@vizality/components';
import { close } from '@vizality/modal';

export default memo(({ channelName, sendMessage }) => {
  const [ seconds, setSeconds ] = useState('');

  return (
    <Modal>
      <Modal.Header>
        <FormTitle tag='h4'>Set #{channelName}'s slowmode</FormTitle>
        <Modal.CloseButton onClick={() => close()}/>
      </Modal.Header>
      <Modal.Content className='vizality-moderator-tools__modal-content'>
        <FormItem title='Seconds' required>
          <TextInput
            placeholder='10'
            value={seconds}
            onChange={value => setSeconds(`${parseInt(value) || ''}`)}
          />
        </FormItem>
      </Modal.Content>
      <Modal.Footer>
        <Button
          color={Button.Colors.RED}
          disabled={!seconds}
          onClick={() => {
            sendMessage(`;slowmode ${seconds}`);
            close();
          }}
        >Set</Button>
        <Button
          color={Button.Colors.PRIMARY}
          look={Button.Looks.LINK}
          onClick={() => close()}
        >Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
});
