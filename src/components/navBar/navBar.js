import React from 'react';
import { connect } from 'react-redux';

import SignupModal from '../auth/SignupModal';
import SigninModal from '../auth/SigninModal';
import LogoutBtn from '../auth/LogoutBtn';
import CreateEventBtn from '../create-event/createBtn';

class NavBar extends React.Component {


  componentDidMount() {
    console.log('navbar auth props check: ', this.props.isLoggedIn);
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <nav  role="navigation">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Eventify</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li> <CreateEventBtn /></li>
                <li> <LogoutBtn /> </li>
              </ul>
          </div>
        </nav>
      );
    }

    return (
      <nav  role="navigation">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Eventify</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li> <SignupModal /></li>
              <li> <SigninModal /></li>
            </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { isLoggedIn: state.events.isLoggedIn };
}

export default connect(mapStateToProps)(NavBar);
