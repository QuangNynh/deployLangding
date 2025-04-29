import * as React from "react"

function QualityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={65}
      height={64}
      viewBox="0 0 65 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M39.532 16.8a2.666 2.666 0 000 3.733l4.266 4.267a2.667 2.667 0 003.734 0l10.053-10.054A16 16 0 0136.412 35.92L17.985 54.346a5.657 5.657 0 11-8-8L28.412 27.92A16 16 0 0149.585 6.747L39.558 16.773l-.026.027z"
        stroke="url(#paint0_linear_734_5832)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_734_5832"
          x1={8.32812}
          y1={5.32349}
          x2={59.008}
          y2={56.0034}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4D4D" />
          <stop offset={1} stopColor="red" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default QualityIcon;
