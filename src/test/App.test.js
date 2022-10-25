import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('check log-id filter if table has data', async () => {
  render(<App />);
  await new Promise((r) => setTimeout(r, 2000));
  userEvent.type(
    await screen.findByPlaceholderText(/e.g. 712087267864057/i, {}),
    '1055111'
  );
  const btnElm = screen.getByRole('button', {
    name: /Search Logger/i,
  });
  userEvent.click(btnElm);
  const elmt = screen.getByText(/105511100330504/i);
  expect(elmt).toBeInTheDocument();
});

test('check log-id filter if not exist data', async () => {
  render(<App />);
  await new Promise((r) => setTimeout(r, 2000));
  userEvent.type(
    await screen.findByPlaceholderText(/e.g. 712087267864057/i, {}),
    '906468196730000'
  );
  const btnElm = screen.getByRole('button', {
    name: /Search Logger/i,
  });
  userEvent.click(btnElm);
  const elmt = screen.getByText(/no data/i);
  expect(elmt).toBeInTheDocument();
});
