import React from 'react';
import { connect } from 'react-redux';
import PageBase from './../PageBase';
import { parseLeaveData } from './utils';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [], // Initialize projects as empty array 
            newProjectTitle: '',
            newProjectDescription: '',
            newProjectBudget: ''
        };
    }

    // Function to handle form input change for new project details
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Function to handle submission of new project by admin
    submitNewProject = async (event) => {
        event.preventDefault();
        const { newProjectTitle, newProjectDescription, newProjectBudget } = this.state;

        // Send project details to backend for storage
        try {
            const response = await fetch('http://localhost:3001/api/projects', { // Update the URL to point to port 3001
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newProjectTitle,
                    description: newProjectDescription,
                    budget: newProjectBudget
                })
            });
            const data = await response.json();
            alert(data.message); // Display success message
            // Clear form fields after successful submission
            this.setState({
                newProjectTitle: '',
                newProjectDescription: '',
                newProjectBudget: ''
            });
        } catch (error) {
            console.error('Error submitting new project:', error);
            alert('Error submitting new project');
        }

    }

    placeBid = (projectId) => {
        const bidAmount = prompt('Enter your bid amount:');
        if (bidAmount !== null) {
            // Here you can perform validation and make an API call to submit the bid
            alert(`Bid placed successfully for project ID ${projectId} with amount $${bidAmount}.`);
        }
    }

    submitBid = (event) => {
        event.preventDefault(); // Prevent form submission
        const projectId = document.getElementById('projectId').value;
        const bidAmount = parseFloat(document.getElementById('bidAmount').value);
        if (isNaN(bidAmount) || bidAmount <= 0) {
            alert('Please enter a valid bid amount.');
            return;
        }
        // Here you can perform further validation or make an API call to submit the bid
        alert(`Bid placed successfully for project ID ${projectId} with amount $${bidAmount}.`);
        document.getElementById('bidForm').reset(); // Clear form fields
    }
    render() {
        if (this.props.Data === null) {
            this.props.history.push('/');
        }

        if (this.props.Data !== null) {
            let leaveData = null;
            let dashboardData =
                this.props.menuItem === 'My Leave'
                    ? this.props.Data.leaves.my_leave
                    : this.props.menuItem === 'New Leave'
                        ? this.props.Data.leaves.new_leave
                        : this.props.menuItem === 'Pending Leave Requests'
                            ? this.props.Data.pending_leaves
                            : this.props.menuItem === 'Approved Leaves'
                                ? this.props.Data.pending_leaves
                                : [];

            let finalData = parseLeaveData(dashboardData);
            if (this.props.previlige === 'ADMIN') {
                return (
                    <PageBase previlige={this.props.previlige} dashboardProps={this.props}>
                        <h1>{this.props.previlige}</h1>
                        <div>
                            <h2>This is Admin Dashboard</h2>
                            {/* Form for admin to submit new project */}
                            <form onSubmit={this.submitNewProject}>
                                <label htmlFor="newProjectTitle">Title:</label>
                                <input type="text" id="newProjectTitle" name="newProjectTitle" value={this.state.newProjectTitle} onChange={this.handleInputChange} required /><br /><br />
                                <label htmlFor="newProjectDescription">Description:</label>
                                <textarea id="newProjectDescription" name="newProjectDescription" value={this.state.newProjectDescription} onChange={this.handleInputChange} required /><br /><br />
                                <label htmlFor="newProjectBudget">Budget ($):</label>
                                <input type="number" id="newProjectBudget" name="newProjectBudget" value={this.state.newProjectBudget} onChange={this.handleInputChange} min="0" step="0.01" required /><br /><br />
                                <button type="submit">Submit Project</button>
                            </form>
                        </div>
                    </PageBase>
                );
            }
            if (this.props.previlige === 'USER') {
                return (
                    <PageBase previlige={this.props.previlige} dashboardProps={this.props}>
                        <h1>{this.props.previlige}</h1> <br />
                        {this.props.menuItem === 'Dashboard' ? (
                            <div>
                                {/* <h1>{this.props.Data !== null ? this.props.Data.email : 'anonymous'}</h1> */}

                                <h2>This is User Dashboard</h2>


                            </div>
                        ) : (

                            <div className="container" style={{ marginLeft: '20px' }}>
                                <h1>Bidding Platform</h1>
                                <div id="projects">
                                    {this.state.projects.map(project => (
                                        <div className="project" key={project.id}>
                                            <h2>{project.title}</h2>
                                            <p>{project.description}</p>
                                            <p>Budget: ${project.budget}</p>
                                            <button onClick={() => this.placeBid(project.id)}>Place Bid</button>
                                        </div>
                                    ))}
                                </div>
                                <div className="bid-form">
                                    <h2>Place Bid</h2>
                                    <form id="bidForm" onSubmit={this.submitBid}>
                                        <label htmlFor="projectId">Project ID:</label>
                                        <input type="text" id="projectId" name="projectId" required /><br /><br />
                                        <label htmlFor="bidAmount">Bid Amount ($):</label>
                                        <input type="number" id="bidAmount" name="bidAmount" min="0" step="0.01" required /><br /><br />
                                        <button type="submit">Submit Bid</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </PageBase>
                );
            }
        } else {
            return <h1>Loading...</h1>;
        }
    }
}

const mapState = (state) => {
    let { previlige, userName, password, isLoading } = state.AppReducer;
    let { menuItem } = state.pageBaseReducer;
    let Data = state.AppReducer[previlige === 'USER' ? 'userData' : 'adminData'];
    let bidding = state.AppReducer.bidding; // Include bidding state
    return { userName, password, isLoading, previlige, Data, menuItem, bidding };
};

const mapDispatch = (dispatch) => ({
    LoginAdmin: (props) => dispatch({ type: 'LOGIN', payload: { previlige: 'userLogin', userName: props.userName, password: props.password } }),
    LoginUser: (props) => dispatch({ type: 'LOGIN', payload: { previlige: 'adminLogin', userName: props.userName, password: props.password } }),
    onFieldChange: (value, key) => dispatch({ type: 'ON_FIELD_CHANGE', payload: { key, value } }),
    onBidChange: (value) => dispatch({ type: 'BID_CHANGE', payload: { value } }),
    placeBid: () => dispatch({ type: 'PLACE_BID' }),
    onBiddingButtonClick: () => { dispatch({ type: 'BIDDING_BUTTON_CLICK' }) }, // replace 'BIDDING_BUTTON_CLICK' with the actual action type
});

export default connect(mapState, mapDispatch)(Dashboard);
