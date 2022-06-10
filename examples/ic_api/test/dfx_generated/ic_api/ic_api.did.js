export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'caller' : IDL.Func([], [IDL.Principal], ['query']),
    'canister_balance' : IDL.Func([], [IDL.Nat64], ['query']),
    'canister_balance128' : IDL.Func([], [IDL.Nat], ['query']),
    'id' : IDL.Func([], [IDL.Principal], ['query']),
    'method_name' : IDL.Func([], [IDL.Text], []),
    'print' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'time' : IDL.Func([], [IDL.Nat64], ['query']),
    'trap' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
