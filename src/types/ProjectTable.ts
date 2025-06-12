export type ProjectTable ={
    projectId: string;
    projectName: string;
    managerName: string;
    operatorCount: number;
    toolId: number;
}

export type ProjectDto ={
    originalId: string;
    projectName: string;
}

export type ProjectTableDto ={
    label: string;
    value: string;
}