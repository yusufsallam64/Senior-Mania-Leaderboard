import { TeamEntry } from "@/pages";

interface LeaderboardEntryProps {
    // rank: number;
    // name: string;
    // score: number;
    // change: string;
    team: TeamEntry;
    idx: number;
}

export const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ team, idx }) => {
    return (
        <div className={`entry down`}>
            <div className="rank">{idx}</div>
            <div className="name">{team.teamName}</div>
            <div className="score">{team.points}</div>
        </div>
    );
};