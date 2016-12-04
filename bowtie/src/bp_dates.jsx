import React from 'react';
import { DatePicker } from '@blueprintjs/datetime';
// Be sure to include styles at some point, probably during your bootstrapping
// import 'react-select/dist/react-select.css';

var msgpack = require('msgpack-lite');

export default class BPDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: null};
    }

    handleChange = (value) => {
        this.setState({value});
        this.props.socket.emit(this.props.uuid + '#change', msgpack.encode(value));
    }

    componentDidMount() {
        var socket = this.props.socket;
        var uuid = this.props.uuid;
        socket.on(uuid + '#get', this.getValue);
    }

    getValue = (data, fn) => {
        fn(msgpack.encode(this.state.value));
    }

    render () {
        return (
            <DatePicker
                value={this.state.value}
                showActionBar={true}
                onChange={this.handleChange}
            />
        );
    }
}

BPDatePicker.propTypes = {
    uuid: React.PropTypes.string.isRequired,
    socket: React.PropTypes.object.isRequired,
};
