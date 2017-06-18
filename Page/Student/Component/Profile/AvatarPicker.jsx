import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AvatarEditor from 'react-avatar-editor'
import Slider from 'material-ui/Slider'

const styles = {
    height: "400px",
    width: "400px",
    position: "relative",
    margin: "0 auto",

}

class AvatarPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 1.2,
            width: 250,
            height: 250,
        }
    }
    handleScale = (event, value) => {
      this.setState({scale: parseFloat(value)})
    }

    render () {
        return (
            <div>
                <div style={styles}>
                    <AvatarEditor
                        style={{width: "100%", height: "100%"}}
                        ref={this.props.setEditorRef}
                        scale={parseFloat(this.state.scale)}
                        width={this.state.width}
                        height={this.state.height}
                        border={50}
                        color={[255, 255, 255, 0.6]}
                        onSave={this.props.handleSave}
                        image={this.props.image}
                        crossOrigin="anonymous"
                        />
                </div>
                <div style={styles}>
                    <Slider
                        min={1}
                        max={2}
                        step={0.01}
                        value={this.state.scale}
                        onChange={this.handleScale}
                    />
                </div>
            </div>
        )
    }
}
module.exports = AvatarPicker;
