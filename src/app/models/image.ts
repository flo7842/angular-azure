export type ImageData = {
    id: number,
    name: string,
    base64: string,
    tags?: string[],
    description?: string,
    user: number
}

export type ImagesData = ImageData[]