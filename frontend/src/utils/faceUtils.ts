import * as faceapi from 'face-api.js'

export async function loadModels() {
    const MODEL_URL = "/models";
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
}

export async function getFaceDescriptor(image: HTMLImageElement) {
    const detection = await faceapi
        .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (!detection) throw new Error('No face detected');
    return detection.descriptor;
}

export function saveDescriptorToStorage(name: string, descriptor: Float32Array) {
    const data = JSON.stringify(Array.from(descriptor))
    localStorage.setItem(`face-${name}`, data);
    console.log(`Descriptor for ${name} saved to storage.`);
}

export function loadAllSavedDescriptors(): { name: string, descriptor: Float32Array }[] {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith('face-'));
    return keys.map((key) => {
        const name = key.replace('face-', '');
        const data = JSON.parse(localStorage.getItem(key) || '[]');
        return { name, descriptor: new Float32Array(data) };
    });
}