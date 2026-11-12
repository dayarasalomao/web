/**
 * Decorative AI covers (`capa-*`) say nothing about the article and some show a
 * generic doctor; posts that only have one get the doctor's photo instead.
 */
export const isTeachingFigure = (src: string) => !/\/capa-[^/]*$/.test(src)
