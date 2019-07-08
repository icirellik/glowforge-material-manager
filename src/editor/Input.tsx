import React from 'react';
import uuid from 'uuid/v4';

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
  valid: boolean;
}

export class InputText extends React.Component<InputProps, InputState> {

  private id: string;

  constructor(props: InputProps) {
    super(props);
    this.state = {
      valid: true,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);

    this.id = uuid();
  }

  onBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (this.props.validate && this.state.valid !== !!event.target.value) {
      this.props.validate(this.id, !!event.target.value);
      this.setState({
        valid: !!event.target.value,
      });
    }
    this.props.onBlur(event);
  }

  onChange(event: React.FocusEvent<HTMLInputElement>) {
    if (this.props.validate && this.state.valid !== !!event.target.value) {
      this.props.validate(this.id, !!event.target.value);
      this.setState({
        valid: !!event.target.value,
      });
    }
    this.props.onChange(event);
  }

  render() {
    const props = this.props;
    return (
      <div className="form-field">
        <label>{props.label}</label>
        <input
          className={(!this.state.valid) ? "invalid" : undefined}
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
    this.state = {
      valid: true,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);

    this.id = uuid();
  }

  onBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (this.props.validate && this.state.valid !== !!event.target.value) {
      this.props.validate(this.id, !!event.target.value);
      this.setState({
        valid: !!event.target.value,
      });
    }
    this.props.onBlur(event);
  }

  onChange(event: React.FocusEvent<HTMLInputElement>) {
    if (this.props.validate && this.state.valid !== !!event.target.value) {
      this.props.validate(this.id, !!event.target.value);
      this.setState({
        valid: !!event.target.value,
      });
    }
    this.props.onChange(event);
  }

  render() {
    const props = this.props;
    return (
      <div className="form-field">
        <label>{props.label}</label>
        <input
          className={(!this.state.valid) ? "invalid" : undefined}
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
    this.state = {
      valid: true,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChecked = this.onChecked.bind(this);

    this.id = uuid();
  }

  onBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (this.props.validate && this.state.valid !== !!event.target.value) {
      this.props.validate(this.id, !!event.target.value);
      this.setState({
        valid: !!event.target.value,
      });
    }
    this.props.onBlur(event);
  }

  onChange(event: React.FocusEvent<HTMLInputElement>) {
    if (this.props.validate && this.state.valid !== !!event.target.value) {
      this.props.validate(this.id, !!event.target.value);
      this.setState({
        valid: !!event.target.value,
      });
    }
    this.props.onChange(event);
  }

  onChecked(event: React.FocusEvent<HTMLInputElement>) {
    if (this.props.validate && this.state.valid !== !!event.target.value) {
      this.props.validate(this.id, !!event.target.value);
      this.setState({
        valid: !!event.target.value,
      });
    }
    this.props.onChecked(event);
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
          className={(!this.state.valid) ? "invalid" : undefined}
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
