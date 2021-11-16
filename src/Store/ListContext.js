import { createContext, useState } from 'react';

const ListContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteBlog) => {},
  removeFavorite: (blogId) => {},
  isFavorite: (blogId) => {}
});

export function ListContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavorite(favoriteBlog) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteBlog);
    });
  }

  function removeFavorite(blogId) {
    setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.filter(blog => blog.id !== blogId);
    });
  }

  function isFavorite(blogId) {
    return userFavorites.some(blog => blog.id === blogId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
    isFavorite: isFavorite
  };

  return (
    <ListContext.Provider value={context}>
      {props.children}
    </ListContext.Provider>
  );
}

export default ListContext;
