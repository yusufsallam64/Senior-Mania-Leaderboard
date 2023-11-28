import Image from 'next/image';
import kingpng from './king.png';
import clipboard from './clipboard.png';
import googledrive from './google-drive.png';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// import creds from '../assets/senior-mania-svc-creds.json';
import { LeaderboardEntry } from '@/components/LeaderboardEntry';

export type TeamEntry = {
  teamName: string,
  points: number
}


export default function LeaderBoard( { teams }: { teams: TeamEntry[] }) {
    if(!teams[0]) return (<div><h1 className="bg-pink-600">Loading...</h1></div>);

    return (
        <div className="w-full bg-lowered text-white m-auto">
            <div className='flex pt-1 p-2.5 align-middle place-content-between'>
                <h1 className="m-auto text-2xl md:text-3xl font-bold text-center pb-0 py-4 md:py-8">👑 Senior Mania Leaderboard 👑</h1>
                <div className="max-sm:hidden fixed right-2 top-6 pt-3">
                    <Image 
                        className='hover:cursor-pointer w-12 h-12 mx-auto peer'
                        src={googledrive}
                        onClick={() => {window.open("https://drive.google.com/drive/u/1/folders/1UJnDfbiGWN_08yGfCraG97LZAAqDwqfd", "_blank")}}
                        alt="Go to Challenges" 
                    />
                    <div className="opacity-0 cursor-default select-none peer-hover:opacity-100 relative top-1 rounded-lg bg-alternate transition-opacity ease-in-out">
                        <h1 className="text-xs px-2 py-1">Challenges →</h1>
                    </div>
                </div>
            </div>


            <div className='flex m-2.5 h-60 md:h-96 max-md:px-3 sm:w-3/4 md:w-3/5 lg:w-1/2 mx-auto mt-12 place-content-end justify-center'>
                {/* TODO --> Add logic to figure out how tall they should be relative to each other. Would help in the event of a tie. */}
                <div className='w-1/3 h-2/3 mt-auto rounded-tl-2xl flex flex-col border-t-[8%] bg-alternate border-2 border-r-0 border-white/20'>
                    <h1 className="text-xl text-center font-semibold pt-2 sm:pt-4 break-all px-0.5">{teams[1].teamName}</h1>
                    <h2 className="text-gray-400 text-center sm:pt-2 text-xl">{teams[1].points} pts</h2>
                </div>
                <div className='w-1/3 relative flex flex-col rounded-t-2xl bg-alternate border-2 border-white/20'>
                    <Image 
                        className="w-8 h-8 md:w-12 md:h-12 absolute -top-10 md:-top-16 left-1/2 transform -translate-x-1/2"
                        src={kingpng}
                        alt=''
                    />
                    <h1 className="text-xl text-center font-semibold pt-4 break-all px-0.5">{teams[0].teamName}</h1>
                    <h2 className="text-yellow-300 text-center pt-2 text-xl">{teams[0].points} pts</h2>
                </div>
                <div className='w-1/3 mt-auto h-1/2 rounded-tr-2xl flex flex-col border-t-[8%] bg-alternate border-2 border-l-0 border-white/20'>
                    <h1 className="text-xl text-center font-semibold pt-2 sm:pt-4 break-all px-0.5">{teams[2].teamName}</h1>
                    <h2 className="text-amber-800 text-center sm:pt-2 text-xl">{teams[2].points} pts</h2>
                </div>
            </div>

            <div className='flex flex-col max-sm:mx-3 sm:w-3/4 rounded-lg mx-auto border-t-[px] mt-6 md:mt-10 align-middle overflow-y-scroll max-h-[50%] border-2 border-white/20 mb-4'>
                {teams.slice(3).map((user, idx) => (
                    <LeaderboardEntry key={idx} team={user} idx={idx} />
                ))}
            </div>
        </div>
    );
};

export async function getServerSideProps() { 
    const serviceAccountAuth = new JWT({
        // env var values here are copied from service account credentials generated by google
        // see "Authentication" section in docs for more info
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY,
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets.readonly',
        ],
    });

    const doc = new GoogleSpreadsheet('1xCXQvmwsHsqPLKhehIpf8an3NUlKT3obWrcEON_0gjA', serviceAccountAuth);
    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
    const rows = (await sheet.getRows({offset: 1}));

    let teamPoints: TeamEntry[] = [];

    rows.map((row) => {
        teamPoints.push({teamName: row.get('Team Name'), points: row.get('POINTS')});
    })

    let teams = teamPoints.sort((a, b) => b.points - a.points);

    return { 
        props: { teams }, 
    }; 
}