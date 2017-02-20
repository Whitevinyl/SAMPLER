

//-------------------------------------------------------------------------------------------
//  SETUP
//-------------------------------------------------------------------------------------------

var sampleBuffer;
var sampleBufferData;

function setupAudio() {

    // MASTER VOL //
    Tone.Master.volume.value = -3;
    var context = Tone.context;

    sampleBuffer = new Tone.Buffer('audio/output9.wav',bufferLoaded);

}



function bufferLoaded() {
    sampleBufferData = sampleBuffer.toArray();
    wave.populate(sampleBufferData);
}





