import clsx from "clsx";
import useWindowDimensions from "../../Other/Hooks";

function MeteorEffect() {
    return (
        <div className="w-full overflow-x-hidden flex items-center justify-center"><Meteors number={10} /></div>
    );
}

export const Meteors: React.FC<{ number: number }> = ({ number }) => {
    const { width } = useWindowDimensions()
    return [...new Array(number || 20).fill(true)].map((_el, idx) => (
        <span>
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                className="w-2 h-2 rotate-90"
                viewBox="0 0 256 256"
                xmlSpace="preserve"
            >
                <defs></defs>
                <g
                    style={{
                        stroke: 'none',
                        strokeWidth: 0,
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: 'none',
                        fillRule: 'nonzero',
                        opacity: 1,
                    }}
                    transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                >
                    <path
                        d="M 45 90.008 c -17.488 0 -31.715 -14.227 -31.715 -31.716 c 0 -22.264 17.854 -42.847 29.669 -56.467 l 1.29 -1.488 c 0.38 -0.44 1.133 -0.44 1.513 0 l 1.289 1.487 c 11.815 13.62 29.67 34.203 29.67 56.468 C 76.716 75.781 62.488 90.008 45 90.008 z"
                        style={{
                            stroke: 'none',
                            strokeWidth: 1,
                            strokeDasharray: 'none',
                            strokeLinecap: 'butt',
                            strokeLinejoin: 'miter',
                            strokeMiterlimit: 10,
                            fill: 'rgb(64,180,197)',
                            fillRule: 'nonzero',
                            opacity: 1,
                        }}
                        transform="matrix(1 0 0 1 0 0)"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 53.942 87.356 c -19.11 0 -34.657 -15.547 -34.657 -34.657 c 0 -16.585 9.068 -32.315 18.93 -45.364 c -11.318 13.361 -24.93 31.518 -24.93 50.958 c 0 17.488 14.227 31.716 31.715 31.716 c 4.751 0 9.257 -1.057 13.306 -2.937 C 56.875 87.252 55.421 87.356 53.942 87.356 z"
                        style={{
                            stroke: 'none',
                            strokeWidth: 1,
                            strokeDasharray: 'none',
                            strokeLinecap: 'butt',
                            strokeLinejoin: 'miter',
                            strokeMiterlimit: 10,
                            fill: 'rgb(51,151,166)',
                            fillRule: 'nonzero',
                            opacity: 1,
                        }}
                        transform="matrix(1 0 0 1 0 0)"
                        strokeLinecap="round"
                    />
                </g>
            </svg> */}

            <svg key={idx}
                className={clsx(
                    "animate-meteoreffect overflow-x-hidden absolute top-1/2 w-3 h-3 -rotate-90 left-1/2 rounded-full",
                )}
                style={{
                    top: 0,
                    left: Math.floor(Math.random() * (400 - -400) + 0) + "px",
                    animationDelay: Math.random() * (0.4 - 0.2) + 0 + "s",
                    animationDuration: Math.floor(Math.random() * (12 - 2) + 1) + "s",
                }} xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 512 512"><path d="M493.7 .9L299.4 75.6l2.3-29.3c1-12.8-12.8-21.5-24-15.1L101.3 133.4C38.6 169.7 0 236.6 0 309C0 421.1 90.9 512 203 512c72.4 0 139.4-38.6 175.7-101.3L480.8 234.3c6.5-11.1-2.2-25-15.1-24l-29.3 2.3L511.1 18.3c.6-1.5 .9-3.2 .9-4.8C512 6 506 0 498.5 0c-1.7 0-3.3 .3-4.8 .9zM192 192a128 128 0 1 1 0 256 128 128 0 1 1 0-256zm0 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm16 96a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" /></svg>

        </span>
    ));
};

export default MeteorEffect;