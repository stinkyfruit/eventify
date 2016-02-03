/**
 *    Created Events by User Component
 *    
 */

import React, { Component } from 'react';

//Components
import SmallEventCards from './SmallEventCards';

export default class CreatedEventsList extends Component {

  render() {
    return (
      <ul className='collection'>
      
        {
          this.props.data.map((event, index) => {
            return <SmallEventCards key={index} event={event} />;
          })
        }
        
      </ul>
    );
  }
  
}

