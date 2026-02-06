export type ProjectStatus = "active" | "developing" | "minting";
export type ProjectCategory = "NFTS Project" | "Artists";

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
    slug: string;
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

export const CATEGORIES: ProjectCategory[] = ["NFTS Project", "Artists"];

export const PROJECTS_DATA: Project[] = [
    {
        id: "1",
        slug: "onionx-labs",
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
        slug: "boogas",
        name: "Boogas",
        description: "Put a bounce in your step!",
        category: "NFTS Project",
        tags: ["PFP", "Community", "Art"],
        status: "active",
        links: {
            twitter: "https://x.com/Boogas",
            telegram: "https://t.me/BoogasPortal",
            website: "https://boogas.io/"
        },
        image: "/boogas-logo.jpg",
        bannerImage: "/boogas-banner.jpg",
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "2",
        slug: "owlking7",
        name: "KingOwl7 | KO7",
        description: "Digital art creator. Exploring how Web3 can empower creators, collectors, and communities. My work focuses on surreal and conceptual visuals, using digital art as a way to question systems, identity and participation in the digital age.",
        category: "Artists",
        tags: ["Pixel Art", "Digital Identity", "Fine Art"],
        status: "active",
        links: {
            twitter: "https://x.com/KingOwl7_",
            telegram: "https://t.me/KO7ORIGINALS"
        },
        image: "/owlking-logo.jpg",
        bannerImage: "/owlking-banner.jpg",
        ooxCollections: [
            { label: "KO7Gridfall", url: "https://oox.art/marketplace/collections/KO7GF-044047" }
        ],
        isVerifiedCreative: true
    },
    {
        id: "3",
        slug: "baxc-dao-nerds",
        name: "BAXC DAO & Nerds",
        description: "BAXC is a manually drawn collection made for holders to bring extra adoption on MultiversX.",
        category: "NFTS Project",
        tags: ["DAO", "Community", "Nerds"],
        status: "active",
        links: {
            twitter: "https://x.com/BoredApeXClub",
            discord: "https://discord.gg/q2gTUaFh3V",
            telegram: "https://t.me/BaxcNerdsTime"
        },
        image: "/baxc-logo-v2.jpg",
        bannerImage: "/baxc-banner-new.jpg",
        ooxCollections: [
            { label: "BAXC", url: "https://oox.art/marketplace/collections/BAXC-cdf74d" },
            { label: "NERDS", url: "https://oox.art/marketplace/collections/NERD-794a0d" }
        ],
        isDailyBuilder: true
    },
    {
        id: "4",
        slug: "ilcriptonauta",
        name: "ilCriptonauta",
        description: "@OnionXLabs FOUNDER | ILLUSTRATOR - #Artemis collection | $EGLD Investor | visit OOX",
        category: "Artists",
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
        slug: "eapes",
        name: "EAPES",
        description: "EAPES CLUB 🦍 | NFT project on Multiversx and Solana • Real Utility | Awarded “Best NFT Design\"",
        category: "NFTS Project",
        tags: ["Community", "PFP", "Innovation"],
        status: "active",
        links: {
            website: "https://www.eapes.com/",
            twitter: "https://x.com/EAPESCLUB",
            discord: "https://discord.gg/eapesclub"
        },
        image: "/eapes-logo.jpg",
        bannerImage: "/eapes-banner.jpg",
        ooxCollections: [
            { label: "EAPES", url: "https://oox.art/marketplace/collections/EAPES-8f3c1f" },
            { label: "N.A.N.A", url: "https://oox.art/marketplace/collections/NANA-3366e3" }
        ]
    },
    {
        id: "6",
        slug: "super-rare-bears",
        name: "Super RARE Bears",
        description: "Always Bullish! $EGLD/$SOL/$SUI\n\n🐻 10K Genesis NFTs on MultiversX\n💼 Active In-wallet Staking\n\n💰 Stake $RARE, $FEDUP, $HYPE, $BATES, $DBATES & earn!\n\n🗳️ DAO Governance & Gaming\n🎁 Airdrops & Rewards\n⚙️ Powering DeFi, Automation, Utility & Community… Since 2022.",
        category: "NFTS Project",
        tags: ["PFP", "Utility", "Elite"],
        status: "active",
        links: {
            website: "https://superrarebears.com/",
            twitter: "https://x.com/SuperRare_Bears",
            telegram: "https://t.me/SuperRareBears",
            discord: "https://discord.gg/y4EUxjNkSU"
        },
        image: "/srb-logo.png",
        bannerImage: "/srb-banner.png",
        ooxCollections: [
            { label: "SuperRareBears", url: "https://oox.art/marketplace/collections/SRB-61daf7" },
            { label: "HYPEY", url: "https://oox.art/marketplace/collections/HYPEY-794a10" }
        ]
    },
    {
        id: "7",
        slug: "cuget",
        name: "Cuget",
        description: "I'm Cuget. A starving Web3 artist grinding on MultiversX. Pixel, vector, and 3D art noob (still learning, always building). Passionate about Romanian folklore and dark mithology. Gamer at heart.",
        category: "Artists",
        tags: ["Digital Art", "Visuals", "Creator"],
        status: "active",
        links: { twitter: "https://x.com/Cuget_x" },
        image: "/cuget-logo.jpg",
        bannerImage: "/cuget-banner.jpg",
        ooxCollections: [
            { label: "FRUGFRENS", url: "https://oox.art/marketplace/collections/FRUGFRENS-4c867c" },
            { label: "Andrians", url: "https://oox.art/marketplace/collections/ANDRIANS-e6144d" }
        ],
        isVerifiedCreative: true
    },
    {
        id: "8",
        slug: "versus-projects",
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
        slug: "hodl-token-club",
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
        slug: "supervictor-universe",
        name: "SuperVictor Universe",
        description: "A purpose driven universe",
        category: "NFTS Project",
        tags: ["Characters", "Adventure", "Art"],
        status: "active",
        links: {
            twitter: "https://x.com/SVictorUniverse",
            discord: "https://discord.gg/Parwvs6vtp",
            telegram: "https://t.me/VictorBySVU",
            website: "https://supervictornft.com/"
        },
        image: "/svu-logo.png",
        bannerImage: "/svu-banner.png",
        ooxCollections: [
            { label: "SuperVictor", url: "https://oox.art/marketplace/collections/SUPERVIC-f07785" },
            { label: "B.E.E.F", url: "https://oox.art/marketplace/collections/BEEF-032185" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "11",
        slug: "temoana",
        name: "Temoana",
        description: "Tahitian artist, I blend Polynesian culture and digital art to create unique and vibrant works. Through my creations, I share a modern and colorful vision of my island, a fusion of traditions, dreams, and pixels. Each piece is a bridge between the Mana of here and the world of tomorrow.",
        category: "Artists",
        tags: ["SurfArt", "Polynesian", "DigitalArt"],
        status: "active",
        links: {
            twitter: "https://x.com/TemoanaART",
            website: "https://www.temoana.net/"
        },
        image: "/temoana-logo.png",
        bannerImage: "/temoana-banner.jpg",
        ooxCollections: [
            { label: "TEMOANA", url: "https://oox.art/marketplace/collections/TEMOANA-a350a1" },
            { label: "Temoana Lost Artifacts", url: "https://oox.art/marketplace/collections/TMLA-08844c" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "12",
        slug: "project-x-dao",
        name: "Project X DAO",
        description: "#1 Rev-share DAO on MultiversX. Validator. Builders of tools for users and builders alike. We are MultiversX!",
        category: "NFTS Project",
        tags: ["DAO", "Ecosystem", "Building"],
        status: "active",
        links: {
            twitter: "https://x.com/ProjectX_DAO",
            discord: "https://discord.gg/C3z6FM7xDW",
            telegram: "https://t.me/ProjectX_DAO",
            website: "https://projectx.mx/"
        },
        image: "/projectx-logo.jpg",
        bannerImage: "/projectx-banner.jpg",
        ooxCollections: [
            { label: "SubjectX", url: "https://oox.art/marketplace/collections/SUBJECTX-2c184d" },
            { label: "TITANS", url: "https://oox.art/marketplace/collections/TITANS-20bc2c" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "13",
        slug: "roboartlab",
        name: "RoboArtLab",
        description: "RoboArtLab is an independent digital artist exploring the intersection of art, technology, and identity. Working primarily with AI-generated imagery, RoboArtLab reinterprets iconic cultural symbols and classical artworks through a robotic lens, questioning what remains human in an increasingly synthetic world",
        category: "Artists",
        tags: ["Digital Art", "AI", "Robotics"],
        status: "active",
        links: {
            twitter: "https://x.com/roboartlab"
        },
        image: "/roboartlab-logo.png",
        bannerImage: "/roboartlab-banner.jpg",
        ooxCollections: [
            { label: "RealityReload", url: "https://oox.art/marketplace/collections/LOAD-a69bf5" },
            { label: "SURVIVING COCK ROACH", url: "https://oox.art/marketplace/collections/SCKR-89e191" }
        ],
        isVerifiedCreative: true
    },
    {
        id: "14",
        slug: "olive",
        name: "Olive",
        description: "The official Olive project on MultiversX. Building a strong community and ecosystem centered around creativity, growth, and the power of the grove.",
        category: "NFTS Project",
        tags: ["Community", "Ecosystem", "Art"],
        status: "active",
        links: {
            twitter: "https://x.com/OliveMVX",
            website: "https://linktr.ee/olivedao"
        },
        image: "/olive-logo.jpg",
        bannerImage: "/olive-banner.jpg",
        ooxCollections: [
            { label: "OliveGrove", url: "https://oox.art/marketplace/collections/OLVGROVE-90fae5" },
            { label: "OlivePantheon", url: "https://oox.art/marketplace/collections/OLVP-e06a55" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "15",
        slug: "galacticx",
        name: "GalacticX",
        description: "GalacticX is more than football — it’s a new way to live the game. Through GalacticX NFTs and Web3-powered football experiences, members can truly own a piece of the sport they love. We bring the global football community together with exclusive events, interactive contests, and competitions built on innovation and engagement. GalacticX connects passion, technology, and ownership, transforming fans from spectators into active participants in the future of football.",
        category: "NFTS Project",
        tags: ["Football", "Sports", "Web3"],
        status: "active",
        links: {
            twitter: "https://x.com/_Galactic_x",
            telegram: "https://t.me/GalacticXfootball"
        },
        image: "/galacticx-logo.png",
        bannerImage: "/galacticx-banner.jpg",
        ooxCollections: [
            { label: "MainSeason", url: "https://oox.art/marketplace/collections/MAINSEASON-3db9f8" },
            { label: "GalacticXpixel", url: "https://oox.art/marketplace/collections/XPIXEL-c59b48" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "16",
        slug: "triskel",
        name: "Triskel",
        description: "Triskel creates designs that inspire and transcend the boundaries of digital art. Creator of a bot capable of sending real-time alerts about NFT sales directly on Telegram. Web3 gaming interface for Odin's Deck owners.",
        category: "NFTS Project",
        tags: ["Art", "Utility", "Gaming"],
        status: "active",
        links: {
            twitter: "https://x.com/Triskel_MvX",
            telegram: "https://t.me/TriskelMultiversX",
            website: "https://www.odinverse.app/"
        },
        image: "/triskel-logo.png",
        bannerImage: "/triskel-banner.png",
        ooxCollections: [
            { label: "Odins Deck", url: "https://oox.art/marketplace/collections/ODINSDECK-4e300a" },
            { label: "Odins Fury", url: "https://oox.art/marketplace/collections/OFT-01552b" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "17",
        slug: "trad3e",
        name: "Trad3e",
        description: "As a project we provide services in MVX. Launched 10 NFT collections, owned, private, and colaborate.",
        category: "NFTS Project",
        tags: ["Services", "NFT Collections", "MVX"],
        status: "active",
        links: {
            twitter: "https://t.me/Trad3EX",
            discord: "https://discord.gg/cpa-939118044066746378",
            telegram: "https://t.me/Trad3EX",
            website: "https://www.trad3ex.com/"
        },
        image: "/trad3e-logo.jpg",
        bannerImage: "/trad3e-banner.jpg",
        ooxCollections: [
            { label: "ArtCPAFounders", url: "https://oox.art/marketplace/collections/CPA-76d979" },
            { label: "Goddess", url: "https://oox.art/marketplace/collections/CPA-f1fc6c" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "18",
        slug: "excons",
        name: "Excons",
        description: "It's not just about hodling; it's about dominating the financial game and building a legacy.",
        category: "NFTS Project",
        tags: ["Finance", "Strategy", "Empire"],
        status: "active",
        links: {
            twitter: "https://x.com/exconsempire",
            discord: "https://discord.gg/CyaSKg283s",
            website: "https://excons.xyz/"
        },
        image: "/excons-logo.jpg",
        bannerImage: "/excons-banner.jpg",
        ooxCollections: [
            { label: "BMPSASS", url: "https://oox.art/marketplace/collections/BMPASS-989598" },
            { label: "xKEY", url: "https://oox.art/marketplace/collections/XKEY-e6e64b" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "19",
        slug: "stan-wilscott",
        name: "Stan Wilscott",
        description: "A lifelong illustrator, inspired since childhood by Enki Bilal, Richard Corben, Moebius, and H.R. Giger, but also by Franquin, Piem, Lambil, and more recently, Manu Larcenet. Drawing is about sharing a fragment of oneself. So I share my joys, my anxieties, and my freedom.",
        category: "Artists",
        tags: ["Illustrator", "Art", "Digital Art"],
        status: "active",
        links: {
            twitter: "https://x.com/StanWilscott"
        },
        image: "/stan-wilscott-logo.jpg",
        bannerImage: "/stan-wilscott-banner.jpg",
        ooxCollections: [
            { label: "Empyreans", url: "https://oox.art/marketplace/collections/EMP-897b49" },
            { label: "Olive Grove", url: "https://oox.art/marketplace/collections/OLVGROVE-90fae5" }
        ],
        isVerifiedCreative: true
    },
    {
        id: "20",
        slug: "bloopx",
        name: "BloopX",
        description: "Bloopx is a Comic / YouTube series NFT project on MvX.",
        category: "NFTS Project",
        tags: ["Comic", "YouTube", "NFT Series"],
        status: "active",
        links: {
            twitter: "https://x.com/BloopXNFT",
            discord: "https://discord.gg/Ge77s4Km2Z",
            telegram: "https://t.me/BloopXNft"
        },
        image: "/bloopx-logo.jpg",
        bannerImage: "/bloopx-banner.jpg",
        ooxCollections: [
            { label: "BLOOPX", url: "https://oox.art/marketplace/collections/BLOOPX-1ced34" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "21",
        slug: "ev-ecosystem",
        name: "E.V Ecosystem",
        description: "E.V. Ecosystem. The home of E.V. Cyborgs, Odd Apes Gang, UNITYX and Tickets Arena.",
        category: "NFTS Project",
        tags: ["Ecosystem", "Community", "MultiversX"],
        status: "active",
        links: {
            twitter: "https://x.com/evcyborgs",
            discord: "https://discord.gg/aAbPUdBuyG",
            telegram: "https://t.me/evnftreal",
            website: "https://dapp.eventivivi.it"
        },
        image: "/ev-ecosystem-logo.jpg",
        bannerImage: "/ev-ecosystem-banner.jpg",
        ooxCollections: [
            { label: "E.V Cyborgs", url: "https://oox.art/marketplace/collections/EVCYB-aea8b4" },
            { label: "EvolvedOAG", url: "https://oox.art/marketplace/collections/EVOAG-1a4f7d" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    },
    {
        id: "22",
        slug: "owlcityx",
        name: "OwlCityX",
        description: "Bridging Worlds, Uniting Realities - Web2 Meets Web3 in a Singular Owl Universe.",
        category: "NFTS Project",
        tags: ["Community", "MultiversX", "Metaverse"],
        status: "active",
        links: {
            twitter: "https://x.com/OwlCitizensX",
            telegram: "https://t.me/OwlCityX"
        },
        image: "/owlcityx-logo.jpg",
        bannerImage: "/owlcityx-banner.jpg",
        ooxCollections: [
            { label: "OwlCityX", url: "https://oox.art/marketplace/collections/CREATOROCX-b96f26" },
            { label: "OwlCityX Stage II", url: "https://oox.art/marketplace/collections/OCXSII-26bb89" }
        ],
        isDailyBuilder: true,
        isVerifiedCreative: true
    }
];
