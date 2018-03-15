import React, { Component } from 'react';

class Materials extends Component {
  render() {
    const { materials } = this.props
    return (
      <div>
      {
        materials.map(material => {
          return (
            <div>{material.title}</div>
          );
        })
      }
      </div>
    );
  }
}

export default Materials;
