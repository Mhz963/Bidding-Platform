// Import React
import React, { useState } from "react";

// Define a functional component
function BiddingPlatform() {
  // Define state for projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project 1",
      description: "Description of project 1",
      budget: 100,
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description of project 2",
      budget: 200,
    },
    {
      id: 3,
      title: "Project 3",
      description: "Description of project 3",
      budget: 300,
    },
  ]);

  // Define state for form inputs
  const [projectId, setProjectId] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  // Function to handle form submission for placing bid
  const submitBid = (event) => {
    event.preventDefault(); // Prevent form submission
    if (!projectId || isNaN(bidAmount) || bidAmount <= 0) {
      alert("Please enter a valid project ID and bid amount.");
      return;
    }
    // Here you can perform further validation or make an API call to submit the bid
    alert(
      `Bid placed successfully for project ID ${projectId} with amount $${bidAmount}.`
    );
    // Clear form fields
    setProjectId("");
    setBidAmount("");
  };

  // Function to place bid on a project
  const placeBid = (projectId) => {
    const bidAmount = prompt("Enter your bid amount:");
    if (bidAmount !== null) {
      // Here you can perform validation and make an API call to submit the bid
      alert(
        `Bid placed successfully for project ID ${projectId} with amount $${bidAmount}.`
      );
    }
  };

  return (
    <div className="container">
      <h1>Bidding Platform</h1>

      <div id="projects">
        {/* Render projects */}
        {projects.map((project) => (
          <div key={project.id} className="project">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Budget: ${project.budget}</p>
            {/* Button to place bid */}
            <button onClick={() => placeBid(project.id)}>Place Bid</button>
          </div>
        ))}
      </div>

      <div className="bid-form">
        <h2>Place Bid</h2>
        {/* Bid form */}
        <form onSubmit={submitBid}>
          <label htmlFor="projectId">Project ID:</label>
          <input
            type="text"
            id="projectId"
            name="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="bidAmount">Bid Amount ($):</label>
          <input
            type="number"
            id="bidAmount"
            name="bidAmount"
            min="0"
            step="0.01"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">Submit Bid</button>
        </form>
      </div>
    </div>
  );
}

// Export the component
export default BiddingPlatform;
