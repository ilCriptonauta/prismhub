export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    status: "upcoming" | "live" | "past";
    type: "governance" | "mint" | "community" | "reward";
    link?: string;
    image?: string;
}

export const EVENTS_DATA: Event[] = [
    {
        id: "1",
        title: "$ONX VOTE",
        description: "Your voice matters! Support your favorite projects and artists within the MultiversX ecosystem. Each vote contributes to their ranking and monthly rewards eligibility.",
        date: "Continuous",
        status: "live",
        type: "governance",
        link: "/ranking"
    },
    {
        id: "2",
        title: "OOX Marketplace Launch",
        description: "Celebrating the official launch of the simplest and fastest marketplace on MultiversX.",
        date: "Live Now",
        status: "past",
        type: "community",
        link: "https://oox.art"
    },
    {
        id: "3",
        title: "Bear Hunt",
        description: "Join the hunt! List your NFTs on OOX using $RARE token to enter the raffle. One lucky winner will receive a legendary SuperRareBears NFT.",
        date: "March 2026",
        status: "upcoming",
        type: "community",
        link: "https://oox.art",
        image: "/images/events/bear-hunt.png"
    },
    {
        id: "4",
        title: "January Ranking Rewards",
        description: "Distribution of rewards to the top 3 projects from the January leaderboard.",
        date: "Jan 31, 2026",
        status: "past",
        type: "reward"
    }
];
