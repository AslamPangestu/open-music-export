class PlaylistListener {
    constructor(playlistService, mail) {
      this._playlistService = playlistService;
      this._mail = mail;
   
      this.listen = this.listen.bind(this);
    }
   
    async listen(message) {
      try {
        const { userId, targetEmail,playlistId } = JSON.parse(message.content.toString());
        const playlist = await this._playlistService.export({ playlistId, userId,targetEmail });
        const result = await this._mail.sendEmail({targetEmail,subject:"Export Playlist",text: 'Terlampir hasil dari ekspor playlist',attachments: [
          {
            filename: 'playlists.json',
            content:JSON.stringify(playlist),
          },
        ]});
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }
   
  module.exports = PlaylistListener;