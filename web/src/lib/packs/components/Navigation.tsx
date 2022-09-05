import styled from "styled-components";
import { Link } from "~/components";
import { theme } from "~/styles/theme";

export const Navigation = () => {
  return (
    <NavigationContainer>
      <div className="left">
        <Link href="/packs">
          <img
            className="logo"
            src="/logo/logomark.svg"
            alt="Playhouse"
            height="35"
            width="35"
          />
        </Link>
      </div>
      <div className="right end">
        {false ? (
          <>
            {/* <Link href="/">Play</Link>
            <Link href={`/u/${auth.user?.username}`}>Profile</Link>
            <Link href="/packs" onClick={auth.signout}>
              Logout
            </Link> */}
          </>
        ) : (
          <>
            <Link href="/">Play</Link>
            <Link href="/auth/request">Sign Up</Link>
            <Link href="/auth/login">Login</Link>
          </>
        )}
      </div>
    </NavigationContainer>
  );
};

export const NavigationContainer = styled.nav`
  display: flex;
  background: ${theme.ui.background};
  border-bottom: 1px solid ${theme.ui.borderColor};
  height: 50px;
  grid-area: header;

  .left {
    display: flex;
    align-items: center;
    padding-left: ${theme.spacings(3)};

    ${theme.breakpoints.desktop} {
      width: 215px;
    }
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: auto;
    padding: 0 ${theme.spacings(3)};
    &.end {
      justify-content: flex-end;

      > a {
        padding: ${theme.spacings(3)};
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .pack-title {
    margin: 0;
  }
`;