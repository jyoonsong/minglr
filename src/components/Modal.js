import React from "react";

class Modal extends React.Component {
    render() {
        const { text } = this.props;
        return(
            <div className="modal-container">
                <div className="modal">
                    You can talk at: &nbsp;
                    <a href={text} target="_blank">{text}</a>
                </div>
            </div>
        )
    }
}

export default Modal;