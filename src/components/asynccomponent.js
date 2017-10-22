import React, { Component } from "react";


/**
 * This component takes as its argument a function that dynamically imports another component. It
 * returns a placeholder until the component finishes importing, at which point that component is
 * returned. The purpose of this is to allow for code spliting. When used in index.js in the
 * routing, any component loaded with the AsyncComponent function will be split into a seperate
 * bundle by Webpack. Right now I'm only using this for the Location and MetroArea components
 * because they are the two pages with significant additional JS. The code here came from a blog
 * post at 'https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html'. The idea
 * has been lightly modified to work with React Router v3 and also not applied to all routes. See
 * index.js for how/where this function is called from.
 */
export default function asyncComponent(importComponent) {
  
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
