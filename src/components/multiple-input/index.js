import React, { Component } from 'react';
import './styles.css'

class MultipleInput extends Component {

    lastItem = null;

    state = {
        newValue: '',
        data: []
    };

    componentWillMount() {
        this.setState({data: this.props.data || []})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({data: nextProps.data || []})
    }

    onChange = async (index, value) => {
        if (this.props.maxLength !== undefined && value.length > this.props.maxLength) return;
        if (index === -1)  // add element
        {
            this.setState({newValue: value});
            this.state.data.push(value);
        }
        else if (value === "")  // delete element
        {
                this.state.data.splice(index, 1)
        }
        else  // change element
        {
            this.state.data[index] = value;
        }

        await this.forceUpdate();
        if (index === -1 && this.lastItem !== null ) {
            await this.setState({newValue: ''});
            this.lastItem.focus();
        }

        this.props.onChange(this.state.data);
    };

    render() {
        const {size, inputStyles, max, placeholder} = this.props;
        let inputClassName = 'multiple-input-default';
        if (size === "large" || size === "default" || size === "small") {
            inputClassName = 'multiple-input-' + size;
        }

        return (
            <div className='multiple-input-container'>
                {
                    this.state.data.map((text, index) => (
                        <input className={inputClassName}
                               style={inputStyles}
                               key={index}
                               value={text}
                               onChange={e => this.onChange(index, e.target.value)}
                               ref={node => this.lastItem = node}
                        />
                    ))
                }
                {
                    (max === undefined || max > this.state.data.length) ?
                        <input className={inputClassName}
                               style={this.state.inputStyles}
                               onChange={e => this.onChange(-1, e.target.value, e.target)}
                               value={this.state.newValue}
                               placeholder={placeholder}
                        />
                        :
                        null
                }
            </div>
        );
    }
}

export default MultipleInput;
