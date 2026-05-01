/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-launch-arguments', () => ({
  LaunchArguments: {
    value: () => ({}),
  },
}));

const testGlobal = globalThis as typeof globalThis & {
  window?: {
    dispatchEvent?: () => boolean;
  };
};

if (typeof testGlobal.window !== 'undefined' && typeof testGlobal.window.dispatchEvent !== 'function') {
  testGlobal.window.dispatchEvent = () => true;
}

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
