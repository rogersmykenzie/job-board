import React from "react";
//packages
import axios from "axios";
//component
import Post from "./Post";


class JobListings extends React.Component {
    state = { //alternative to constructor
        posts: []
    }
    componentDidMount() {
        axios.get("/api/posts").then(response => {
            this.setState({posts: response.data});
        })
    }

    render() {
        return (
            <>
                <h1>JobListings</h1>
                {this.state.posts.map((val, i) => {
                    return <Post 
                        key={i}
                        postTitle={val.title}
                        postInfo={val.info}
                        onEmployerLanding={false}
                    />
                })}
            </>
        )
    }
}

export default JobListings;