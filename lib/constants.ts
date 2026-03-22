import { ITag, TagType } from "@/types/tag";

export const TAGS: ITag[] = [
    {
        id: 'deprecated',
        type: TagType.Error,
        text: 'Deprecated'
    },
    {
        id: 'needs-auth',
        type: TagType.Warning,
        text: 'Needs Authentication'
    },
    {
        id: 'torrent',
        type: TagType.Info,
        text: 'Torrent'
    },
    {
        id: 'direct-download',
        type: TagType.Success,
        text: 'Direct Download'
    },
     {
        id: 'captcha-hosters',
        type: TagType.Warning,
        text: 'Has Captcha Hosters'
    },
    {
        id: 'verified',
        type: TagType.Success,
        text: 'Verified'
    },
     {
        id: 'trusted',
        type: TagType.Success,
        text: 'Trusted'
    },
     {
        id: 'use-at-your-own-risk',
        type: TagType.Warning,
        text: 'Use At Your Own Risk'
    },
    
]