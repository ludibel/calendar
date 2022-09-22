import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import {
  render,
  renderHook,
  act,
  screen,
  fireEvent,
} from '@testing-library/react';
import useModal from '../hooks/useModal';

import { vi } from 'vitest';

import Modal from '../components/Modal';
import Calendar from '../components/Calendar';

describe('Show modal', () => {
  //test de l'ouverture de la modal au clic sur le bouton
  test('open modalpenModal', () => {
    render(<Calendar />);
    fireEvent.click(screen.getByTestId('open-modal'));
    // TO DO expect
  });
});

describe('useModal', () => {
  // test que que toggleOpenings modifie bien le state openModal à true (car il est à false en initial)
  test('setopenModal change openModal', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.toggleOpenings();
    });

    expect(result.current.openModal).toBe(true);
  });
});

describe('Modal Component test with Portal', () => {
  // test que la Modal est bien rendu avec reactDOM portal on monte alors le portal avant de faire le test
  let mockHideModal: () => void;
  // avant on definit hide vi.fn va créer un espion sur une fonction
  beforeEach(() => {
    mockHideModal = vi.fn();
  });
  // Avant on crée le portal react
  beforeAll(() => {
    ReactDOM.createPortal = vi.fn((element) => {
      return element;
    });
  });
  // Après  on supprime le protal
  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });
  test('Show Modal correctly', () => {
    const { container } = render(
      <Modal
        openModal={true}
        hide={mockHideModal}
        headerTitle='Modal test'
        modalContent={
          <Fragment>
            Ton rendez-vous du XXX à HH:mm à bien éte enregistré
          </Fragment>
        }
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
