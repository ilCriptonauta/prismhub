import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get('url');
    // 'cb' is just for cache-busting at the request level
    const cb = searchParams.get('cb');

    if (!imageUrl) {
        return new NextResponse('Missing URL', { status: 400 });
    }

    try {
        // Appending cache buster to the origin fetch as well to avoid server-side cached tainted responses
        const finalUrl = cb ? `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}_cb=${cb}` : imageUrl;
        const response = await fetch(finalUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const blob = await response.blob();
        const headers = new Headers();

        // Return the image with correct content type and strict CORS headers
        headers.set('Content-Type', response.headers.get('Content-Type') || 'image/png');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        headers.set('Cache-Control', 'no-cache, no-store, must-revalidate'); // Avoid disk caching for export images

        return new NextResponse(blob, {
            status: 200,
            headers,
        });
    } catch (error: any) {
        console.error('Image proxy error:', error);
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
}
