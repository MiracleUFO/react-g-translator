import React, { ReactElement} from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { expect, assert } from 'chai';
import 'mocha';
var jsdom = require('mocha-jsdom');

import { QueryClient, QueryClientProvider } from 'react-query';
import { Translate } from '../src/components/Translate';
import { translate } from '@vitalets/google-translate-api';

global.document = jsdom({
  url: 'http://localhost:3000/'
});

let rootContainer: HTMLElement | null;

beforeEach(() => {
  rootContainer = document.createElement('div');
  document.body.appendChild(rootContainer);
});

afterEach(() => {
  if (rootContainer)
    document.body.removeChild(rootContainer);
  rootContainer = null;
});

describe('App Component Testing', () => {
  it('Renders Hello in French', (done) => {
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
      expect(res.text).to.include('Bonjour');
      if (rootContainer) {
        expect(rootContainer?.textContent).to.include('Bonjour');
      }
      done();
    })
  });
});