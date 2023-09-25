import React from 'react';

function useGetUserID() {
  return (
    window.localStorage.getItem("userIDD")
  )
}

export default useGetUserID ;
