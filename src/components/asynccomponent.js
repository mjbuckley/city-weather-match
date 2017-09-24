import React, { Component } from "react";

// This is technically a function, not a component, but it returns a component so I'm keeping it in the component directory. This function that takes a dynamically imported component as it's paremeter. It returns an emptyish sort of container component that will return the imported component once it has fully loaded. The purpose of this is to allow for code splitting so that all site code doesn't need to be loaded at once. For this app it is only used for one component, the Location page component. I'm using it becuase this allows the graphing library Chart.js to be loaded serparately from the home and other pages. The code here came from a blog post at https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html. The idea has been lightly modified to work with React Router v3 and also only applied to one route because all of the others would give no significant perfomance benefit. There is a bit a Webpack magic happening here that is hidden with Create Reat App, so the exact way Webpack knows to create a sepeate chunk is unclear, although I do know it is officially supported and works. See index.js for how/where this function is called from.
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
