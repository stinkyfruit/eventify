/**
 *    
 *    Main Page for Create Event
 *    
 *    This is a Top-Level Element. It contains another component that has fields.
 *    
 */

//React Component and PropTypes(for routing)
import React, {Component, PropTypes} from 'react';

//Initializes state for the form that was populated and submitted
import {initialize} from 'redux-form';

//To bind this component to Redux's state
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Form that contains the actual fields
import CreateEventForm from './CreateEventForm';

//Get Action Factories to use in this Component to manipulate the Redux State
import {fetchEvents, auth, createEvent } from '../../actions/';

class CreateEventPage extends Component {
  
  //For routing
  static contextTypes = {
    router: PropTypes.object
  };
  
  //Go back to dashboard, when there is new Props (AKA: event has successfully posted)
  componentWillReceiveProps() {
    this.context.router.push('/dashboard');
  }
  
  //Handles data that comes with form submission of 'CreateEventForm' Component below. Data is a JSON with keys mapped to each input field.
  handleSubmit(data) {
    console.log('Submission Received!', data);
    
    //Dispatch createEvent Action which will in turn make a POST request to the server.
    this.props.createEvent(data);
    
    //TODO: make this initialize function work. Currently not working.
    // this.props.initialize('createEvent', {}, []);
  }
  
  render() {
    return (
      <div>
        <h1> Create Event </h1>
        <CreateEventForm onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

//Create a dispatcher out of 'createEvent' action item and then save it to this.props.createEvent
function mapDispatchToProps(dispatch) {
  return bindActionCreators({createEvent}, dispatch);
}

//Set up this.props.newEventPosted (this component's state) to Redux Store's state.events.createdEvent.
//Why? state.events.createdEvent has the latest added Event. If you look at createEvent action and reducer function, you can see that it will create a new property on the State called createEvent. And whenever that updates, this Component's state will update which will trigger a redirect.
function mapStateToProps(state) {
  return {
    newEventPosted: state.events.createdEvent
  };
}

//Export this Component with all the ties mentioned above.
export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);