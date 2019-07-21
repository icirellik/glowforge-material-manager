import React from 'react';
import uuid from 'uuid/v4';
import { asInteger } from '../lib/utils';
import IconHelp from '../icons/IconHelp';

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

    if (this.props.validate && props.value) {
      this.validate(props.value);
    } else if (this.props.validate) {
      this.props.validate(this.id, null);
    }

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillUnmount() {
    if (this.props.validate) {
      this.props.validate(this.id, true);
    }
  }

  onBlur(event: React.FocusEvent<HTMLInputElement>) {
    this.validate(event.target.value);
    this.props.onBlur(event);
  }

  onChange(event: React.FocusEvent<HTMLInputElement>) {
    this.validate(event.target.value);
    this.props.onChange(event);
  }

  validate(value: any) {
    if (this.props.validate) {
      this.props.validate(this.id, !!value);
    }
  }

  render() {
    const props = this.props;
    let className: string | undefined;
    if (
      props.validate && props.propValidation &&
      props.propValidation[this.id] !== null &&
      props.propValidation[this.id] !== undefined
    ) {
      className = (!props.propValidation[this.id]) ? 'invalid' : undefined;
    }
    return (
      <div className="form-field">
        <label>{props.label}</label>
        <input
          className={className}
          disabled={props.isDisabled}
          onBlur={this.onBlur}
          onChange={this.onChange}
          type="text"
          value={props.value}
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

    if (this.props.validate && props.value) {
      this.validate(props.value);
    } else if (this.props.validate) {
      this.props.validate(this.id, null);
    }

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillUnmount() {
    if (this.props.validate) {
      this.props.validate(this.id, true);
    }
  }

  onBlur(event: React.FocusEvent<HTMLInputElement>) {
    this.validate(event.target.value);
    this.props.onBlur(event);
  }

  onChange(event: React.FocusEvent<HTMLInputElement>) {
    this.validate(event.target.value);
    this.props.onChange(event);
  }

  validate(value: any) {
    if (this.props.validate) {
      let isValid = !!value;

      if (this.props.min && this.props.max) {
        isValid = asInteger(this.props.min) <= asInteger(value) && asInteger(this.props.max) >= asInteger(value);
      } else if (this.props.min) {
        isValid = asInteger(this.props.min) <= asInteger(value);
      } else if (this.props.max) {
        isValid = asInteger(this.props.max) >= asInteger(value);
      }

      this.props.validate(this.id, isValid);
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
    const props = this.props;
    let className: string | undefined;
    if (
      props.validate && props.propValidation &&
      props.propValidation[this.id] !== null &&
      props.propValidation[this.id] !== undefined
    ) {
      className = (!props.propValidation[this.id]) ? "invalid" : undefined
    }

    let help: React.ReactElement | null = null;
    if (props.help) {
      help = (<IconHelp className="form-field__help" height="16" width="16" title={props.help} />);
    }
    return (
      <div className="form-field">
        <label>{props.label}{help}</label>
        <input
          className={className}
          disabled={props.isDisabled}
          max={props.max}
          min={props.min}
          onBlur={this.onBlur}
          onChange={this.onChange}
          type="number"
          value={props.value}
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

    if (this.props.validate && props.value) {
      this.validate(props.value);
    } else if (this.props.validate) {
      this.props.validate(this.id, null);
    }

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChecked = this.onChecked.bind(this);
  }

  componentWillUnmount() {
    if (this.props.validate) {
      this.props.validate(this.id, true);
    }
  }

  onBlur(event: React.FocusEvent<HTMLInputElement>) {
    this.validate(event.target.value);
    this.props.onBlur(event);
  }

  onChange(event: React.FocusEvent<HTMLInputElement>) {
    this.validate(event.target.value);
    this.props.onChange(event);
  }

  onChecked(event: React.FocusEvent<HTMLInputElement>) {
    this.validate(event.target.value);
    this.props.onChecked(event);
  }

  validate(value: any) {
    if (this.props.validate) {
      let isValid = !!value;

      if (this.props.min && this.props.max) {
        isValid = asInteger(this.props.min) <= asInteger(value) && asInteger(this.props.max) >= asInteger(value);
      } else if (this.props.min) {
        isValid = asInteger(this.props.min) <= asInteger(value);
      } else if (this.props.max) {
        isValid = asInteger(this.props.max) >= asInteger(value);
      }

      this.props.validate(this.id, isValid);
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
    const props = this.props;
    let className: string | undefined;
    if (
      props.validate && props.propValidation &&
      props.propValidation[this.id] !== null &&
      props.propValidation[this.id] !== undefined
    ) {
      className = (!props.propValidation[this.id]) ? "invalid" : undefined
    }
    return (
      <div className="form-field">
        <div className="form-field-right">
          <label>{props.label}</label>
          <label className="label">Max Power</label>
          <input
            type="checkbox"
            value={this.props.isChecked? 1 : 0}
            checked={this.props.isChecked}
            onChange={this.onChecked}
            onBlur={this.onBlur}
          />
        </div>
        <input
          className={className}
          disabled={props.isDisabled}
          max={props.max}
          min={props.min}
          onBlur={this.onBlur}
          onChange={this.onChange}
          type="number"
          value={props.value}
        />
      </div>
    );
  }
}
