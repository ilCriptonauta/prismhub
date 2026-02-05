import * as React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mvx-toast-list': any;
            'mvx-sign-transactions-panel': any;
            'mvx-unlock-panel': any;
        }
    }
}
