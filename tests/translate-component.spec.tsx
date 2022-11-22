import 'mocha';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { expect } from 'chai';
var jsdom = require('mocha-jsdom');

import { QueryClient, QueryClientProvider } from 'react-query';
import { Translate } from '../src/components/Translate';
import { translate } from '../src/scripts/translate';

global.document = jsdom({
  url: 'http://localhost:3000/'
});

let rootContainer: HTMLElement | null;

beforeEach(() => {
  rootContainer = document.createElement('h1');
  document.body.appendChild(rootContainer);
});

afterEach(() => {
  if (rootContainer)
    document.body.removeChild(rootContainer);
  rootContainer = null;
});

describe('Translate Component Testing', () => { 
  // May fail due to poor network conditions, but does not in good connections
  it('Translate method gets translation string, and <Translate /> Renders Hello in French', (done) => {
    const queryClient = new QueryClient();
    act(() => {
      ReactDOM.render(
        <QueryClientProvider client={queryClient}>
          <Translate to='fr' from='en'>Hello</Translate>
        </QueryClientProvider>,
        rootContainer,
      );
    });

    translate('Hello', { from: 'en', to: 'fr' })
    .then(res => {
      expect(res).to.include('Bonjour');
    })
    .then(() => {
      if (rootContainer) {
        expect(rootContainer?.textContent).to.include('Bonjour');
      }
      done();
    })
  });
});