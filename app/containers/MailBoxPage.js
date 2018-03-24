import { connect } from 'react-redux';
import Mailbox from '../components/Mailbox';

function mapStateToProps(state) {
  return {
    mailbox: state.mailbox
  };
}

export default connect(mapStateToProps)(Mailbox);
