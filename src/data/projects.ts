export type ProjectStatus = "active" | "developing" | "minting";
export type ProjectCategory = "NFTS Project" | "Independent Artists";

export interface ProjectLinks {
    website?: string;
    twitter?: string;
    discord?: string;
    telegram?: string;
}

export interface MarketplaceCollection {
    label: string;
    ticker?: string;
    url?: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    category: ProjectCategory;
    tags: string[];
    image?: string;
    bannerImage?: string;
    links: ProjectLinks;
    status: ProjectStatus;
    featured?: boolean;
    featuredMonth?: string;
    ooxCollections?: (string | MarketplaceCollection)[]; // Array of tickers or custom collection objects
    isDailyBuilder?: boolean;
    isVerifiedCreative?: boolean;
    colors?: {
        primary: string;
        secondary: string;
    };
}

export const CATEGORIES: ProjectCategory[] = ["NFTS Project", "Independent Artists"];

export const PROJECTS_DATA: Project[] = [
    {
        id: "1",
        name: "Onionx Labs",
        description: "🧅 We are building OOX Marketplace on #MultiversX with our utility token $ONX",
        category: "NFTS Project",
        tags: ["Creative", "Ecosystem", "Lab"],
        status: "active",
        links: {
            website: "https://oox.art",
            twitter: "https://x.com/onionxlabs",
            discord: "https://discord.gg/WVSMrNzqNb",
            telegram: "https://t.me/OnionXLabs"
        },
        featured: true,
        featuredMonth: "January 2026",
        image: "/onionx-logo.jpg",
        bannerImage: "/onionx-banner.jpg",
        ooxCollections: [
            { label: "CHUBBY OnionX", url: "https://oox.art/marketplace/collections/CHBONX-3e0201" },
            { label: "OnionX Cards", url: "https://oox.art/marketplace/collections/ONXCRDS-ab712e" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "boogas",
        name: "Boogas",
        description: "Official Boogas project on MultiversX. Join the craziest community and discover our unique digital collectibles.",
        category: "NFTS Project",
        tags: ["PFP", "Community", "Art"],
        status: "active",
        links: { twitter: "https://x.com/BoogasNFT" },
        image: "/boogas-logo.jpg",
        bannerImage: "/boogas-banner.jpg",
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "2",
        name: "OwlKing7",
        description: "Visionary independent artist pushing the boundaries of pixel art and digital identity on MultiversX.",
        category: "Independent Artists",
        tags: ["Pixel Art", "Digital Identity", "Fine Art"],
        status: "active",
        links: { website: "https://multiversx.com", twitter: "https://twitter.com" },
        image: "/owlking-logo.jpg",
        bannerImage: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1000",
        ooxCollections: ["OWL-777777"],
        isVerifiedCreative: true
    },
    {
        id: "3",
        name: "BAXC DAO & Nerds",
        description: "The premier DAO and community for the bored and the brilliant on MultiversX. Building the future of the moon since 2022.",
        category: "NFTS Project",
        tags: ["DAO", "Community", "Nerds"],
        status: "active",
        links: { twitter: "https://twitter.com", discord: "https://discord.com" },
        image: "/baxc-logo-v2.jpg",
        bannerImage: "/baxc-banner-new.jpg",
        ooxCollections: ["BAXC-000001"],
        isDailyBuilder: true
    },
    {
        id: "4",
        name: "ilCriptonauta",
        description: "@OnionXLabs FOUNDER | ILLUSTRATOR - #Artemis collection | $EGLD Investor | visit OOX",
        category: "Independent Artists",
        tags: ["1/1 Art", "Illustrations", "Pop Culture"],
        status: "active",
        links: { twitter: "https://x.com/ilcriptonauta" },
        image: "/criptonauta-logo.jpg",
        bannerImage: "/criptonauta-banner.jpg",
        ooxCollections: [
            { label: "Artemis", url: "https://oox.art/marketplace/collections/ARTMIS-5ed14e" },
            { label: "Fantastic Beasts", url: "https://oox.art/marketplace/collections/BEASTS-8b80de" }
        ]
    },
    {
        id: "5",
        name: "EAPES",
        description: "The most vibrant community on MultiversX. Building tools, art and value for every holder through extreme innovation.",
        category: "NFTS Project",
        tags: ["Community", "PFP", "Innovation"],
        status: "active",
        links: { website: "https://multiversx.com", twitter: "https://twitter.com" },
        image: "/eapes-logo.jpg",
        bannerImage: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000",
        ooxCollections: ["EAPES-654321"]
    },
    {
        id: "6",
        name: "Super RARE Bears",
        description: "Let's make RARE tasty again. A elite collection of legendary bears building the next frontier of NFT utility on MultiversX.",
        category: "NFTS Project",
        tags: ["PFP", "Utility", "Elite"],
        status: "active",
        links: { website: "https://multiversx.com", twitter: "https://twitter.com" },
        image: "/srb-logo.png",
        bannerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
        ooxCollections: ["SRB-999999"],
        colors: {
            primary: "#FFD700", // Gold
            secondary: "#FFA500" // Orange
        }
    },
    {
        id: "7",
        name: "Cuget",
        description: "Independent creator and visual artist bringing a unique perspective to the MultiversX ecosystem through vibrant digital expressions.",
        category: "Independent Artists",
        tags: ["Digital Art", "Visuals", "Creator"],
        status: "active",
        links: { twitter: "https://twitter.com" },
        image: "/cuget-logo.jpg",
        bannerImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
        ooxCollections: ["CUGET-000001"],
        isVerifiedCreative: true
    },
    {
        id: "8",
        name: "Versus Projects",
        description: "A legendary collection of fantasy characters and mystical creatures, building a competitive and immersive ecosystem on MultiversX.",
        category: "NFTS Project",
        tags: ["PFP", "Fantasy", "Competitive"],
        status: "active",
        links: { twitter: "https://twitter.com" },
        image: "/versus-logo.jpg",
        bannerImage: "/versus-banner-new.jpg",
        ooxCollections: ["VERSUS-123456"]
    },
    {
        id: "9",
        name: "Hodl Token Club",
        description: "Holders of Empyreans gain access into a visionary community, access our daily $1,000 REWARD draw, surprise bonuses and club perks. Every Empyrean minted with the rare $HODL trait receives an airdrop of 1 $HODL. Keep your Empyrean in-wallet to earn weekly $REWARD, with higher yields for rarer traits.",
        category: "NFTS Project",
        tags: ["Exclusive", "Utility", "Community"],
        status: "active",
        links: {
            twitter: "https://x.com/HodlTokenClub",
            discord: "https://discord.com/invite/WNUXBqKVcX",
            website: "https://hodl-token.club/"
        },
        image: "/htc-logo.png",
        bannerImage: "/htc-banner.jpg",
        ooxCollections: [
            { label: "Empyreans", url: "https://oox.art/marketplace/collections/EMP-897b49" },
            { label: "xEmpyreans", url: "https://oox.art/marketplace/collections/XEMP-24b350" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "10",
        name: "SuperVictor Universe",
        description: "A colorful and vibrant universe of characters and adventures building a joyful community on MultiversX. Join the ultimate quest for creativity and fun.",
        category: "NFTS Project",
        tags: ["Characters", "Adventure", "Art"],
        status: "active",
        links: { twitter: "https://twitter.com" },
        image: "/svu-logo.png",
        bannerImage: "/svu-banner.png",
        ooxCollections: ["SVU-111111"],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "11",
        name: "Temoana",
        description: "Independent artist catching waves and creating vibrant digital art that blends surf culture with a unique tropical aesthetic on MultiversX.",
        category: "Independent Artists",
        tags: ["SurfArt", "Tropical", "DigitalArt"],
        status: "active",
        links: { twitter: "https://twitter.com" },
        image: "/temoana-logo.jpg",
        bannerImage: "/temoana-banner.jpg",
        ooxCollections: ["TEMOANA-111111"],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "12",
        name: "Project X DAO",
        description: "A visionary DAO building the future of decentralized governance and community-driven innovation on MultiversX. Join the evolution.",
        category: "NFTS Project",
        tags: ["DAO", "Ecosystem", "Building"],
        status: "active",
        links: { twitter: "https://twitter.com" },
        image: "/projectx-logo.jpg",
        bannerImage: "/projectx-banner.jpg",
        ooxCollections: ["PROJECTX-000001"],
        isDailyBuilder: true,
        isVerifiedCreative: true
    }
];
