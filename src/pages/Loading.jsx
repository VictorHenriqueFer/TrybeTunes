import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="flex justify-center items-center mx-auto">
        <div
          className="border-gray-300 h-16 w-16 animate-spin rounded-full
        border-8 border-t-blue-600"
        />
      </div>

    );
  }
}

export default Loading;
