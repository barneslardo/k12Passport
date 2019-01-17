import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Link to="/NewVisitor">
          <h2>Process new visitor</h2>
        </Link>
        <Link to="/api/newVisitor">Test apinewVisitor</Link>
      </div>
      <h1>Dashboard</h1>
      Currect Visitors:
    </div>
  );
};

export default Dashboard;
