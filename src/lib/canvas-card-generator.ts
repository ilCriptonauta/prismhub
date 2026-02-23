export async function generateCanvasCard(params: {
    title: string;
    level: number;
    xp: number;
    progressToNextLevel: number;
    rarity: { name: string; colorFrom: string; colorTo: string; };
    traits: Array<{ trait_type: string; value: string }>;
    base64Image: string | null;
    floorPrice?: number;
    isDarkMode?: boolean;
}): Promise<string> {
    const { title, level, xp, progressToNextLevel, rarity, traits, base64Image, floorPrice, isDarkMode } = params;

    // Palette mapping based on site theme
    // If site is dark (isDarkMode = true), card is LIGHT (white).
    // If site is light (isDarkMode = false), card is DARK.
    const c = isDarkMode ? {
        bg: '#FFFFFF',
        border: '#e2e8f0', // slate-200
        textPrimary: '#0f172a', // slate-900
        textSec: '#64748b', // slate-500
        textTert: '#94a3b8', // slate-400
        separator: '#e2e8f0',
        imgBg: '#f1f5f9', // slate-100
        imgBorder: '#FFFFFF',
        traitBg: '#f8fafc', // slate-50
        traitBorder: '#e2e8f0',
        progressBg: '#f1f5f9',
        copyRight: '#cbd5e1' // slate-300
    } : {
        bg: '#0F172A',
        border: 'rgba(255,255,255,0.1)',
        textPrimary: '#FFFFFF',
        textSec: 'rgba(255,255,255,0.5)',
        textTert: 'rgba(255,255,255,0.4)',
        separator: 'rgba(255,255,255,0.07)',
        imgBg: '#0f172a', // slate-900
        imgBorder: '#1e293b', // slate-800
        traitBg: 'rgba(255,255,255,0.05)',
        traitBorder: 'rgba(255,255,255,0.1)',
        progressBg: '#1e293b',
        copyRight: 'rgba(255,255,255,0.2)'
    };

    // Retina base scale
    const SCALE = 3;
    const WIDTH = 560 * SCALE;
    const HEIGHT = 980 * SCALE;

    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Could not initialize 2D context");

    // Standard scaling for all operations
    ctx.scale(SCALE, SCALE);

    // --- Helper Math/Drawing ---
    function roundRectBorder(x: number, y: number, w: number, h: number, r: number, fill: string | CanvasGradient, stroke?: string, strokeWidth: number = 2) {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI);
        ctx.lineTo(x + w, y + h - r);
        ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);
        ctx.lineTo(x + r, y + h);
        ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, 1 * Math.PI);
        ctx.lineTo(x, y + r);
        ctx.arc(x + r, y + r, r, 1 * Math.PI, 1.5 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = fill;
        ctx.fill();

        if (stroke) {
            ctx.lineWidth = strokeWidth;
            ctx.strokeStyle = stroke;
            ctx.stroke();
        }
    }

    function createLinearGradient(x0: number, y0: number, x1: number, y1: number, c1: string, c2: string) {
        if (!ctx) return '';
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, c1);
        grad.addColorStop(1, c2);
        return grad;
    }

    // --- 1. Background ---
    roundRectBorder(0, 0, 560, 980, 40, c.bg, c.border, 4);

    // --- 2. Header ---
    ctx.fillStyle = c.textPrimary;
    ctx.font = '900 24px Inter, sans-serif';
    ctx.textBaseline = 'top';
    const displayTitle = title.toUpperCase();
    ctx.fillText(displayTitle, 32, 32);

    ctx.fillStyle = c.textTert;
    ctx.font = '900 10px Inter, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('LEVEL', 480, 42);
    ctx.letterSpacing = '0px';

    ctx.fillStyle = c.textPrimary;
    ctx.textAlign = 'right';
    ctx.font = '900 30px Inter, sans-serif';
    ctx.fillText(String(level), 530, 32);
    ctx.textAlign = 'left';

    // Separator
    ctx.fillStyle = c.separator;
    ctx.fillRect(32, 85, 496, 1);

    // --- 3. NFT Image ---
    const imgX = 32;
    const imgY = 100;
    const imgW = 496;
    const imgH = 496;

    // Draw image outline box
    roundRectBorder(imgX, imgY, imgW, imgH, 32, c.imgBg, c.imgBorder, 8);

    if (base64Image) {
        // Await image loading
        const img = new Image();
        img.src = base64Image;
        await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Fallback smoothly
        });

        if (img.width && img.height) {
            // Object cover math
            const aspectRatio = img.width / img.height;
            const targetRatio = imgW / imgH;
            let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;

            if (aspectRatio > targetRatio) {
                sWidth = img.height * targetRatio;
                sx = (img.width - sWidth) / 2;
            } else {
                sHeight = img.width / targetRatio;
                sy = (img.height - sHeight) / 2;
            }

            ctx.save();
            ctx.beginPath();
            ctx.roundRect(imgX, imgY, imgW, imgH, 32); // Use native roundRect for clipping
            ctx.clip();
            ctx.drawImage(img, sx, sy, sWidth, sHeight, imgX, imgY, imgW, imgH);
            ctx.restore();
        }
    } else {
        ctx.fillStyle = c.textTert;
        ctx.font = '900 50px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('◆', imgX + imgW / 2, imgY + imgH / 2 - 25);
        ctx.textAlign = 'left';
    }

    // --- 4. XP Badge floating bottom right of image ---
    const badgeW = 90;
    const badgeH = 28;
    const badgeX = imgX + imgW - badgeW - 16;
    const badgeY = imgY + imgH - 14;

    const grad = createLinearGradient(badgeX, badgeY, badgeX + badgeW, badgeY + badgeH, rarity.colorFrom, rarity.colorTo);
    roundRectBorder(badgeX, badgeY, badgeW, badgeH, 14, grad);

    // Text on badge is always white regardless of theme because badge is colored
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'italic 900 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`✦ ${Math.floor(xp)} XP`, badgeX + badgeW / 2, badgeY + 8);
    ctx.textAlign = 'left';

    // --- 5. Traits Header ---
    const traitsHeaderY = imgY + imgH + 30;
    // Separator Top
    ctx.fillStyle = c.separator;
    ctx.fillRect(32, traitsHeaderY, 496, 1);

    // Bullet
    const rarityGrad = createLinearGradient(32, traitsHeaderY + 14, 40, traitsHeaderY + 22, rarity.colorFrom, rarity.colorTo);
    ctx.beginPath();
    ctx.arc(36, traitsHeaderY + 18, 4, 0, Math.PI * 2);
    ctx.fillStyle = rarityGrad;
    ctx.fill();

    ctx.fillStyle = c.textTert;
    ctx.font = '900 10px Inter, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('CARD INFO', 46, traitsHeaderY + 13);

    ctx.textAlign = 'right';
    const rarityTrait = traits.find(t => t.trait_type.toLowerCase() === 'rarity' || t.trait_type.toLowerCase() === 'rank')?.value;
    const tierText = (rarityTrait ? `${rarityTrait} RARITY` : `${rarity.name} TIER`).toUpperCase();
    ctx.fillText(tierText, 528, traitsHeaderY + 13);
    ctx.textAlign = 'left';
    ctx.letterSpacing = '0px';

    // Separator Bottom
    ctx.fillStyle = c.separator;
    ctx.fillRect(32, traitsHeaderY + 32, 496, 1);

    // --- 6. Traits Grid ---
    let startY = traitsHeaderY + 44;
    let startX = 32;
    const traitW = 120;
    const traitH = 42;
    const traitGap = 8;
    let col = 0;

    const displayTraits = traits.slice(0, 8); // Max 8 traits visually
    for (let i = 0; i < displayTraits.length; i++) {
        const t = displayTraits[i];

        roundRectBorder(startX, startY, traitW, traitH, 10, c.traitBg, c.traitBorder, 1);

        // Trait Type
        ctx.fillStyle = c.textTert;
        ctx.font = '900 7px Inter, sans-serif';
        ctx.letterSpacing = '2px';
        ctx.fillText((t.trait_type || 'Attribute').toUpperCase(), startX + 12, startY + 8);
        ctx.letterSpacing = '0px';

        // Trait Value
        ctx.fillStyle = c.textPrimary;
        ctx.font = 'bold 10px Inter, sans-serif';
        let valTitle = (t.value || 'Unknown').toString().toUpperCase();
        if (valTitle.length > 15) valTitle = valTitle.substring(0, 13) + '...';
        ctx.fillText(valTitle, startX + 12, startY + 22);

        col++;
        startX += traitW + traitGap;
        // Move to next row after 4 columns
        if (col === 4) {
            col = 0;
            startX = 32;
            startY += traitH + traitGap;
        }
    }

    // --- 7. Progress Bar ---
    const progressY = 880;
    roundRectBorder(32, progressY, 496, 6, 3, c.progressBg, c.border, 1);
    const progressW = Math.max(6, (Math.min(100, progressToNextLevel) / 100) * 496);
    const progressGrad = createLinearGradient(32, progressY, 32 + progressW, progressY + 6, rarity.colorFrom, rarity.colorTo);
    roundRectBorder(32, progressY, progressW, 6, 3, progressGrad);

    // --- 8. Footer ---
    const footY = progressY + 24;

    // Logo Icon Box
    roundRectBorder(32, footY, 32, 32, 10, progressGrad);
    // Logo icon text is always white
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('✦', 48, footY + 8); // optical center offset

    ctx.textAlign = 'left';
    ctx.fillStyle = c.textPrimary;
    ctx.font = '900 11px Inter, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('OOX HUB', 74, footY + 4);

    ctx.fillStyle = c.textTert;
    ctx.font = 'bold 7px Inter, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('GENESIS PROTOCOL', 74, footY + 20);
    ctx.letterSpacing = '0px';

    ctx.textAlign = 'right';
    ctx.fillStyle = c.textSec;
    ctx.font = '900 8px Inter, sans-serif';
    ctx.letterSpacing = '1.5px';
    const floorStr = floorPrice && floorPrice > 0 ? `FLOOR: ${floorPrice.toFixed(2)} EGLD` : 'SECURED';
    ctx.fillText(floorStr.toUpperCase(), 528, footY + 6);

    ctx.fillStyle = c.copyRight; // More faded
    ctx.font = 'bold 6px Inter, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('© 2026 MULTIVERSX NETWORK', 528, footY + 20);
    ctx.letterSpacing = '0px';
    ctx.textAlign = 'left';

    // Output high quality PNG format
    return canvas.toDataURL('image/png', 1.0);
}
