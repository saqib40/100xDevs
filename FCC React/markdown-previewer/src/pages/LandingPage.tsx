import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import custom styles

export default function LandingPage() {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigate = () => {
    navigate("/preview"); // Navigate to /preview route
  };

  return (
    <div className="landing-container">
      <div className="content">
        <h1 className="title">Markdown Previewer</h1>
        <p className="tagline">Made for the love of READMEs and open source</p>
        <button className="explore-button" onClick={handleNavigate}>
          Explore
        </button>
      </div>
    </div>
  );
}