import React from 'react';
import placeholder from '../../images/no-image.png';

/**
 * TimelapseImages
 *
 * props:
 * - images (array): array of image src.
 * - imageClass (string): className of the image.
 * - inputClass (string): className of the input.
 */
export class ImageTimelapse extends React.PureComponent {

    state = {
        index: 0,
        disabled: false
    }

    onSliderChange = (e) => {
        this.setState({index: e.target.value});
    }

    componentWillReceiveProps = (nextProps) => {
        // This resets the slider so that it doesn't try and
        // access an out of range array index when switching
        // sources.
        if (!nextProps.images) {
            this.setState({disabled: true, index: 0});
        } else {
            this.setState({disabled: false, index: nextProps.images.length -1});
        }
    }

    render() {
        if (!this.state.disabled) {
            return (
                <React.Fragment>
                    <img
                        src={this.props.images[this.state.index]} alt=''
                        className={this.props.imageClass} />
                    <input
                        className={this.props.inputClass}
                        type="range"
                        min="0"
                        value={this.state.index}
                        max={this.props.images.length - 1}
                        onChange={this.onSliderChange} />
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <img
                    src={placeholder} alt=''
                    className={this.props.imageClass} />
                <input
                    className={this.props.inputClass}
                    type="range"
                    value={this.state.index}
                    min="0"
                    max="1"
                    disabled />
            </React.Fragment>
        );
    }

}