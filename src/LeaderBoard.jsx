import React from 'react';
import './Leaderboard.css';
import FirstPlaceIcon from "./assets/king.png";
import Drive_Icon from "./assets/google-drive.png";
const leaderboardData = [
    { id: 11, name: 'Taylor Jones', score: 2963, rank: 1, change: 'down' },
    { id: 10, name: 'Alexander Wycoff', score: 2873, rank: 2, change: 'down' },
    { id: 3, name: 'Jamie Johnson', score: 2826, rank: 3, change: 'none' },
    { id: 2, name: 'Eiden', score: 2430, rank: 4, change: 'none' },
    { id: 6, name: 'Taylor Davis', score: 2247, rank: 5, change: 'down' },
    { id: 7, name: 'Sam Williams', score: 1935, rank: 6, change: 'up' },
    { id: 9, name: 'Casey Williams', score: 1857, rank: 7, change: 'up' },
    { id: 1, name: 'Jackson', score: 1847, rank: 8, change: 'none' },
    { id: 4, name: 'Alex Miller', score: 1751, rank: 9, change: 'up' },
    { id: 12, name: 'Jamie Garcia', score: 1186, rank: 10, change: 'up' },
    { id: 8, name: 'Jamie Williams', score: 901, rank: 11, change: 'down' },
    { id: 5, name: 'Taylor Brown', score: 706, rank: 12, change: 'none' }
];

const navigatetoChallenges = () => {
    window.open("https://drive.google.com/drive/u/1/folders/1UJnDfbiGWN_08yGfCraG97LZAAqDwqfd", "_blank");
};

const LeaderboardEntry = ({ rank, name, score, change }) => {
    return (
        <div className={`entry ${change}`}>
            <div className="rank">{rank}</div>
            <div className="name">{name}</div>
            <div className="score">{score}</div>
        </div>
    );
};

const Leaderboard = () => {
    return (
        <div className="main">
            <div className='header'>
                <div className='title-container'>
                    <h1>SENIOR MANIA LEADERBOARD</h1>
                </div>
                <button onClick={navigatetoChallenges} className="challenges-button">
                    <img src={Drive_Icon} alt="Go to Challenges" />
                </button>
            </div>


            <div className='podium'>
                <div className='second-place'>
                    <h1 className="name">{leaderboardData[1].name}</h1>
                    <h2 className="score" style={{ color: "#e6e8fa" }}>{leaderboardData[1].score}</h2>
                </div>
                <div className='first-place'>
                    <img src={FirstPlaceIcon} alt='' />
                    <h1 className="name">{leaderboardData[0].name}</h1>
                    <h2 className="score" style={{ color: "#ffd700" }}>{leaderboardData[0].score}</h2>
                </div>
                <div className='third-place'>
                    <h1 className="name">{leaderboardData[2].name}</h1>
                    <h2 className="score" style={{ color: "#cd7f32" }}>{leaderboardData[2].score}</h2>
                </div>
            </div>

            <div className='leaderboard'>
                {leaderboardData.slice(3).map(user => (
                    <LeaderboardEntry key={user.id} {...user} />
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
