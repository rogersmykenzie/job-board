import React from "react";
//Should be able to post
//View their previous posts
import axios from "axios";

import Post from "./Post";


class EmployerLanding extends React.Component {
    constructor() {
        super();
        this.state = {
            postInfo: "",
            postTitle: "",
            pastPosts: []
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    updatePastPosts = postsArr => {
        this.setState({pastPosts: postsArr});
    }

    fetchPosts = () => {
        axios.get("/api/employer/posts").then(response => {
            this.setState({pastPosts: response.data})
        })
    }

    handleClick = e => {
        axios.post("/api/post", {
            postInfo: this.state.postInfo,
            postTitle: this.state.postTitle
        })
        this.fetchPosts();
    }

    render() {
        console.log(this.state.pastPosts);
        return (
            <>
                <h1>Make a post</h1>
                <input placeholder="title" 
                onChange={e => this.setState({postTitle: e.target.value})}
                />
                <textarea
                onChange={e => this.setState({postInfo: e.target.value})}>

                </textarea>
                <button
                onClick={this.handleClick}>Post!</button>
                <div
                style={{
                    "display": "flex",
                    "flexWrap": "wrap",
                    "width": "100vw"
                }}>
                    {this.state.pastPosts.map(individualPost => {
                        return (
                        <>
                            <Post 
                            postTitle={individualPost.title} 
                            postInfo={individualPost.info}
                            onEmployerLanding={true}
                            id={individualPost.id}
                            updatePastPosts={this.updatePastPosts}
                            />
                        </>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default EmployerLanding;