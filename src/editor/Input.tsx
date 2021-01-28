import React from 'react';
import { v4 as uuid } from 'uuid';
import { asInteger } from '../lib/utils';
import { IconHelp } from '../icons/IconHelp';

interface InputProps {
  isDisabled?: boolean;
  help?: string;
  label: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  propValidation?: {[key: string]: boolean | null};
  // Is set then the field will be validated and this callback will be called.
  validate?: (id: string, isValid: boolean | null) => void;
}

interface InputNumberProps extends InputProps {
  min?: string;
  max?: string;
}

interface InputNumberWithCheckBoxProps extends InputNumberProps {
  isChecked: boolean;
  onChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class InputText extends React.Component<InputProps> {
  private id: string;

  constructor(props: InputProps) {
    super(props);

    this.id = uuid();

    if (props.validate && props.value) {
      this.validate(props.value);
    } else if (props.validate) {
      props.validate(this.id, null);
    }

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillUnmount() {
    const { validate } = this.props;
    if (validate) {
      validate(this.id, true);
    }
  }

  onBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { onBlur } = this.props;
    this.validate(event.target.value);
    onBlur(event);
  }

  onChange(event: React.FocusEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    this.validate(event.target.value);
    onChange(event);
  }

  validate(value: any) {
    const { validate } = this.props;
    if (validate) {
      validate(this.id, !!value);
    }
  }

  render() {
    const {
      isDisabled,
      label,
      propValidation,
      validate,
      value,
    } = this.props;
    let className: string | undefined;
    if (
      validate && propValidation
      && propValidation[this.id] !== null
      && propValidation[this.id] !== undefined
    ) {
      className = (!propValidation[this.id]) ? 'invalid' : undefined;
    }
    return (
      <div className="form-field">
        <label>{label}</label>
        <input
          className={className}
          disabled={isDisabled}
          onBlur={this.onBlur}
          onChange={this.onChange}
          type="text"
          value={value}
        />
      </div>
    );
  }
}

export class InputNumber extends React.Component<InputNumberProps> {
  private id: string;

  constructor(props: InputNumberProps) {
    super(props);

    this.id = uuid();

    if (props.validate && props.value) {
      this.validate(props.value);
    } else if (props.validate) {
      props.validate(this.id, null);
    }

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillUnmount() {
    const { validate } = this.props;
    if (validate) {
      validate(this.id, true);
    }
  }

  onBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { onBlur } = this.props;
    this.validate(event.target.value);
    onBlur(event);
  }

  onChange(event: React.FocusEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    this.validate(event.target.value);
    onChange(event);
  }

  validate(value: any) {
    const { max, min, validate } = this.props;
    if (validate) {
      let isValid = !!value;

      if (min && max) {
        isValid = asInteger(min) <= asInteger(value) && asInteger(max) >= asInteger(value);
      } else if (min) {
        isValid = asInteger(min) <= asInteger(value);
      } else if (max) {
        isValid = asInteger(max) >= asInteger(value);
      }

      validate(this.id, isValid);
      this.setState({
        firstRender: false,
        valid: isValid,
      });
    } else {
      this.setState({
        firstRender: false,
      });
    }
  }

  render() {
    const {
      help,
      isDisabled,
      label,
      max,
      min,
      propValidation,
      validate,
      value,
    } = this.props;
    let className: string | undefined;
    if (
      validate && propValidation
      && propValidation[this.id] !== null
      && propValidation[this.id] !== undefined
    ) {
      className = (!propValidation[this.id]) ? 'invalid' : undefined;
    }

    let helpIcon: React.ReactElement | null = null;
    if (help) {
      helpIcon = (<IconHelp className="form-field__help" height="16" width="16" title={help} />);
    }
    return (
      <div className="form-field">
        <label>
          {label}
          {helpIcon}
        </label>
        <input
          className={className}
          disabled={isDisabled}
          max={max}
          min={min}
          onBlur={this.onBlur}
          onChange={this.onChange}
          type="number"
          value={value}
        />
      </div>
    );
  }
}

export class InputNumberWithCheckbox extends React.Component<InputNumberWithCheckBoxProps> {
  private id: string;

  constructor(props: InputNumberWithCheckBoxProps) {
    super(props);

    this.id = uuid();

    if (props.validate && props.value) {
      this.validate(props.value);
    } else if (props.validate) {
      props.validate(this.id, null);
    }

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChecked = this.onChecked.bind(this);
  }

  componentWillUnmount() {
    const { validate } = this.props;
    if (validate) {
      validate(this.id, true);
    }
  }

  onBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { onBlur } = this.props;
    this.validate(event.target.value);
    onBlur(event);
  }

  onChange(event: React.FocusEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    this.validate(event.target.value);
    onChange(event);
  }

  onChecked(event: React.FocusEvent<HTMLInputElement>) {
    const { onChecked } = this.props;
    this.validate(event.target.value);
    onChecked(event);
  }

  validate(value: any) {
    const { max, min, validate } = this.props;
    if (validate) {
      let isValid = !!value;

      if (min && max) {
        isValid = asInteger(min) <= asInteger(value) && asInteger(max) >= asInteger(value);
      } else if (min) {
        isValid = asInteger(min) <= asInteger(value);
      } else if (max) {
        isValid = asInteger(max) >= asInteger(value);
      }

      validate(this.id, isValid);
      this.setState({
        firstRender: false,
        valid: isValid,
      });
    } else {
      this.setState({
        firstRender: false,
      });
    }
  }

  render() {
    const {
      isChecked,
      isDisabled,
      label,
      max,
      min,
      propValidation,
      validate,
      value,
    } = this.props;
    let className: string | undefined;
    if (
      validate && propValidation
      && propValidation[this.id] !== null
      && propValidation[this.id] !== undefined
    ) {
      className = (!propValidation[this.id]) ? 'invalid' : undefined;
    }
    return (
      <div className="form-field">
        <div className="form-field-right">
          <label>{label}</label>
          <label className="label">Max Power</label>
          <input
            type="checkbox"
            value={isChecked ? 1 : 0}
            checked={isChecked}
            onChange={this.onChecked}
            onBlur={this.onBlur}
          />
        </div>
        <input
          className={className}
          disabled={isDisabled}
          max={max}
          min={min}
          onBlur={this.onBlur}
          onChange={this.onChange}
          type="number"
          value={value}
        />
      </div>
    );
  }
}
