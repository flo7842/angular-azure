

export type ImagesData = ImageData[]

export class ImageData {
    constructor(public name: string, public base64: string, public tags: string | null, public description: string | null, public user: number) {}
}