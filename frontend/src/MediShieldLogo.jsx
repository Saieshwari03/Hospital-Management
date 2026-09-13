function MediShieldLogo({ compact = false }) {
  return (
    <div className={`medishield-logo ${compact ? "compact" : ""}`}>
      
      <div className="medishield-mark">
        <svg
          viewBox="0 0 100 110"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="MediShield AI logo"
        >
          <defs>
            <linearGradient
              id="shieldGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#4df4ff" />
              <stop offset="55%" stopColor="#16d9d0" />
              <stop offset="100%" stopColor="#087f91" />
            </linearGradient>

            <linearGradient
              id="coreGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#a8ffff" />
            </linearGradient>

            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer shield */}
          <path
            d="M50 5
               L91 20
               V49
               C91 75 75 94 50 105
               C25 94 9 75 9 49
               V20 Z"
            fill="rgba(10, 35, 48, 0.92)"
            stroke="url(#shieldGradient)"
            strokeWidth="3"
            filter="url(#logoGlow)"
          />

          {/* Inner shield */}
          <path
            d="M50 15
               L80 26
               V48
               C80 67 67 82 50 91
               C33 82 20 67 20 48
               V26 Z"
            fill="none"
            stroke="rgba(77,244,255,0.28)"
            strokeWidth="1.5"
          />

          {/* AI network nodes */}
          <g opacity="0.8">
            <circle cx="29" cy="35" r="2.2" fill="#4df4ff" />
            <circle cx="71" cy="35" r="2.2" fill="#4df4ff" />
            <circle cx="25" cy="55" r="2" fill="#16d9d0" />
            <circle cx="75" cy="55" r="2" fill="#16d9d0" />

            <path
              d="M29 35 L39 43
                 M71 35 L61 43
                 M25 55 L38 57
                 M75 55 L62 57"
              stroke="#4df4ff"
              strokeWidth="1"
              opacity="0.7"
            />
          </g>

          {/* Medical cross */}
          <path
            d="M43 29
               H57
               V43
               H71
               V57
               H57
               V71
               H43
               V57
               H29
               V43
               H43 Z"
            fill="url(#coreGradient)"
            filter="url(#logoGlow)"
          />

          {/* ECG pulse */}
          <path
            d="M27 67
               H37
               L42 61
               L47 74
               L53 51
               L58 67
               H73"
            fill="none"
            stroke="#4df4ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#logoGlow)"
          />

          {/* Central AI node */}
          <circle
            cx="50"
            cy="47"
            r="3"
            fill="#ffffff"
            filter="url(#logoGlow)"
          />
        </svg>
      </div>

      {!compact && (
        <div className="medishield-wordmark">
          <div className="medishield-name">
            MEDI<span>SHIELD</span>
          </div>

          <div className="medishield-ai">
            AI
          </div>

          <div className="medishield-tagline">
            HEALTHCARE CYBER DEFENSE
          </div>
        </div>
      )}
    </div>
  );
}

export default MediShieldLogo;