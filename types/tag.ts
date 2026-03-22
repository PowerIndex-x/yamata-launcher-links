export enum TagType {
    Warning = "warning",
    Error = "error",
    Success = "success",
    Info = "outline"

}

export interface ITag {
    id: string,
    type: TagType,
    text: string,
    description?: string
}