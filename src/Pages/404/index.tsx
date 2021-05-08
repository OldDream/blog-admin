import React ,{useEffect}from 'react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 page not found'
  },[])
  return (
    <h1>404 page not found</h1>
  );
}