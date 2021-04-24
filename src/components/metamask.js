import {useMetaMask} from "metamask-react";

export function withMetaMask(Component) {
  return function WrappedComponent(props) {
    const metamask = useMetaMask();
    return <Component {...props} metamask={metamask} />;
  }
}