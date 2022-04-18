
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/App.tsx';
reactComponents['App'] = Component0;

import Component1 from '../src/pages/Comic.tsx';
reactComponents['Comic'] = Component1;

import Component2 from '../src/pages/ErrorPage.tsx';
reactComponents['ErrorPage'] = Component2;

import Component3 from '../src/components/ErrorSection.tsx';
reactComponents['ErrorSection'] = Component3;

import Component4 from '../src/pages/Home.tsx';
reactComponents['Home'] = Component4;

import Component5 from '../src/components/Image.tsx';
reactComponents['Image'] = Component5;

import Component6 from '../src/components/Masonry.tsx';
reactComponents['Masonry'] = Component6;