import React, { memo, useState } from 'react';
import { Button, FormItem, FormTitle, Modal, TextInput } from '@vizality/components';
import { close } from '@vizality/modal';
import { getModuleByDisplayName } from '@vizality/webpack';

const FormSection = getModuleByDisplayName('FormSection');

export default memo(({ targetName, targetType, targetId, sendMessage }) => {
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ timestamp, setTimestamp ] = useState('');
  const [ color, setColor ] = useState(null);
  const [ imageUrl, setImageUrl ] = useState('');
  const [ thumbnailUrl, setThumbnailUrl ] = useState('');
  const [ footerText, setFooterText ] = useState('');
  const [ footerIconUrl, setFooterIconUrl ] = useState('');
  const [ authorName, setAuthorName ] = useState('');
  const [ authorUrl, setAuthorUrl ] = useState('');
  const [ authorIconUrl, setAuthorIconUrl ] = useState('');

  const embedObject = JSON.stringify(
    {
      title,
      description,
      url,
      timestamp,
      color: color || null,
      image: {
        url: imageUrl
      },
      thumbnail: {
        url: thumbnailUrl
      },
      footer: {
        text: footerText,
        icon_url: footerIconUrl
      },
      author: {
        name: authorName,
        url: authorUrl,
        icon_url: authorIconUrl
      }
    }
  );
  const embed = embedObject.slice(1, embedObject.length - 1);

  return (
    <Modal>
      <Modal.Header>
        <FormTitle tag='h4'>Send Embed to {targetName}</FormTitle>
        <Modal.CloseButton onClick={() => close()}/>
      </Modal.Header>
      <Modal.Content className='vizality-moderator-tools__modal-content'>
        <FormItem title='Title'>
          <TextInput
            placeholder="Nice Embed"
            value={title}
            onChange={setTitle}
            autoFocus
          />
        </FormItem>
        <FormItem
          className='vizality-moderator-tools__form-item'
          title='Description'
        >
          <TextInput
            placeholder="This is a snazzy embed."
            value={description}
            onChange={setDescription}
          />
        </FormItem>
        <FormItem
          className='vizality-moderator-tools__form-item'
          title='URL'
        >
          <TextInput
            value={url}
            onChange={setUrl}
          />
        </FormItem>
        <FormItem
          className='vizality-moderator-tools__form-item'
          title='Timestamp'
        >
          <TextInput
            value={timestamp}
            onChange={setTimestamp}
          />
        </FormItem>
        <FormItem
          className='vizality-moderator-tools__form-item'
          title='Color'
        >
          <TextInput
            placeholder="3093151"
            value={color}
            onChange={value => setColor(parseInt(value) || '')}
          />
        </FormItem>
        <FormItem
          className='vizality-moderator-tools__form-item'
          title='Image URL'
        >
          <TextInput
            value={imageUrl}
            onChange={setImageUrl}
          />
        </FormItem>
        <FormItem
          className='vizality-moderator-tools__form-item'
          title='Thumbnail URL'
        >
          <TextInput
            value={thumbnailUrl}
            onChange={setThumbnailUrl}
          />
        </FormItem>
        <FormSection
          className='vizality-moderator-tools__form-item'
          title='Footer'
          tag={FormSection.Tags.H4}
        >
          <FormItem
            className='vizality-moderator-tools__form-item'
            title='Text'
            required
          >
            <TextInput
              value={footerText}
              onChange={setFooterText}
            />
          </FormItem>
          <FormItem
            className='vizality-moderator-tools__form-item'
            title='Icon URL'
          >
            <TextInput
              value={footerIconUrl}
              onChange={setFooterIconUrl}
            />
          </FormItem>
        </FormSection>
        <FormSection
          className='vizality-moderator-tools__form-item'
          title='Author'
          tag={FormSection.Tags.H4}
        >
          <FormItem
            className='vizality-moderator-tools__form-item'
            title='Name'
            required
          >
            <TextInput
              value={authorName}
              onChange={setAuthorName}
            />
          </FormItem>
          <FormItem
            className='vizality-moderator-tools__form-item'
            title='URL'
          >
            <TextInput
              value={authorUrl}
              onChange={setAuthorUrl}
            />
          </FormItem>
          <FormItem
            className='vizality-moderator-tools__form-item'
            title='Icon URL'
          >
            <TextInput
              value={authorIconUrl}
              onChange={setAuthorIconUrl}
            />
          </FormItem>
        </FormSection>
      </Modal.Content>
      <Modal.Footer>
        <Button
          color={Button.Colors.RED}
          disabled={!title && !description}
          onClick={() => {
            sendMessage(`;embed <${targetType === 'user' ? '@' : '#'}${targetId}> ${embed}`);
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
