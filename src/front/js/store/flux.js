const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userType: null,
      viewType: false,
      backendurl:
        "https://3001-jantgg-proyectofinaljan-gtyi5j1i6er.ws-eu90.gitpod.io/api/",
      questions: [],
      answers: [],
      routes: [],
      photographers: [],
      photos: [],
      bikes: [],
      favorites: [],
      singleViewRoute: null,
      singleViewRoutePhotos: null,
      visibleRoute: false,
      singleViewPhotog: null,
      singleViewPhotogPhotos: null,
      visiblePhotog: false,
    },
    actions: {
      setViewType: async () => {
        setStore({ viewType: true });
      },
      resetViewType: async () => {
        setStore({ viewType: false });
      setSingleViewRoute: (route) => {
        setStore({ singleViewRoute: route });
        const photos = route.photos.map((obj) => obj.path);
        setStore({ singleViewRoutePhotos: photos });
      },
      setVisibleRoute: (v) => {
        setStore({ visibleRoute: v });
      },
      setSingleViewPhotog: (photog) => {
        setStore({ singleViewPhotog: photog });
        const photos = photog.photos.map((obj) => obj.path);
        setStore({ singleViewPhotogPhotos: photos });
      },
      setVisiblePhotog: (v) => {
        setStore({ visiblePhotog: v });
      },
      getQuestions: async () => {
        const response = await fetch(getStore().backendurl + "questions");
        const data = await response.json();
        setStore({ questions: data.body });
      },
      getAnswers: async () => {
        const response = await fetch(getStore().backendurl + "answers");
        const data = await response.json();
        setStore({ answers: data.body });
      },
      getBikes: async () => {
        const response = await fetch(getStore().backendurl + "bikes");
        const data = await response.json();
        setStore({ bikes: data.body });
      },
      getRoutes: async () => {
        const response = await fetch(getStore().backendurl + "routes");
        const data = await response.json();
        setStore({ routes: data.body });
      },
      getPhotographers: async () => {
        const response = await fetch(getStore().backendurl + "photographers");
        const data = await response.json();
        setStore({ photographers: data.body });
      },
      getPhotos: async () => {
        const response = await fetch(getStore().backendurl + "photos");
        const data = await response.json();
        setStore({ photos: data.body });
      },
      getFavorites: async () => {
        const response = await fetch(getStore().backendurl + "favorites", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStore({ favorites: data.body });
        }
      },
      addToFavorites: async (obj, type) => {
        const response = await fetch(getStore().backendurl + "favorite", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            favorite_id: obj.id,
            favorite_type: type,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setStore({ favorites: data.body });
        }
      },
      deleteFavorite: async (bike_id, route_id, photographer_id) => {
        const response = await fetch(getStore().backendurl + "favorites", {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bike_id: bike_id,
            route_id: route_id,
            photographer_id: photographer_id,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setStore({ favorites: data.message });
        }
      },
      deleteRoute: async (routeId) => {
        const response = await fetch(
          getStore().backendurl + "routes/" + routeId,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const updatedRoutes = getStore().routes.filter(
            (route) => route.id !== routeId
          );
          setStore({ routes: updatedRoutes });
        }
      },

      deletePhoto: async (photoId) => {
        const response = await fetch(
          getStore().backendurl + "photos/" + photoId,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const updatedPhotos = getStore().photos.filter(
            (photo) => photo.id !== photoId
          );
          setStore({ photos: updatedPhotos });
        }
      },

      syncuser: async () => {
        const response = await fetch(getStore().backendurl + "sync", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("type", data.type);
          setStore({ userType: data.type });
        }
      },
      logout: () => {
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("type");
          localStorage.removeItem("email");
          localStorage.removeItem("user_id");
          setStore({ userType: null });
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
    },
  };
};

export default getState;
