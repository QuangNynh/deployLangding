import * as React from 'react';

function LocationIcon() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect width="48" height="48" fill="url(#pattern0_864_4781)" />
            <defs>
                <pattern
                    id="pattern0_864_4781"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <use xlinkHref="#image0_864_4781" transform="scale(0.01)" />
                </pattern>
                <image
                    id="image0_864_4781"
                    width="100"
                    height="100"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
}

export default LocationIcon;
