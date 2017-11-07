const clientId = 'e4008efdab174b4392d8b77f55f9df8b';
const redirectURI = `http://localhost:3000/`;
//const redirectURI = `https://caseys-jammm.surge.sh/`;
const accessURIBase = 'https://accounts.spotify.com/authorize';
const spotifyURIBase = 'https://api.spotify.com/v1/';

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
        return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null,'/');
        return accessToken;
    } else {
      window.location = `${accessURIBase}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(terms) {
    let searchURI = spotifyURIBase + `search?type=track&q=`;

    for (var term in terms) {
      if (terms.hasOwnProperty(term) && terms[term]) {
        searchURI += `${term.toLowerCase()}:${terms[term].toLowerCase()}%20`;
      }
    }

    return fetch(searchURI.slice(0, -3), {
      headers: { Authorization: `Bearer ${Spotify.getAccessToken()}` }
    }).then(response => response.json()
    ).then(jsonResponse => {
      return !jsonResponse.tracks ? [] : jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackURIs) {
    if (name && trackURIs.length) {
      const headers = { Authorization: `Bearer ${Spotify.getAccessToken()}` };

      return fetch(spotifyURIBase + `me`, { headers: headers }
      ).then(response => response.json()
      ).then(jsonResponse => {
        const userID = jsonResponse.id;
        return fetch(spotifyURIBase + `users/${userID}/playlists`, {
          headers: headers,
          method: `POST`,
          body: JSON.stringify({ name: name })
        }).then(response => response.json()
        ).then(jsonResponse => {
          const playlistID = jsonResponse.id;
          return fetch(spotifyURIBase + `users/${userID}/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: `POST`,
            body: JSON.stringify({ uris: trackURIs })
          });
        });
      });
    }
  }
};

export default Spotify;
