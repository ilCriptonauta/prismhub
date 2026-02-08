export interface StreakUser {
    id: string;
    username: string;
    avatar?: string;
    streak: number;
    rank: number;
    address?: string;
}

export const STREAK_RANKING_DATA: StreakUser[] = [
    {
        id: "1",
        username: "@letouriste",
        streak: 34243,
        rank: 1,
        address: "erd1nd3rd2gyk48lqv5dw0tc88sy8h352mc3kj3f8usxgpl5wkrfdpeqp7qmay",
        avatar: "https://mainnet-maiar-id.s3.eu-central-1.amazonaws.com/users/erd1nd3rd2gyk48lqv5dw0tc88sy8h352mc3kj3f8usxgpl5wkrfdpeqp7qmay/profile/3e95b692-1d64-4f4c-ba65-932459217648?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3J5Z2DGWKLXA74WI%2F20260208%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260208T123747Z&X-Amz-Expires=86400&X-Amz-Signature=aeec44bbd3fa052740a5085592efcf070b1adc5e73ae60bb5056606717dc78cf&X-Amz-SignedHeaders=host",
    },
    {
        id: "2",
        username: "@alx98",
        streak: 22485,
        rank: 2,
        address: "erd1jp4wug9wam0cr9cjj3h4zsjhr7s93yd28knsjdwr8hjfj0mmgvkspmzj5y",
        avatar: "https://media.multiversx.com/nfts/thumbnail/EAPES-8f3c1f-e68644a4",
    },
    {
        id: "3",
        username: "erd1...4ee",
        streak: 18084,
        rank: 3,
        address: "erd1...",
        avatar: "",
    }
];
