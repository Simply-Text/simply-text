import React, { Component } from "react";

export default class ExtractedTextHandler extends Component {
    render() {
        console.log(this.props.fullText);
        return (
            <p>{this.props.fullText !== undefined ? this.props.fullText.TextAnnotations.fullTextAnnotation.text : "No Extracted Text"}</p>
        );
    }
}