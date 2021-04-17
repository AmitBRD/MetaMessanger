export const SET_PK = "SET_PK";
export const SET_ADDRESS= "SET_ADDRESS";

export function setMetamaskPk(pk) {
  return {
    type: SET_PK,
    pk
  };
}

export function setMetamaskAddress(address) {
  return {
    type: SET_ADDRESS,
    address
  };
}
