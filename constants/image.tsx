
import * as ImagePicker from 'expo-image-picker';
import { create } from "zustand";

type ImageState = {
    imgSrc: string;
    setImgSrc: (img: string) => void;
};

export const useImageStore = create<ImageState>((set) => ({
    imgSrc: "",
    setImgSrc: (img: string) => set({imgSrc: img})
}));



export const pickImage = async () => {
    const imageStore = useImageStore.getState();
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 5],
            quality: 1,
        });
        if (!result.canceled) {
            imageStore.setImgSrc(result.assets[0].uri);
        }
    }
