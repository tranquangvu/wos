import React, { Component } from 'react';
import { connect } from 'react-redux';

class Promotions extends Component {
  render() {
    return(
      <div className='promotions-container'>
        <h1>All Promotions</h1>
      </div>
    )
  }
}

Promotions.propTypes = {}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Promotions);
