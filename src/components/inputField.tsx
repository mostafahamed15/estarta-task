//import liraries
import Form from 'react-bootstrap/Form';

interface IField {
  type: 'text' | 'select' | 'date' | 'number';
  label: string;
  placeholder?: string;
  name: string;
  value?: string;
  onChange?: any;
  disabled?: boolean;
  list?: any[];
  min?: string;
  max?: string;
}
// create a component
export const InputField = ({
  type,
  label,
  placeholder,
  onChange,
  value,
  name,
  min,
  max,
  disabled,
  list = [],
}: IField) => {
  return (
    <div>
      {type !== 'select' && (
        <Form.Group className="mb-3">
          <Form.Label className="m-1">{label}</Form.Label>
          <Form.Control
            name={name}
            disabled={disabled}
            onChange={(e) => onChange(name, e.target.value)}
            value={value}
            type={type}
            placeholder={placeholder}
            min={min}
            max={max}
          />
        </Form.Group>
      )}
      {type === 'select' && (
        <Form.Group className="mb-3">
          <Form.Label className="m-1">{label}</Form.Label>
          <Form.Select
            disabled={disabled}
            name={name}
            onChange={(e) => onChange(name, e.target.value)}
          >
            <option value={''}> select</option>
            {list.map((item: { value: string; text: string }, i: number) => (
              <option value={item.value} key={i}>
                {item.text}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}
    </div>
  );
};
