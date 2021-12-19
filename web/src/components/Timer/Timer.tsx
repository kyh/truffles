import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { theme } from "styles/theme";

type Props = {
  initialSeconds?: number;
  shouldCallTimeout?: boolean;
  onTimeout?: () => void;
};

export const Timer = ({
  initialSeconds = 45,
  shouldCallTimeout = true,
  onTimeout = () => {},
}: Props) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds !== 1) {
        setSeconds((seconds) => seconds - 1);
      } else {
        if (shouldCallTimeout) {
          onTimeout();
        }
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return typeof window !== "undefined"
    ? createPortal(
        <Container>
          <TimerContainer initialSeconds={initialSeconds}>
            <SnailContainer>
              <Snail>
                <SnailSvg />
              </Snail>
              <Dust />
            </SnailContainer>
            <TimerText>{seconds} seconds remaining</TimerText>
          </TimerContainer>
        </Container>,
        document.body
      )
    : null;
};

const scaleAnimation = keyframes`
  0% { transform: scaleX(1); }
  50% { transform: scaleX(0.95); }
  100% { transform: scaleX(1); }
`;

const eyeAnimation = keyframes`
  0% { transform: translate(0); }
  50% { transform: translate(3px, 0); }
  100% { transform: translate(0); }
`;

const moveAnimation = keyframes`
  from { transform: translate(100vw) }
  to { transform: translate(0vw) }
`;

const dustAnimation = keyframes`
  100% {
    background-position-x: right;
  }
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  pointer-events: none;

  ${theme.breakpoints.desktop} {
    bottom: ${theme.spacings(5)};
  }
`;

const TimerContainer = styled.div<{ initialSeconds: number }>`
  animation: ${moveAnimation} ${({ initialSeconds }) => initialSeconds}s linear
    infinite;
  animation-iteration-count: 1;
`;

const SnailContainer = styled.div`
  display: flex;
`;

const Snail = styled.div`
  .right-eye {
    animation: ${eyeAnimation} 1s ease infinite;
    animation-delay: 0.1s;
  }

  .body {
    animation: ${scaleAnimation} 1s ease infinite;
    animation-delay: 0.1s;
  }

  .shell {
    animation: ${scaleAnimation} 1s ease infinite;
  }
`;

const Dust = styled.div`
  width: 197px;
  height: 66px;
  background-image: url("/sprites/dust.svg");
  background-size: 5910px 67px;
  animation-name: ${dustAnimation};
  animation-duration: 1s;
  animation-timing-function: steps(29);
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  transform: translate(-20px, 10px);
`;

const TimerText = styled.div``;

const SnailSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="138"
    height="67"
    viewBox="0 0 138 67"
  >
    <g fill="none" fillRule="evenodd" transform="translate(2 2)">
      <g className="left-eye">
        <g transform="translate(0 17.101)">
          <path
            fill="#FFF"
            d="M22,11.3988978 C22,17.4738978 17.075,22.3988978 11,22.3988978 C4.925,22.3988978 0,17.4738978 0,11.3988978 C0,5.32389785 4.925,0.398897849 11,0.398897849 C17.075,0.398897849 22,5.32389785 22,11.3988978"
          />
          <path
            stroke="#7247FF"
            strokeWidth="4"
            d="M22,11.3988978 C22,17.4738978 17.075,22.3988978 11,22.3988978 C4.925,22.3988978 0,17.4738978 0,11.3988978 C0,5.32389785 4.925,0.398897849 11,0.398897849 C17.075,0.398897849 22,5.32389785 22,11.3988978 Z"
          />
          <path
            fill="#000"
            d="M12.5,12.8988978 C12.5,15.6608978 10.933,17.8988978 9,17.8988978 C7.067,17.8988978 5.5,15.6608978 5.5,12.8988978 C5.5,10.1368978 7.067,7.89889785 9,7.89889785 C10.933,7.89889785 12.5,10.1368978 12.5,12.8988978"
          />
          <path
            fill="#9A70EA"
            d="M11.231,10.9769978 L0.882,13.7729978 C0.46,12.2159978 0.377,10.5889978 0.638,9.00599785 C1.616,3.08099785 7.202,-0.904002151 13.014,0.176997849 C17.044,0.926997849 20.353,3.95999785 21.523,7.97899785 L11.231,10.9769978 Z"
          />
          <path
            stroke="#7247FF"
            strokeWidth="4"
            d="M11.231,10.9769978 L0.882,13.7729978 C0.46,12.2159978 0.377,10.5889978 0.638,9.00599785 C1.616,3.08099785 7.202,-0.904002151 13.014,0.176997849 C17.044,0.926997849 20.353,3.95999785 21.523,7.97899785 L11.231,10.9769978 Z"
          />
          <path
            fill="#7247FF"
            d="M15.8379,27.5687978 L12.0089,22.6057978 L19.4229,16.8857978 L23.2519,21.8487978 C24.8319,23.8957978 24.4519,26.8367978 22.4049,28.4157978 C20.3579,29.9957978 17.4179,29.6157978 15.8379,27.5687978"
          />
        </g>
      </g>
      <g className="body">
        <g transform="translate(16.943 41.912)">
          <path
            stroke="#7247FF"
            strokeWidth="5"
            d="M4.737,19.5 C2.121,19.5 8.52651283e-14,17.379 8.52651283e-14,14.763 C8.52651283e-14,7.161 6.161,4.54747351e-13 13.762,4.54747351e-13 L95.5,4.54747351e-13 C105.745,4.54747351e-13 113.106,7.242 116.407,15.936 C117.061,17.657 115.75,19.5 113.908,19.5 L4.737,19.5 Z"
          />
          <path
            fill="#9A70EA"
            d="M15.8429,19.2422 C13.4759,19.2422 11.5569,17.9202 11.5569,16.2892 C11.5569,11.5522 17.1319,7.0882 24.0079,7.0882 L97.9539,7.0882 C107.2219,7.0882 113.8819,11.6012 116.8679,17.0202 C117.4599,18.0942 116.2739,19.2422 114.6079,19.2422 L15.8429,19.2422 Z"
          />
        </g>
      </g>
      <g className="right-eye">
        <g transform="translate(6 16.101)">
          <path
            fill="#FFF"
            d="M22,11.3988978 C22,17.4738978 17.075,22.3988978 11,22.3988978 C4.925,22.3988978 0,17.4738978 0,11.3988978 C0,5.32389785 4.925,0.398897849 11,0.398897849 C17.075,0.398897849 22,5.32389785 22,11.3988978"
          />
          <path
            stroke="#7247FF"
            strokeWidth="4"
            d="M22,11.3988978 C22,17.4738978 17.075,22.3988978 11,22.3988978 C4.925,22.3988978 0,17.4738978 0,11.3988978 C0,5.32389785 4.925,0.398897849 11,0.398897849 C17.075,0.398897849 22,5.32389785 22,11.3988978 Z"
          />
          <path
            fill="#000"
            d="M12.5,12.8988978 C12.5,15.6608978 10.933,17.8988978 9,17.8988978 C7.067,17.8988978 5.5,15.6608978 5.5,12.8988978 C5.5,10.1368978 7.067,7.89889785 9,7.89889785 C10.933,7.89889785 12.5,10.1368978 12.5,12.8988978"
          />
          <path
            stroke="#7247FF"
            strokeWidth="4"
            d="M11.231,10.9769978 L0.882,13.7729978 C0.46,12.2159978 0.377,10.5889978 0.638,9.00599785 C1.616,3.08099785 7.202,-0.904002151 13.014,0.176997849 C17.044,0.926997849 20.353,3.95999785 21.523,7.97899785 L11.231,10.9769978 Z"
          />
          <path
            fill="#7247FF"
            d="M15.8379,27.5687978 L12.0089,22.6057978 L19.4229,16.8857978 L23.2519,21.8487978 C24.8319,23.8957978 24.4519,26.8367978 22.4049,28.4157978 C20.3579,29.9957978 17.4179,29.6157978 15.8379,27.5687978"
          />
          <path
            fill="#9A70EA"
            d="M11.231,10.9769978 L0.882,13.7729978 C0.46,12.2159978 0.377,10.5889978 0.638,9.00599785 C1.616,3.08099785 7.202,-0.904002151 13.014,0.176997849 C17.044,0.926997849 20.353,3.95999785 21.523,7.97899785 L11.231,10.9769978 Z"
          />
        </g>
      </g>
      <g className="shell">
        <g strokeLinecap="round" transform="translate(48.357 .18)">
          <path
            stroke="#9A70EA"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16.0033626,9.63291273 C16.1763626,9.93291273 22.2683626,5.87991273 22.3263626,5.98291273 C22.3383626,6.00291273 0.761362599,23.8309127 1.1423626,24.4909127 C1.6783626,25.4199127 43.0693626,-0.781087271 43.5313626,0.0179127286 C44.0943626,0.992912729 3.7573626,30.0919127 4.0333626,30.5699127 C4.3803626,31.1699127 53.0443626,1.97991273 53.1703626,2.19991273 C53.2003626,2.25191273 -0.409637401,38.7729127 0.00236259944,39.4859127 C0.605362599,40.5299127 59.5263626,3.54891273 60.2073626,4.72691273 C60.7243626,5.62291273 11.9393626,37.8099127 12.6913626,39.1119127 C12.9233626,39.5149127 65.9643626,8.34791273 65.9673626,8.35391273 C66.3013626,8.93091273 22.6833626,38.4489127 23.0793626,39.1349127 C23.5083626,39.8779127 67.0573626,12.2429127 67.7073626,13.3679127 C68.1923626,14.2099127 26.5803626,42.7639127 27.2403626,43.9059127 C27.6733626,44.6569127 72.3033626,15.9939127 73.1243626,17.4149127 C73.8003626,18.5869127 28.5813626,47.7239127 29.2603626,48.8999127 C29.3993626,49.1389127 71.0653626,24.0769127 71.3623626,24.5919127 C71.9703626,25.6439127 27.7703626,56.1919127 27.9103626,56.4349127 C28.4413626,57.3559127 73.2133626,28.9199127 73.8013626,29.9399127 C74.3493626,30.8879127 33.3113626,58.8449127 33.6013626,59.3469127 C33.8473626,59.7729127 76.3823626,34.1119127 76.6143626,34.5139127 C76.8813626,34.9769127 37.8373626,62.5979127 38.2013626,63.2279127 C38.4243626,63.6129127 67.8783626,45.4039127 68.1763626,45.9209127"
          />
          <path
            stroke="#7247FF"
            strokeWidth="5"
            d="M1.6429626,39.3195127 C1.9699626,36.3825127 -0.857037401,22.8195127 16.6429626,9.31951273 C27.9219626,0.619512729 40.9809626,0.325512729 44.6429626,0.319480661 C49.6539626,0.311512729 55.7319626,1.79851273 63.1429626,6.81951273 C64.4599626,7.71251273 75.8079626,15.6825127 76.1429626,29.8195127 C76.4399626,42.3755127 67.8259626,50.3395127 65.1429626,52.8195127 C62.2099626,55.5315127 54.2939626,62.8485127 43.1429626,61.8195127 C35.5579626,61.1195127 24.3289626,56.3575127 22.1429626,45.8195127 C20.2179626,36.5385127 26.3509626,27.8065127 33.1429626,23.8195127 C37.8959626,21.0295127 42.6289626,20.7635127 45.1429626,20.8195127"
          />
        </g>
      </g>
    </g>
  </svg>
);