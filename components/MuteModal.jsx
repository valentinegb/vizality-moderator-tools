import React, { memo, useState } from 'react';
import { Button, FormItem, FormTitle, Modal, TextInput } from '@vizality/components';
import { close } from '@vizality/modal';

export default memo(({ user, sendMessage }) => {
  const [ duration, setDuration ] = useState('');
  const [ reason, setReason ] = useState('');

  return (
    <Modal>
      <Modal.Header>
        <FormTitle tag='h4'>Mute {user.username}</FormTitle>
        <Modal.CloseButton onClick={() => close()}/>
      </Modal.Header>
      <Modal.Content className='vizality-moderator-tools__modal-content'>
        <FormItem title='Duration'>
          <TextInput
            placeholder='6h'
            value={duration}
            onChange={value => setDuration(value.replace(' ', ''))}
          />
        </FormItem>
        <FormItem
          className='vizality-moderator-tools__form-item'
          title='Reason'
        >
          <TextInput
            placeholder='Badmouthing the local gorillas.'
            value={reason}
            onChange={setReason}
          />
        </FormItem>
      </Modal.Content>
      <Modal.Footer>
        <Button
          color={Button.Colors.RED}
          onClick={() => {
            sendMessage(`;mute <@${user.id}> ${duration} ${reason}`);
            close();
          }}
        >Mute</Button>
        <Button
          color={Button.Colors.PRIMARY}
          look={Button.Looks.LINK}
          onClick={() => close()}
        >Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
});
