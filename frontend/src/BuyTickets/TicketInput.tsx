import { Form } from 'react-bootstrap';
import { FunctionComponent, ReactElement } from 'react';

type TicketInputChangeHandler = (newValue: string) => void;
interface TicketInputProps {
  value: number;
  onChange: TicketInputChangeHandler;
  available: number;
  labelText: string;
  availableText: string;
}

const TicketInput: FunctionComponent<TicketInputProps> = ({ available, availableText, labelText, value, onChange }): ReactElement => (
  <Form.Group className='mb-3' controlId='formBasicEmail'>
    <Form.Label>{ labelText }</Form.Label>
    <Form.Control type='number' value={ value } onChange={ (event): void => onChange(event.target.value) } />
    <Form.Text className='text-muted'>
      Noch { available } { availableText } verfügbar.
    </Form.Text>
  </Form.Group>
);

export {
  TicketInput,
  TicketInputChangeHandler
};
