import { NextRequest, NextResponse } from 'next/server';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import React from 'react';

export const runtime = 'nodejs';

async function loadFont(url: string): Promise<ArrayBuffer> {
    const res = await fetch(url);
    return res.arrayBuffer();
}

async function fetchImageAsDataUrl(url: string): Promise<string> {
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = res.headers.get('Content-Type') || 'image/png';
    return `data:${contentType};base64,${buffer.toString('base64')}`;
}

function getRarityInfo(level: number) {
    if (level >= 10) return { name: 'LEGENDARY', from: '#f97316', to: '#eab308' };
    if (level >= 5) return { name: 'EPIC', from: '#a855f7', to: '#ec4899' };
    if (level >= 2) return { name: 'RARE', from: '#3b82f6', to: '#06b6d4' };
    return { name: 'COMMON', from: '#60a5fa', to: '#a78bfa' };
}

export async function GET(request: NextRequest) {
    const s = request.nextUrl.searchParams;
    const title = s.get('title') || 'OOX CREATIVE';
    const votes = parseInt(s.get('votes') || '0', 10);
    const imageUrl = s.get('imageUrl') || '';
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
    const gradBg = `linear-gradient(135deg, ${rarity.from}, ${rarity.to})`;

    const WIDTH = 560;
    const HEIGHT = 980;

    let nftImageDataUrl = '';
    if (imageUrl) {
        try {
            nftImageDataUrl = await fetchImageAsDataUrl(decodeURIComponent(imageUrl));
        } catch (e) {
            console.error('Card gen: failed to fetch NFT image:', e);
        }
    }

    const fontData = await loadFont(
        'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff'
    );

    const el = React.createElement(
        'div',
        {
            style: {
                width: WIDTH, height: HEIGHT,
                backgroundColor: '#0F172A',
                borderRadius: 40,
                display: 'flex', flexDirection: 'column',
                fontFamily: 'Inter',
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.1)',
            },
        },
        // Header
        React.createElement('div', {
            style: { padding: '32px 32px 0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }
        },
            React.createElement('div', {
                style: { fontSize: 26, fontWeight: 900, color: 'white', letterSpacing: '-0.5px', textTransform: 'uppercase', maxWidth: 280 }
            }, title),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
                React.createElement('span', { style: { fontSize: 10, fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, textTransform: 'uppercase' } }, 'LVL'),
                React.createElement('span', { style: { fontSize: 30, fontWeight: 900, color: 'white' } }, String(level)),
            )
        ),
        // Separator
        React.createElement('div', { style: { margin: '12px 32px', height: 1, background: 'rgba(255,255,255,0.1)' } }),
        // Image area (wrapper for relative positioning)
        React.createElement('div', { style: { padding: '0 32px', display: 'flex', position: 'relative' } },
            // Image box
            React.createElement('div', {
                style: {
                    width: '100%', height: 496,
                    background: '#1e293b',
                    borderRadius: 28,
                    overflow: 'hidden',
                    border: '4px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            },
                nftImageDataUrl
                    ? React.createElement('img', { src: nftImageDataUrl, style: { width: '100%', height: '100%', objectFit: 'cover' } })
                    : React.createElement('div', { style: { color: 'rgba(255,255,255,0.3)', fontSize: 40 } }, '◆')
            ),
            // XP Badge
            React.createElement('div', {
                style: {
                    position: 'absolute', bottom: -14, right: 18,
                    background: gradBg,
                    borderRadius: 14, padding: '6px 14px',
                    display: 'flex', alignItems: 'center', gap: 6,
                }
            },
                React.createElement('span', {
                    style: { fontSize: 12, fontWeight: 900, color: 'white', fontStyle: 'italic' }
                }, `✦ ${xp} XP`)
            )
        ),
        // Traits header
        React.createElement('div', {
            style: {
                margin: '28px 32px 10px 32px', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                padding: '7px 0',
            }
        },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                React.createElement('div', { style: { width: 7, height: 7, borderRadius: '50%', background: rarity.from } }),
                React.createElement('span', { style: { fontSize: 10, fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, textTransform: 'uppercase' } }, 'CARD INFO'),
            ),
            React.createElement('span', { style: { fontSize: 10, fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase' } }, tierLabel),
        ),
        // Traits grid
        React.createElement('div', {
            style: { padding: '0 32px', display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1 }
        },
            ...displayTraits.map((t) =>
                React.createElement('div', {
                    key: t.trait_type,
                    style: {
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10, padding: '6px 12px',
                        display: 'flex', flexDirection: 'column',
                        minWidth: 110, flex: 1,
                    }
                },
                    React.createElement('span', { style: { fontSize: 7, fontWeight: 900, color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 } }, t.trait_type || 'Attribute'),
                    React.createElement('span', { style: { fontSize: 10, fontWeight: 700, color: 'white', textTransform: 'uppercase' } }, t.value || 'Unknown'),
                )
            )
        ),
        // Progress bar
        React.createElement('div', { style: { padding: '16px 32px 8px 32px', display: 'flex' } },
            React.createElement('div', {
                style: { width: '100%', height: 6, background: '#1e293b', borderRadius: 99, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', display: 'flex' }
            },
                React.createElement('div', {
                    style: { width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${rarity.from}, ${rarity.to})`, borderRadius: 99 }
                })
            )
        ),
        // Footer
        React.createElement('div', {
            style: { padding: '8px 32px 32px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('div', {
                    style: { width: 32, height: 32, borderRadius: 10, background: gradBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }
                }, '✦'),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                    React.createElement('span', { style: { fontSize: 11, fontWeight: 900, color: 'white', letterSpacing: 2, textTransform: 'uppercase' } }, 'OOX HUB'),
                    React.createElement('span', { style: { fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: 1, textTransform: 'uppercase' } }, 'Genesis Protocol'),
                )
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 } },
                React.createElement('span', {
                    style: { fontSize: 8, fontWeight: 900, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1.5 }
                }, floorPrice > 0 ? `FLOOR: ${floorPrice.toFixed(2)} EGLD` : 'SECURED'),
                React.createElement('span', {
                    style: { fontSize: 6, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: 2, textTransform: 'uppercase' }
                }, '© 2026 MULTIVERSX NETWORK'),
            )
        )
    );

    const svg = await satori(el, {
        width: WIDTH,
        height: HEIGHT,
        fonts: [{ name: 'Inter', data: fontData, weight: 400, style: 'normal' }],
    });

    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH * 2 } });
    const pngBuffer = resvg.render().asPng();

    return new NextResponse(Buffer.from(pngBuffer), {
        status: 200,
        headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="oox-card.png"',
            'Cache-Control': 'no-store',
        },
    });
}
