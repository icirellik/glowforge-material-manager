import React from 'react';
import uuid from 'uuid/v4';
import { asInteger } from '../lib/utils';

interface InputProps {
  isDisabled?: boolean;
  label: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  // Is set then the field will be validated and this callback will be called.
  validate?: (id: string, isValid: boolean) => void;
}

interface InputNumberProps extends InputProps {
  min?: string;
  max?: string;
}

interface InputNumberWithCheckBoxProps extends InputNumberProps {
  isChecked: boolean;
  onChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputState {
  firstRender: boolean;
  valid: boolean;
}

export class InputText extends React.Component<InputProps, InputState> {

  private id: string;

  constructor(props: InputProps) {
    super(props);

    this.id = uuid();

    let valid = true;
    if (this.props.validate) {
      valid = !!props.value;
      this.props.validate(this.id, !!props.value);
    }

    this.state = {
      firstRender: true,
      valid,
    };

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
    if (this.props.validate && this.state.valid !== !!value) {
      this.props.validate(this.id, !!value);
      this.setState({
        firstRender: false,
        valid: !!value,
      });
    } else {
      this.setState({
        firstRender: false,
      });
    }
  }

  render() {
    const props = this.props;
    return (
      <div className="form-field">
        <label>{props.label}</label>
        <input
          className={(!this.state.valid && !this.state.firstRender) ? "invalid" : undefined}
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

export class InputNumber extends React.Component<InputNumberProps, InputState> {

  private id: string;

  constructor(props: InputNumberProps) {
    super(props);

    this.id = uuid();

    let valid = true;
    if (this.props.validate) {
      valid = !!props.value;
      this.props.validate(this.id, !!props.value);
    }

    this.state = {
      firstRender: true,
      valid,
    };

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
    return (
      <div className="form-field">
        <label>{props.label}</label>
        <input
          className={(!this.state.valid && !this.state.firstRender) ? "invalid" : undefined}
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

export class InputNumberWithCheckbox extends React.Component<InputNumberWithCheckBoxProps, InputState> {

  private id: string;

  constructor(props: InputNumberWithCheckBoxProps) {
    super(props);

    this.id = uuid();

    let valid = true;
    if (this.props.validate) {
      valid = !!props.value;
      this.props.validate(this.id, !!props.value);
    }

    this.state = {
      firstRender: true,
      valid,
    };

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
          className={(!this.state.valid && !this.state.firstRender) ? "invalid" : undefined}
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
