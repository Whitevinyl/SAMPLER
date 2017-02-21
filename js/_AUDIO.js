

//-------------------------------------------------------------------------------------------
//  SETUP
//-------------------------------------------------------------------------------------------

var sampleBuffer;
var sampleBufferData;

function setupAudio() {

    // MASTER VOL //
    Tone.Master.volume.value = -3;
    var context = Tone.context;


    var url;
    url = 'audio/output9.wav';
    url = 'audio/hit_tray2.wav';
    url = 'audio/hit_xylophone2.wav';
    url = 'audio/ambient01.mp3';
    url = 'audio/drums01.mp3';

    sampleBuffer = new Tone.Buffer(url,bufferLoaded);

}



function bufferLoaded() {
    sampleBufferData = sampleBuffer.toArray();
    UI.sampler.controls[2].populate(sampleBufferData,sampleBuffer.duration);
}





