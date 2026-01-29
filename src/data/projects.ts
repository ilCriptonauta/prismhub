export type ProjectStatus = "active" | "developing" | "minting";
export type ProjectCategory = "NFTS Project" | "Indipendent Artists";

export interface ProjectLinks {
    website?: string;
    twitter?: string;
    discord?: string;
    telegram?: string;
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
    ooxCollections?: string[]; // Array of collection IDs (tickers) for OOX.art
    isDailyBuilder?: boolean;
    isVerifiedCreative?: boolean;
}

export const CATEGORIES: ProjectCategory[] = ["NFTS Project", "Indipendent Artists"];

export const PROJECTS_DATA: Project[] = [
    {
        id: "1",
        name: "Onionx Labs",
        description: "Official creative laboratory building the future of the MultiversX NFT ecosystem with passion and innovation.",
        category: "NFTS Project",
        tags: ["Creative", "Ecosystem", "Lab"],
        status: "active",
        links: { website: "https://multiversx.com", twitter: "https://twitter.com" },
        featured: true,
        featuredMonth: "January 2026",
        image: "/onionx-logo.jpg",
        bannerImage: "/onionx-banner.jpg",
        ooxCollections: ["ONIONX-888888"],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "2",
        name: "OwlKing7",
        description: "Visionary independent artist pushing the boundaries of pixel art and digital identity on MultiversX.",
        category: "Indipendent Artists",
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
        image: "/baxc-logo.jpg",
        bannerImage: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1000",
        ooxCollections: ["BAXC-000001"],
        isDailyBuilder: true
    },
    {
        id: "4",
        name: "ilCriptonauta",
        description: "Independent artist exploring the MultiversX universe. Creating unique digital art that blends pop culture with blockchain innovation.",
        category: "Indipendent Artists",
        tags: ["1/1 Art", "Illustrations", "Pop Culture"],
        status: "active",
        links: { twitter: "https://twitter.com" },
        image: "/criptonauta-logo.jpg",
        bannerImage: "/criptonauta-banner.jpg",
        ooxCollections: ["CRIPTO-123456"]
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
        ooxCollections: ["SRB-999999"]
    },
    {
        id: "7",
        name: "Cuget",
        description: "Independent creator and visual artist bringing a unique perspective to the MultiversX ecosystem through vibrant digital expressions.",
        category: "Indipendent Artists",
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
        bannerImage: "https://images.unsplash.com/photo-1519074063912-df2d05e96be1?auto=format&fit=crop&q=80&w=1000",
        ooxCollections: ["VERSUS-123456"]
    }
];
