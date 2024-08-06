import z from 'zod';

export enum UrlShortcutFormKeys {
    FULL_URL = 'fullUrl',
}

const UrlShortcutSchema = z.object({
    [UrlShortcutFormKeys.FULL_URL]: z.string().url(),
});

export type UrlShortcutType = z.infer<typeof UrlShortcutSchema>;
export default UrlShortcutSchema;
