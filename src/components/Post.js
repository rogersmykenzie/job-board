import React from "react";

import axios from "axios";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inEditStatus: false,
            inputFieldText: "",
            textAreaText: ""
        }
    }
    // state = {
    //     inEditStatus: false,
    //     inputFieldText: 
    // }
    handleClick = e => {
        this.setState({inEditStatus: false});
        // console.log("Clicked")
        axios.put(`/api/post/${this.props.id}`, {
            info: this.state.textAreaText,
            title: this.state.inputFieldText
        }).then(response => {
            this.props.updatePastPosts(response.data);
        })
    }

    handleDelete = () => {
        axios.delete(`/api/post/${this.props.id}`).then(response => {
            this.props.updatePastPosts(response.data);
        })
    }

    render() {
        return (
            <div
            style={{
                "border": "1px solid black",
                "width": "30vw"
            }}>
                {
                    this.state.inEditStatus === false ?
                    <>
                        <h1>{this.props.postTitle}</h1>
                        <h2>{this.props.postInfo}</h2>
                    </>
                    :
                    <>
                        <input 
                        defaultValue={this.props.postTitle}
                        onChange={e => this.setState({inputFieldText: e.target.value})}
                        />
                        <textarea
                        onChange={(e) => this.setState({textAreaText: e.target.value})}
                        defaultValue={this.props.postInfo}
                        >
                        </textarea>
                    </>
                }
                {
                    this.props.onEmployerLanding === true ?
                    <>
                        {/* <button
                        onClick={() => this.setState({inEditStatus: true})}
                        >{this.state.inEditStatus === false ? "Edit" : "Save"}</button> */}
                        {this.state.inEditStatus === false ?
                            <button
                            onClick={() => this.setState({inEditStatus: true})}>
                                Edit
                            </button>
                        :
                            <button
                            onClick={this.handleClick}>
                                Save
                            </button>
                        }
                        <button
                        onClick={this.handleDelete}>Delete</button>
                    </>
                    : 
                    <button>Apply</button>
                }
            </div>
        )
    }
}

export default Post;