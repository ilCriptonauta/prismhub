import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import React from 'react';

export const runtime = 'edge';

function getRarityInfo(level: number) {
    if (level >= 10) return { name: 'LEGENDARY', from: '#f97316', to: '#eab308' };
    if (level >= 5) return { name: 'EPIC', from: '#a855f7', to: '#ec4899' };
    if (level >= 2) return { name: 'RARE', from: '#3b82f6', to: '#06b6d4' };
    return { name: 'COMMON', from: '#60a5fa', to: '#a78bfa' };
}

// Edge-runtime safe base64 conversion (no Buffer API needed)
function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode(...chunk);
    }
    return btoa(binary);
}

export async function GET(request: NextRequest) {
    const s = request.nextUrl.searchParams;
    const title = s.get('title') || 'OOX CREATIVE';
    const votes = parseInt(s.get('votes') || '0', 10);
    const rawImageUrl = s.get('imageUrl') || '';
    const floorPrice = parseFloat(s.get('floorPrice') || '0');
    const traitsParam = s.get('traits') || '[]';
    const rarityTrait = s.get('rarityTrait') || '';

    let parsedTraits: { trait_type: string; value: string }[] = [];
    try { parsedTraits = JSON.parse(decodeURIComponent(traitsParam)); } catch { /* noop */ }

    const xp = votes * 10;
    const level = Math.floor(xp / 250);
    const progress = ((xp % 250) / 250) * 100;
    const rarity = getRarityInfo(level);
    const tierLabel = rarityTrait ? `${rarityTrait} RARITY` : `${rarity.name} TIER`;
    const displayTraits = parsedTraits.slice(0, 4);

    // Fetch NFT image and convert to data URL using edge-compatible APIs
    let nftImageDataUrl = '';
    if (rawImageUrl) {
        const imageUrl = decodeURIComponent(rawImageUrl);
        try {
            const res = await fetch(imageUrl, { cache: 'no-store' });
            if (res.ok) {
                const contentType = res.headers.get('Content-Type') || 'image/png';
                const arrayBuffer = await res.arrayBuffer();
                const base64 = arrayBufferToBase64(arrayBuffer);
                nftImageDataUrl = `data:${contentType};base64,${base64}`;
            }
        } catch (e) {
            console.error('Failed to fetch NFT image:', e);
        }
    }

    const WIDTH = 560;
    const HEIGHT = 980;
    const gradBg = `linear-gradient(135deg, ${rarity.from}, ${rarity.to})`;

    const el = React.createElement(
        'div',
        {
            style: {
                width: WIDTH, height: HEIGHT,
                backgroundColor: '#0F172A',
                borderRadius: 40,
                display: 'flex',
                flexDirection: 'column',
                fontFamily: '"Inter"',
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.12)',
            },
        },
        // ── Header ──────────────────────────────────────
        React.createElement('div', {
            style: {
                padding: '32px 32px 0 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            },
        },
            React.createElement('div', {
                style: {
                    fontSize: 24, fontWeight: 700,
                    color: 'white',
                    letterSpacing: '-0.5px',
                    textTransform: 'uppercase',
                    maxWidth: 280,
                    lineHeight: 1.15,
                    display: 'flex',
                },
            }, title),
            React.createElement('div', {
                style: { display: 'flex', alignItems: 'baseline', gap: 4 },
            },
                React.createElement('span', {
                    style: { fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, textTransform: 'uppercase' },
                }, 'LVL'),
                React.createElement('span', {
                    style: { fontSize: 30, fontWeight: 700, color: 'white' },
                }, String(level)),
            ),
        ),
        // ── Thin separator ──────────────────────────────
        React.createElement('div', {
            style: { margin: '14px 32px', height: 1, background: 'rgba(255,255,255,0.1)', display: 'flex' },
        }),
        // ── NFT Image ───────────────────────────────────
        React.createElement('div', {
            style: { padding: '0 32px', display: 'flex' },
        },
            React.createElement('div', {
                style: {
                    width: '100%',
                    height: 490,
                    background: '#1e293b',
                    borderRadius: 28,
                    overflow: 'hidden',
                    border: '4px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            },
                nftImageDataUrl
                    ? React.createElement('img', {
                        src: nftImageDataUrl,
                        style: { width: '100%', height: '100%', objectFit: 'cover' },
                    })
                    : React.createElement('div', {
                        style: { color: 'rgba(255,255,255,0.3)', fontSize: 60, display: 'flex' },
                    }, '◆'),
            ),
        ),
        // ── XP Badge floating bottom-right of image ─────
        React.createElement('div', {
            style: { display: 'flex', justifyContent: 'flex-end', paddingRight: 48, marginTop: -18 },
        },
            React.createElement('div', {
                style: {
                    background: gradBg,
                    borderRadius: 14,
                    padding: '6px 16px',
                    display: 'flex',
                    alignItems: 'center',
                },
            },
                React.createElement('span', {
                    style: { fontSize: 12, fontWeight: 700, color: 'white', fontStyle: 'italic' },
                }, `✦ ${xp} XP`),
            ),
        ),
        // ── Card Info row ───────────────────────────────
        React.createElement('div', {
            style: {
                margin: '14px 32px 10px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                padding: '7px 0',
            },
        },
            React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 8 },
            },
                React.createElement('div', {
                    style: { width: 7, height: 7, borderRadius: 4, background: rarity.from, display: 'flex' },
                }),
                React.createElement('span', {
                    style: { fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, textTransform: 'uppercase' },
                }, 'CARD INFO'),
            ),
            React.createElement('span', {
                style: { fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase' },
            }, tierLabel),
        ),
        // ── Traits Grid ─────────────────────────────────
        React.createElement('div', {
            style: { padding: '0 32px', display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1 },
        },
            ...displayTraits.map((t, i) =>
                React.createElement('div', {
                    key: String(i),
                    style: {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        padding: '6px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 110,
                        flex: 1,
                    },
                },
                    React.createElement('span', {
                        style: { fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 },
                    }, t.trait_type || 'Attribute'),
                    React.createElement('span', {
                        style: { fontSize: 10, fontWeight: 700, color: 'white', textTransform: 'uppercase' },
                    }, t.value || 'Unknown'),
                ),
            ),
        ),
        // ── Progress Bar ────────────────────────────────
        React.createElement('div', {
            style: { padding: '14px 32px 6px 32px', display: 'flex' },
        },
            React.createElement('div', {
                style: {
                    width: '100%', height: 6,
                    background: '#1e293b',
                    borderRadius: 99,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                },
            },
                React.createElement('div', {
                    style: {
                        width: `${progress || 0}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${rarity.from}, ${rarity.to})`,
                        borderRadius: 99,
                        display: 'flex',
                    },
                }),
            ),
        ),
        // ── Footer ──────────────────────────────────────
        React.createElement('div', {
            style: { padding: '8px 32px 30px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        },
            React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 10 },
            },
                React.createElement('div', {
                    style: {
                        width: 32, height: 32, borderRadius: 10,
                        background: gradBg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14,
                    },
                }, '✦'),
                React.createElement('div', {
                    style: { display: 'flex', flexDirection: 'column' },
                },
                    React.createElement('span', {
                        style: { fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: 2, textTransform: 'uppercase' },
                    }, 'OOX HUB'),
                    React.createElement('span', {
                        style: { fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 1, textTransform: 'uppercase' },
                    }, 'Genesis Protocol'),
                ),
            ),
            React.createElement('div', {
                style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 },
            },
                React.createElement('span', {
                    style: { fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1.5 },
                }, floorPrice > 0 ? `FLOOR: ${floorPrice.toFixed(2)} EGLD` : 'SECURED'),
                React.createElement('span', {
                    style: { fontSize: 6, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: 2, textTransform: 'uppercase' },
                }, '© 2026 MULTIVERSX NETWORK'),
            ),
        ),
    );

    return new ImageResponse(el, {
        width: WIDTH,
        height: HEIGHT,
        headers: {
            'Content-Disposition': 'attachment; filename="oox-card.png"',
            'Cache-Control': 'no-store',
        },
    });
}
