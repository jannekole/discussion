import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessageListContainer from '../containers/MessageListContainer';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fieldText: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleReplyBtnClick = this.handleReplyBtnClick.bind(this);


  }

  handleInputChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });
    this.props.changeInput(this.props.parent, event.target.value);
  }

  handleSubmit(e) {
    //this.props.addMessage(this.state.fieldText, this.props.parent);
    this.props.postMessage(this.props.messages.find((message) => message._id === this.props.parent).input, this.props.parent, this.props.discussionId);
    e.preventDefault();
  }

  handleReplyBtnClick(e) {
    this.props.toggleReplyBoxVisibility(this.props.parent, !this.props.messages.find((message) => message._id === this.props.parent).showReplyBox);
    e.preventDefault();
  }

  render() {

    let filteredList = this.props.messages.filter((message) => {
      return message.parent === this.props.parent;
    });

    var textList = filteredList.map((message, i) => {
      return <li className="messageText" key={i}>{message.text}
        <MessageListContainer
        discussionId={this.props.discussionId}
        parent={message._id}
        postMessage={this.props.postMessage}
        addMessage={this.props.addMessage}
        />
      </li>;
    }).reverse();

    let replyText = this.props.replyText || "reply";

    let replyButton = <a href='#' className="replyButton" onClick={this.handleReplyBtnClick} >{replyText}</a>;

    let thisMessage = this.props.messages.find((message => message._id === this.props.parent));
    let isLoading = thisMessage.waitingMessageResponse;
    let notification = thisMessage.notification;
    let input = thisMessage.input || "";
    let showReplyBox = thisMessage.showReplyBox || false;

    let isDisabled = isLoading;

    let replyForm;

    if (showReplyBox) {
      replyForm =
      <div className="replyBox">
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea  rows="4" className="messageInput" autoFocus  type="text" disabled={isDisabled} value={input} name="fieldText" onChange={this.handleInputChange}></textarea>
        </label>
        <input type="submit" disabled={isDisabled} value="Send" />
        <div className="notification">{isLoading ? 'loading...' : null }{notification} </div>
      </form>
    </div>;
    } else {
      replyForm = null;
    }


    if (!this.props.isFetching){
      return (
        <div className="message">
          {replyButton}
          {replyForm}

          <ul className="messageList">
            {textList}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Message;

Message.propTypes = {
  messages: PropTypes.array.isRequired,
  parent: PropTypes.string.isRequired,
  postMessage: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired,
  toggleReplyBoxVisibility: PropTypes.func.isRequired,
  discussionId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  replyText:  PropTypes.string.isRequired

};
