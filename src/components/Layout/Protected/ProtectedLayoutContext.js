import React from 'react';
export let open = false;

export const ProtectedLayoutContext = React.createContext(
    {
        currentOfficeData: null,
        authUser: null,
        open: open,
        toggleSideNav: () => {},
    }
);
