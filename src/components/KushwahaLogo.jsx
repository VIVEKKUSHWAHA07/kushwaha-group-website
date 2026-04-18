export default function KushwahaLogo({ width = 220, height = 80, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 460" width={width} height={height} className={className} preserveAspectRatio="xMidYMid meet">
      <defs>
        <style dangerouslySetInnerHTML={{ __html: `
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@600&display=swap');
            
            .text-title {
              font-family: 'Orbitron', sans-serif;
              font-size: 38px;
              fill: #ffffff;
              font-weight: 700;
              letter-spacing: 3px;
            }
            .text-tagline {
              font-family: 'Rajdhani', sans-serif;
              font-size: 20px;
              fill: #F5C518;
              font-weight: 600;
              letter-spacing: 3px;
              text-transform: uppercase;
            }

            @keyframes slideIn {
              0% { transform: translateX(-800px); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }

            @keyframes helixSpin {
              0%   { transform: translateY(0px); }
              100% { transform: translateY(60px); }
            }
            
            @keyframes rotateArrow {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(-360deg); }
            }

            @keyframes glintSweep {
              0% { transform: translateX(-100px) skewX(-20deg); opacity: 0; }
              20% { opacity: 0.8; }
              80% { opacity: 0.8; }
              100% { transform: translateX(700px) skewX(-20deg); opacity: 0; }
            }

            @keyframes shimmerHopper {
              0% { transform: translateX(-100px) skewX(-20deg); opacity: 0; }
              20% { opacity: 0.4; }
              40% { transform: translateX(200px) skewX(-20deg); opacity: 0; }
              100% { transform: translateX(200px) skewX(-20deg); opacity: 0; }
            }

            @keyframes letterExtrude {
              0% { transform: translateY(8px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes pulseGlow {
              0%, 100% { filter: drop-shadow(0 0 2px rgba(245, 197, 24, 0)); }
              50% { filter: drop-shadow(0 0 14px rgba(245, 197, 24, 0.8)); }
            }

            @keyframes fadeTagline {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }

            @keyframes scaleLine {
              0% { transform: scaleX(0); }
              100% { transform: scaleX(1); }
            }

            .screw-group-container { animation: slideIn 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
            .screw-thread-top { animation: helixSpin 0.9s linear infinite; }
            .screw-thread-bottom { animation: helixSpin 0.9s linear infinite; }
            .arrow-indicator { transform-origin: 0px 0px; animation: rotateArrow 2.5s linear infinite; }
            .glint-rect-top { animation: glintSweep 2s ease-in-out infinite; }
            .glint-rect-bottom { animation: glintSweep 2s ease-in-out infinite; animation-delay: 1.2s; }
            .hopper-shimmer { animation: shimmerHopper 4s ease-in-out infinite; }
            .extrude-letter { opacity: 0; animation: letterExtrude 0.3s ease-out forwards; }
            .name-group { animation: pulseGlow 3s ease-in-out infinite; animation-delay: 2.6s; }
            .fader { opacity: 0; animation: fadeTagline 0.8s ease-out forwards; animation-delay: 2.8s; }
            .accent-line { transform-origin: 595.5px 420px; transform: scaleX(0); animation: scaleLine 0.6s ease-out forwards; animation-delay: 3.2s; }

            @keyframes fall-0 { 0% { transform: translate(130px, 25px) rotate(0deg); opacity: 0; } 10% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translate(165px, 120px) rotate(30deg); opacity: 0; } }
            .pellet-0 { animation: fall-0 1.4s ease-in infinite; animation-delay: 0.1s; opacity: 0; }
            @keyframes fall-1 { 0% { transform: translate(150px, 25px) rotate(0deg); opacity: 0; } 10% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translate(175px, 120px) rotate(45deg); opacity: 0; } }
            .pellet-1 { animation: fall-1 1.6s ease-in infinite; animation-delay: 0.4s; opacity: 0; }
            @keyframes fall-2 { 0% { transform: translate(180px, 25px) rotate(0deg); opacity: 0; } 10% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translate(185px, 120px) rotate(-30deg); opacity: 0; } }
            .pellet-2 { animation: fall-2 1.3s ease-in infinite; animation-delay: 0.2s; opacity: 0; }
            @keyframes fall-3 { 0% { transform: translate(200px, 25px) rotate(0deg); opacity: 0; } 10% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translate(190px, 120px) rotate(60deg); opacity: 0; } }
            .pellet-3 { animation: fall-3 1.7s ease-in infinite; animation-delay: 0.6s; opacity: 0; }
            @keyframes fall-4 { 0% { transform: translate(220px, 25px) rotate(0deg); opacity: 0; } 10% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translate(200px, 120px) rotate(-45deg); opacity: 0; } }
            .pellet-4 { animation: fall-4 1.5s ease-in infinite; animation-delay: 0.8s; opacity: 0; }
            @keyframes fall-5 { 0% { transform: translate(140px, 25px) rotate(0deg); opacity: 0; } 10% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translate(170px, 120px) rotate(20deg); opacity: 0; } }
            .pellet-5 { animation: fall-5 1.4s ease-in infinite; animation-delay: 0.9s; opacity: 0; }
            @keyframes fall-6 { 0% { transform: translate(190px, 25px) rotate(0deg); opacity: 0; } 10% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translate(180px, 120px) rotate(-60deg); opacity: 0; } }
            .pellet-6 { animation: fall-6 1.6s ease-in infinite; animation-delay: 0.5s; opacity: 0; }
            @keyframes fall-7 { 0% { transform: translate(230px, 25px) rotate(0deg); opacity: 0; } 10% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translate(195px, 120px) rotate(40deg); opacity: 0; } }
            .pellet-7 { animation: fall-7 1.5s ease-in infinite; animation-delay: 0.3s; opacity: 0; }
        `}} />
        <linearGradient id="barrel-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2a3a"></stop>
          <stop offset="30%" stopColor="#4a4a5a"></stop>
          <stop offset="50%" stopColor="#1a1a2e"></stop>
          <stop offset="100%" stopColor="#0d0d18"></stop>
        </linearGradient>
        <linearGradient id="barrel-inner-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a12"></stop>
          <stop offset="100%" stopColor="#2a2a3a"></stop>
        </linearGradient>
        <linearGradient id="screw-grad-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#909090"></stop>
          <stop offset="30%" stopColor="#f0f0f0"></stop>
          <stop offset="70%" stopColor="#d0d0d0"></stop>
          <stop offset="100%" stopColor="#606060"></stop>
        </linearGradient>
        <linearGradient id="screw-grad-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#707070"></stop>
          <stop offset="30%" stopColor="#d0d0d0"></stop>
          <stop offset="70%" stopColor="#b0b0b0"></stop>
          <stop offset="100%" stopColor="#404040"></stop>
        </linearGradient>
        <linearGradient id="thread-grad-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#707070"></stop>
          <stop offset="30%" stopColor="#ffffff"></stop>
          <stop offset="50%" stopColor="#a0a0a0"></stop>
          <stop offset="100%" stopColor="#404040"></stop>
        </linearGradient>
        <linearGradient id="thread-grad-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#505050"></stop>
          <stop offset="30%" stopColor="#e0e0e0"></stop>
          <stop offset="50%" stopColor="#808080"></stop>
          <stop offset="100%" stopColor="#303030"></stop>
        </linearGradient>
        <linearGradient id="glint-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent"></stop>
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7"></stop>
          <stop offset="100%" stopColor="transparent"></stop>
        </linearGradient>
        <linearGradient id="steel-highlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#808080"></stop>
          <stop offset="50%" stopColor="#e0e0e0"></stop>
          <stop offset="100%" stopColor="#808080"></stop>
        </linearGradient>
        <clipPath id="barrel-clip">
          <rect x="80" y="110" width="640" height="150" rx="4"></rect>
        </clipPath>
        <clipPath id="screw-clip-top">
          <polygon points="0,120 530,120 620,150 530,180 0,180"></polygon>
        </clipPath>
        <clipPath id="screw-clip-bottom">
          <polygon points="0,180 530,180 620,210 530,240 0,240"></polygon>
        </clipPath>
        <clipPath id="hopper-clip">
          <polygon points="100,10 260,10 260,40 205,110 155,110 100,40"></polygon>
        </clipPath>
        <linearGradient id="cyl-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000010" stopOpacity="0.7"></stop>
          <stop offset="18%" stopColor="#000010" stopOpacity="0.0"></stop>
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05"></stop>
          <stop offset="82%" stopColor="#000010" stopOpacity="0.0"></stop>
          <stop offset="100%" stopColor="#000010" stopOpacity="0.7"></stop>
        </linearGradient>
        <linearGradient id="compression-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.3"></stop>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15"></stop>
        </linearGradient>
        <pattern id="helix-flight" width="56" height="60" patternUnits="userSpaceOnUse">
          <rect width="56" height="60" fill="#0d0d18"></rect>
          <rect x="0" y="8" width="56" height="44" fill="#3a3a50" opacity="0.6"></rect>
          <polygon points="0,4 10,0 18,0 8,4" fill="#222233"></polygon>
          <polygon points="8,4 18,0 56,0 56,4 46,8 8,8" fill="#222233"></polygon>
          <polygon points="0,4 8,4 46,8 56,4 56,14 46,18 8,18 0,14" fill="#707085"></polygon>
          <polygon points="0,4 8,4 46,8 56,4 56,6 46,10 8,10 0,6" fill="#d0d0e8"></polygon>
          <polygon points="0,4 56,4 56,5 0,5" fill="#ffffff" opacity="0.8"></polygon>
          <polygon points="0,14 8,18 46,18 56,14 56,18 46,22 8,22 0,18" fill="#151520"></polygon>
          <polygon points="0,34 8,34 46,38 56,34 56,44 46,48 8,48 0,44" fill="#707085"></polygon>
          <polygon points="0,34 8,34 46,38 56,34 56,36 46,40 8,40 0,36" fill="#d0d0e8"></polygon>
          <polygon points="0,34 56,34 56,35 0,35" fill="#ffffff" opacity="0.8"></polygon>
          <polygon points="0,44 8,48 46,48 56,44 56,48 46,52 8,52 0,48" fill="#151520"></polygon>
        </pattern>
      </defs>
      <rect width="900" height="460" fill="transparent"></rect>
      <g>
        <polygon points="100,10 260,10 260,40 205,110 155,110 100,40" fill="#1a1a2e"></polygon>
        <g clipPath="url(#hopper-clip)">
          <polygon points="105,15 255,15 255,38 202,108 158,108 105,38" fill="#0d0d18"></polygon>
          <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="#F5C518" className="pellet-0"></ellipse>
          <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="#F5C518" className="pellet-1"></ellipse>
          <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="#F5C518" className="pellet-2"></ellipse>
          <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="#F5C518" className="pellet-3"></ellipse>
          <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="#F5C518" className="pellet-4"></ellipse>
          <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="#F5C518" className="pellet-5"></ellipse>
          <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="#F5C518" className="pellet-6"></ellipse>
          <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="#F5C518" className="pellet-7"></ellipse>
          <rect x="50" y="0" width="200" height="150" fill="url(#glint-grad)" className="hopper-shimmer"></rect>
        </g>
        <rect x="165" y="55" width="30" height="35" rx="3" fill="#F5C518" opacity="0.25" stroke="#4a4a5a" strokeWidth="2"></rect>
        <rect x="167" y="57" width="26" height="15" rx="1" fill="#ffffff" opacity="0.1"></rect>
        <polygon points="100,10 260,10 260,40 205,110 155,110 100,40" fill="transparent" stroke="url(#steel-highlight)" strokeWidth="3" opacity="0.9"></polygon>
        <polygon points="95,5 265,5 260,10 100,10" fill="#a0a0a0"></polygon>
      </g>
      <g>
        <rect x="100" y="110" width="560" height="142" fill="url(#barrel-inner-grad)"></rect>
        <rect x="100" y="110" width="560" height="40" fill="#000000" opacity="0.4"></rect>
      </g>
      <g clipPath="url(#barrel-clip)">
        <g className="screw-group-container">
          <g>
            <path d="M 0 130 L 20 130 L 20 170 L 0 170 Z" fill="url(#barrel-grad)"></path>
            <rect x="5" y="128" width="2" height="44" fill="#1a1a2e"></rect>
            <rect x="10" y="128" width="2" height="44" fill="#1a1a2e"></rect>
            <rect x="15" y="128" width="2" height="44" fill="#1a1a2e"></rect>
            <rect x="20" y="90" width="60" height="190" rx="6" fill="#2a2a3a" stroke="#1a1a2e" strokeWidth="2"></rect>
            <circle cx="28" cy="98" r="3" fill="#9090a8"></circle>
            <circle cx="72" cy="98" r="3" fill="#9090a8"></circle>
            <circle cx="28" cy="272" r="3" fill="#9090a8"></circle>
            <circle cx="72" cy="272" r="3" fill="#9090a8"></circle>
            <circle cx="50" cy="150" r="24" fill="#1a1a2e" stroke="#4a4a5a" strokeWidth="2"></circle>
            <circle cx="50" cy="150" r="18" fill="#3a3a4a"></circle>
            <circle cx="50" cy="150" r="6" fill="#F5C518" opacity="0.8"></circle>
            <circle cx="50" cy="210" r="24" fill="#1a1a2e" stroke="#4a4a5a" strokeWidth="2"></circle>
            <circle cx="50" cy="210" r="18" fill="#3a3a4a"></circle>
            <circle cx="50" cy="210" r="6" fill="#F5C518" opacity="0.8"></circle>
          </g>
          <path d="M 80 120 L 120 120 L 120 180 L 80 180 Z" fill="url(#screw-grad-top)"></path>
          <ellipse cx="80" cy="150" rx="6" ry="30" fill="#1a1a28"></ellipse>
          <rect x="100" y="120" width="20" height="60" fill="#404040" opacity="0.5"></rect>
          <polygon points="120,120 650,120 740,150 650,180 120,180" fill="url(#screw-grad-top)"></polygon>
          <path d="M 80 180 L 120 180 L 120 240 L 80 240 Z" fill="url(#screw-grad-bottom)"></path>
          <ellipse cx="80" cy="210" rx="6" ry="30" fill="#1a1a28"></ellipse>
          <rect x="100" y="180" width="20" height="60" fill="#404040" opacity="0.5"></rect>
          <polygon points="120,180 650,180 740,210 650,240 120,240" fill="url(#screw-grad-bottom)"></polygon>
          <g clipPath="url(#screw-clip-top)" transform="translate(120, 0)">
            <g className="screw-thread-top">
              <rect x="-40" y="60" width="700" height="180" fill="url(#helix-flight)"></rect>
            </g>
            <rect x="0" y="120" width="250" height="60" fill="#000000" opacity="0.3"></rect>
            <rect x="250" y="120" width="190" height="60" fill="url(#compression-grad)"></rect>
            <rect x="440" y="120" width="180" height="60" fill="#ffffff" opacity="0.15"></rect>
            <rect x="0" y="120" width="620" height="60" fill="url(#cyl-shadow)"></rect>
          </g>
          <g clipPath="url(#screw-clip-bottom)" transform="translate(120, 0)">
            <g className="screw-thread-bottom">
              <rect x="-40" y="120" width="700" height="180" fill="url(#helix-flight)"></rect>
            </g>
            <rect x="0" y="180" width="250" height="60" fill="#000000" opacity="0.3"></rect>
            <rect x="250" y="180" width="190" height="60" fill="url(#compression-grad)"></rect>
            <rect x="440" y="180" width="180" height="60" fill="#ffffff" opacity="0.15"></rect>
            <rect x="0" y="180" width="620" height="60" fill="url(#cyl-shadow)"></rect>
          </g>
          <g clipPath="url(#screw-clip-top)" transform="translate(120, 0)">
            <rect className="glint-rect-top" x="0" y="120" width="80" height="60" fill="url(#glint-grad)"></rect>
          </g>
          <g clipPath="url(#screw-clip-bottom)" transform="translate(120, 0)">
            <rect className="glint-rect-bottom" x="0" y="180" width="80" height="60" fill="url(#glint-grad)"></rect>
          </g>
          <polygon points="650,120 740,150 650,125" fill="#ffffff" opacity="0.8"></polygon>
          <polygon points="650,180 740,210 650,185" fill="#ffffff" opacity="0.8"></polygon>
        </g>
      </g>
      <path d="M 80 100 L 680 100 L 680 110 L 80 110 Z" fill="#1a1a2e"></path>
      <path d="M 80 242 L 680 242 L 680 252 L 80 252 Z" fill="#1a1a2e"></path>
      <rect x="80" y="178" width="600" height="4" fill="#1a1a2e" opacity="0.8"></rect>
      <rect x="60" y="90" width="40" height="172" fill="url(#barrel-grad)" rx="6"></rect>
      <rect x="660" y="90" width="40" height="172" fill="url(#barrel-grad)" rx="6"></rect>
      <circle cx="80" cy="105" r="4" fill="#0d0d18"></circle>
      <circle cx="80" cy="245" r="4" fill="#0d0d18"></circle>
      <circle cx="680" cy="105" r="4" fill="#0d0d18"></circle>
      <circle cx="680" cy="245" r="4" fill="#0d0d18"></circle>
      <g transform="translate(80, 150)">
        <circle cx="0" cy="0" r="10" fill="none" stroke="#F5C518" strokeWidth="2.5" strokeDasharray="15 10" className="arrow-indicator"></circle>
      </g>
      <g transform="translate(80, 210)">
        <circle cx="0" cy="0" r="10" fill="none" stroke="#F5C518" strokeWidth="2.5" strokeDasharray="15 10" className="arrow-indicator"></circle>
      </g>
      <g transform="translate(-503, -242) scale(1.6)">
        <g className="name-group">
          <text x="390" y="370" className="extrude-letter text-title" style={{ animationDelay: '1s' }}>K</text>
          <text x="419" y="370" className="extrude-letter text-title" style={{ animationDelay: '1.1s' }}>U</text>
          <text x="450" y="370" className="extrude-letter text-title" style={{ animationDelay: '1.2s' }}>S</text>
          <text x="479" y="370" className="extrude-letter text-title" style={{ animationDelay: '1.3s' }}>H</text>
          <text x="508" y="370" className="extrude-letter text-title" style={{ animationDelay: '1.4s' }}>W</text>
          <text x="547" y="370" className="extrude-letter text-title" style={{ animationDelay: '1.5s' }}>A</text>
          <text x="576" y="370" className="extrude-letter text-title" style={{ animationDelay: '1.6s' }}>H</text>
          <text x="605" y="370" className="extrude-letter text-title" style={{ animationDelay: '1.7s' }}>A</text>
          <text x="650" y="370" className="extrude-letter text-title" style={{ animationDelay: '1.8s' }}>G</text>
          <text x="681" y="370" className="extrude-letter text-title" style={{ animationDelay: '1.9s' }}>R</text>
          <text x="710" y="370" className="extrude-letter text-title" style={{ animationDelay: '2s' }}>O</text>
          <text x="741" y="370" className="extrude-letter text-title" style={{ animationDelay: '2.1s' }}>U</text>
          <text x="772" y="370" className="extrude-letter text-title" style={{ animationDelay: '2.2s' }}>P</text>
        </g>
        <text x="595.5" y="405" className="text-tagline fader" textAnchor="middle">Precision Twin Screw &amp; Barrel Solutions</text>
        <rect x="385.5" y="420" width="420" height="4" fill="#F5C518" rx="2" className="accent-line"></rect>
      </g>
    </svg>
  );
}
