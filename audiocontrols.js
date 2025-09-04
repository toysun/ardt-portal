AFRAME.registerComponent('songplayer', {
  
      init: function () {
        
        let audiosource = document.querySelector('#musicpanel');

        let musicplay = () => {
        audiosource.components.sound.playSound()
        }
        
        this.el.addEventListener('click', musicplay);

      }});
    
    AFRAME.registerComponent('songstopper', {
      init: function () {
      
        let audiosource = document.querySelector('#musicpanel');

        let musicstop = () => {
        audiosource.components.sound.stopSound()
        }
        
        this.el.addEventListener('click', musicstop);
        
      }});
    
    