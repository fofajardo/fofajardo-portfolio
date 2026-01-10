export interface EntryWithDateRangeSpan {
    dateStart?: string;
    dateEnd?: string;
}

export interface Project extends EntryWithDateRangeSpan {
    id: string;
    type: number;
    title: string;
    subtitle: string;
    preview?: string;
    previewImage?: string;
    isDirect?: boolean;
    url?: string;
}

export interface ProjectSection {
    title: string;
    type: number;
    projects: Project[];
}
