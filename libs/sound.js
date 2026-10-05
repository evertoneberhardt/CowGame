export class Sound {
    static audioContext = null;
    static masterGainNode = null;
    static audioBuffers = {};
    static playingSounds = {};
    static soundGroups = {}; // Novo objeto para armazenar os grupos de som

    static init() {
        if (!window.AudioContext && !window.webkitAudioContext) {
            console.log("Web Audio API not supported.");
            return false;
        }
        Sound.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        Sound.audioBuffers = {};
        Sound.masterGainNode = Sound.audioContext.createGain();
        Sound.masterGainNode.connect(Sound.audioContext.destination);
        Sound.soundGroups = {}; // Inicializa o objeto de grupos de som
    }

    static loadSound(name, url) {
        return fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => Sound.audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => { Sound.audioBuffers[name] = audioBuffer })
            .catch(error => console.error(`Error loading ${name} sound: `, error));
    }

    static playSound(name, loop = false, volume = 1, group = null) {
        const buffer = Sound.audioBuffers[name];
        if (!buffer) {
            console.warn(`"${name}" sound not loaded.`);
            return;
        }

        const source = Sound.audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = loop;

        const gainNode = Sound.audioContext.createGain();
        gainNode.gain.value = volume;
        source.connect(gainNode);
        gainNode.connect(Sound.masterGainNode);

        Sound.playingSounds[name] = source;

        // Adiciona o som ao grupo, se especificado
        if (group) {
            if (!Sound.soundGroups[group]) {
                Sound.soundGroups[group] = [];
            }
            Sound.soundGroups[group].push(source);
        }

        source.start(0);
        return source;
    }

    static stopSound(name) {
        if (Sound.playingSounds[name]) {
            this.playingSounds[name].stop();
            delete Sound.playingSounds[name];

            // Remove o som de qualquer grupo que ele pertença
            for (const groupName in Sound.soundGroups) {
                Sound.soundGroups[groupName] = Sound.soundGroups[groupName].filter(sound => sound !== Sound.playingSounds[name]);
            }
        } else {
            console.warn(`No "${name}" sound is being played.`);
        }
    }

    // Novo método para parar todos os sons de um grupo
    static stopGroup(groupName) {
        if (Sound.soundGroups[groupName]) {
            Sound.soundGroups[groupName].forEach(source => {
                source.stop();
                // Remove o som do objeto playingSounds também
                for (const soundName in Sound.playingSounds) {
                    if (Sound.playingSounds[soundName] === source) {
                        delete Sound.playingSounds[soundName];
                        break;
                    }
                }
            });
            delete Sound.soundGroups[groupName]; // Opcional: remover o grupo após parar todos os sons
        } else {
            console.warn(`Sound group "${groupName}" not found.`);
        }
    }

    static isPlaying(name) {
        return !!Sound.playingSounds[name];
    }

    static setMasterVolume(volume) {
        if (Sound.masterGainNode) {
            Sound.masterGainNode.gain.value = volume;
        }
    }
}