const deleteConversation = ({ id, Title, submit }) => {
  const deleteComfirm = confirm(
    `Delete chat? \n\nYou will no longer see this chat here. This will also delete related activity like prompts, responses.`
  );

  if (!deleteComfirm) return;

  submit(
    {
      request_type: 'delete_conversation',
      conversation_id: id,
      conversation_title: Title
    },
    {
      method: 'DELETE',
      encType: 'application/x-www-form-urlencoded',
      action:'/' 
    }
  );
};

export default deleteConversation;
