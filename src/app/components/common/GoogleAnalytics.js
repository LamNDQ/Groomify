'use client';

import Script from 'next/script';

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
                async
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                            transport_url: 'https://www.googletagmanager.com/gtag/js'
                        });
                    `
                }}
            />
        </>
    );
}