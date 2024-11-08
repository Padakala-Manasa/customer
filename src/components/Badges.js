import React from 'react';
import './Badges.css';

const badgeData = [
  { id: 1, name: 'First Badge', description: 'Awarded for completing your first quiz!' },
  { id: 2, name: 'Quiz Master', description: 'Achieved after answering 10 quizzes correctly.' },
  { id: 3, name: 'Feedback Contributor', description: 'Given for providing valuable feedback.' },
  { id: 4, name: 'Suggestions Champion', description: 'Earned for submitting helpful suggestions.' },
  { id: 5, name: 'Engagement Enthusiast', description: 'Secured by participating in community discussions.' },
];

function Badges() {
  return (
    <div className="badges-container">
      <h2>Available Badges</h2>
      <div className="badges-panel">
        <div className="badges-list">
          {badgeData.map((badge) => (
            <div key={badge.id} className="badge">
              <h3>{badge.name}</h3>
            </div>
          ))}
        </div>
        <div className="badge-descriptions">
          {badgeData.map((badge) => (
            <div key={badge.id} className="badge-description">
              <h3>{badge.name}</h3>
              <p>{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Badges;
