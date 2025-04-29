import * as React from 'react';

function MoneyIcon() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect width="48" height="48" fill="url(#pattern0_864_4770)" />
            <defs>
                <pattern
                    id="pattern0_864_4770"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <use xlinkHref="#image0_864_4770" transform="scale(0.01)" />
                </pattern>
                <image
                    id="image0_864_4770"
                    width="100"
                    height="100"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
}

export default MoneyIcon;
