import { connect } from 'react-redux';
import { receiveMessage, postMessage, changeInput , toggleReplyBoxVisibility} from '../actions/actions';

import Message from '../components/Message';


const mapStateToProps = state => {

  return {
    messages: state.discussion.messages,
    isFetching: state.page.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveMessage: (text, parent) => {
      dispatch(receiveMessage(text, parent));
    },
    postMessage: (text, parent, conversationId) => {
      dispatch(postMessage(text, parent, conversationId));
    },
    changeInput: (id, input) => {
      dispatch(changeInput(id, input));
    },
    toggleReplyBoxVisibility: (id, visibility) => {
      dispatch(toggleReplyBoxVisibility(id, visibility));
    }
  };
};

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(Message);

export default ListContainer;
