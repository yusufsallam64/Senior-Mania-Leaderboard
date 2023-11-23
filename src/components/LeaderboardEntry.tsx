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
        <div className=" flex h-14 w-full place-content-center mx-auto p-2.5 justify-center border-b-2 last:border-b-0 border-white/20">
            <div className="my-auto mr-4 min-w-[30px] text-xl font-bold">{idx + 4}.</div>
            <div className="my-auto text-lg mr-auto text-ellipsis whitespace-nowrap overflow-hidden w-3/5">{team.teamName}</div>
            <div className="my-auto ml-auto font-bold text-lg">
               <h4 className="sm:hidden">{team.points}</h4>
               <h4 className="max-sm:hidden">{team.points} points</h4>
            </div>
        </div>
    );
};