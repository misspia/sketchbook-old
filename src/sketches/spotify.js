const token = 'BQDrgP-vebS6KrFj2evwUZPLCXlnldPWIm6H0mrkRRl0ndg_wdoZCgjiUaIV4pV25L882mvGF7-0uFuacIOX81kBlhLHCpho7TNhSARimyp9vLb5BDIm9lvLjdbCGI8RkzFdwNFiPfvTud55H-rHkLHS7hYLlNGH5Ya01-m4N1mW4K8FJnWIgg';

window.onSpotifyWebPlaybackSDKReady = () => {
  const play = new Spotify.Player({
    name: '',
    getOAuthToken: cb => cb(token),
  });
  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
}
