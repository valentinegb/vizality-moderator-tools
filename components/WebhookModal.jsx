import React, { memo, useState } from 'react';
import { Button, FormItem, FormTitle, Modal, TextInput } from '@vizality/components';
import { close } from '@vizality/modal';

export default memo(({ channelName, sendMessage }) => {
  const [ avatarUrl, setAvatarUrl ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ message, setMessage ] = useState('');

  return (
    <Modal>
      <Modal.Header>
        <FormTitle tag='h4'>Send Webhook to #{channelName}</FormTitle>
        <Modal.CloseButton onClick={() => close()}/>
      </Modal.Header>
      <Modal.Content className='vizality-moderator-tools__modal-content'>
        <FormItem title='Avatar URL' required>
          <TextInput
            placeholder="https://cdn.discordapp.com/avatars/97549189629636608/88a8f8751865d93c8be985c94522d5c0.webp"
            value={avatarUrl}
            onChange={value => setAvatarUrl(value.replace(' ', ''))}
            autoFocus
          />
        </FormItem>
        <FormItem
          className='vizality-moderator-tools__form-item'
          title='Username'
          required
        >
          <TextInput
            placeholder="dperolio"
            value={username}
            onChange={value => setUsername(value.replace(' ', ''))}
          />
        </FormItem>
        <FormItem
          className='vizality-moderator-tools__form-item'
          title='Message'
          required
        >
          <TextInput
            placeholder="I think you're cute."
            value={message}
            onChange={setMessage}
          />
        </FormItem>
      </Modal.Content>
      <Modal.Footer>
        <Button
          color={Button.Colors.RED}
          disabled={!avatarUrl || !username || !message}
          onClick={() => {
            sendMessage(`;webhook ${avatarUrl} ${username} ${message}`);
            close();
          }}
        >Send</Button>
        <Button
          color={Button.Colors.PRIMARY}
          look={Button.Looks.LINK}
          onClick={() => close()}
        >Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
});
