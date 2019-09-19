import React from "react";
//routing
import {Link} from "react-router-dom";
//redux
import {connect} from "react-redux";

function Nav(props) {
    return (
        <nav>
            <h1>DevJobs</h1>

            {
                props.isEmployer === true ?
                <Link to="/employer">
                    <button>
                        Profile
                    </button>
                </Link>
                : props.isEmployer === false ?
                <Link to="/user">
                    <button>
                        Profile
                    </button>
                </Link>
                : props.isEmployer === undefined ?
                <Link to="/login">
                    <button>
                        Login
                    </button>
                </Link>
                : null
            }
            <Link to="/">
                <button>
                    Jobs
                </button>
            </Link>

        </nav>
    )
}

function mapStateToProps(reduxState) {
    console.log(reduxState);
    return {
        isEmployer: reduxState.user.isEmployer
    }
}

export default connect(mapStateToProps)(Nav);